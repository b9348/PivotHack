'use client'

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './CoverflowCarousel.module.css'

interface CoverflowCarouselProps {
  images: string[]
  autoplaySpeed?: number // 自动播放速度，以毫秒为单位
  showArrows?: boolean // 是否显示导航箭头
  showDots?: boolean // 是否显示分页指示器
}

// 创建一个记忆化的幻灯片组件
const CarouselSlide = memo(({ 
  src, 
  index, 
  activeIndex, 
  imagesLength, 
  onClick 
}: { 
  src: string
  index: number
  activeIndex: number
  imagesLength: number
  onClick: () => void
}) => {
  // 计算此幻灯片的样式
  const style = useMemo(() => {
    const distance = Math.abs(index - activeIndex)
    
    // 处理循环效果
    if (distance > imagesLength / 2) {
      const adjustedDistance = imagesLength - distance
      return getSlideStyleByDistance(adjustedDistance, index < activeIndex)
    }
    
    return getSlideStyleByDistance(distance, index < activeIndex)
  }, [index, activeIndex, imagesLength])
  
  return (
    <motion.div
      className={`${styles.slide} ${activeIndex === index ? styles.activeSlide : ''}`}
      style={style}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={onClick}
      layoutId={`slide-${index}`}
    >
      <img 
        src={src} 
        alt={`Slide ${index + 1}`} 
        className={styles.slideImage}
        draggable={false}
        loading="lazy"
      />
    </motion.div>
  )
})

CarouselSlide.displayName = 'CarouselSlide'

// 根据与活动幻灯片的距离计算样式
const getSlideStyleByDistance = (distance: number, isLeft: boolean) => {
  // 基础Z层级 - 越近的幻灯片层级越高
  const zIndex = 20 - distance
  
  // 基础样式
  const style: React.CSSProperties = {
    zIndex
  }
  
  if (distance === 0) {
    // 当前活动幻灯片
    return {
      ...style,
      transform: 'translateX(0) translateZ(0px) rotateY(0deg) scale(1)',
      opacity: 1,
      filter: 'brightness(100%)'
    }
  } else {
    // 侧边幻灯片
    const translateX = isLeft ? `-${20 + distance * 5}%` : `${20 + distance * 5}%`
    const translateZ = `-${100 + distance * 50}px`
    const rotateY = isLeft ? '30deg' : '-30deg'
    const scale = Math.max(0.7, 1 - distance * 0.15)
    const opacity = Math.max(0.3, 1 - distance * 0.2)
    const brightness = Math.max(60, 100 - distance * 10)
    
    return {
      ...style,
      transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
      opacity,
      filter: `brightness(${brightness}%)`,
      boxShadow: `0 5px 20px rgba(0, 0, 0, ${0.5 - distance * 0.1})`
    }
  }
}

// 优化的分页指示器组件
const PaginationDots = memo(({ 
  count, 
  activeIndex, 
  onClick 
}: { 
  count: number
  activeIndex: number
  onClick: (index: number) => void
}) => {
  return (
    <div className={styles.paginationDots}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`${styles.paginationDot} ${activeIndex === index ? styles.activeDot : ''}`}
          onClick={() => onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
})

PaginationDots.displayName = 'PaginationDots'

export default function CoverflowCarousel({
  images,
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = true
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // 优化的处理函数
  const handleNext = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // 与CSS过渡时间相匹配
  }, [images.length, isTransitioning])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // 与CSS过渡时间相匹配
  }, [images.length, isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return
    
    setIsTransitioning(true)
    setActiveIndex(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [activeIndex, isTransitioning])

  // 自动播放处理
  useEffect(() => {
    if (!isPaused && autoplaySpeed > 0) {
      autoplayTimerRef.current = setTimeout(() => {
        handleNext()
      }, autoplaySpeed)
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [activeIndex, isPaused, autoplaySpeed, handleNext])

  // 优化的鼠标事件处理
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  // 渲染可见的幻灯片，优化性能
  const visibleSlides = useMemo(() => {
    // 仅渲染当前的和附近的幻灯片
    return images.map((src, index) => {
      // 仅渲染当前激活的、前后各2张，以及第一张和最后一张
      const isVisible = 
        index === activeIndex || 
        index === (activeIndex + 1) % images.length || 
        index === (activeIndex - 1 + images.length) % images.length ||
        index === (activeIndex + 2) % images.length || 
        index === (activeIndex - 2 + images.length) % images.length ||
        index === 0 || 
        index === images.length - 1;
      
      return isVisible ? (
        <CarouselSlide
          key={index}
          src={src}
          index={index}
          activeIndex={activeIndex}
          imagesLength={images.length}
          onClick={() => goToSlide(index)}
        />
      ) : null;
    });
  }, [activeIndex, images, goToSlide]);

  return (
    <div 
      className={styles.coverflowContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className={styles.carouselViewport}>
        {visibleSlides}
      </div>

      {/* 导航箭头 */}
      {showArrows && (
        <>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* 分页指示器 */}
      {showDots && (
        <PaginationDots
          count={images.length}
          activeIndex={activeIndex}
          onClick={goToSlide}
        />
      )}
    </div>
  )
} 
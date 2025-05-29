'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import styles from './CarouselSection.module.css'

// 动态导入轮播图组件，减少首次加载时间
const CoverflowCarousel = dynamic(() => import('./CoverflowCarousel'), {
  ssr: false,
  loading: () => <div className={styles.carouselPlaceholder}>加载中...</div>
})

interface CarouselSectionProps {
  section: {
    id: string
    title: string
    content: {
      title?: string
      subtitle?: string
      text?: string
      images: string[]
    }
  }
  isActive: boolean
}

export default function CarouselSection({ section, isActive }: CarouselSectionProps) {
  // 使用状态来延迟加载轮播图内容，仅在 section 激活或即将激活时加载
  const [shouldRenderCarousel, setShouldRenderCarousel] = useState(false)
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    // 如果当前 section 是激活的，立即设置为应该渲染
    if (isActive) {
      setShouldRenderCarousel(true)
    }
    
    // 如果当前 section 不再激活，设置一个延迟，让它在页面滚动完成后卸载
    if (!isActive && shouldRenderCarousel) {
      timeoutId = setTimeout(() => {
        setShouldRenderCarousel(false)
      }, 5000) // 5秒后卸载，避免频繁加载卸载
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isActive, shouldRenderCarousel])
  
  return (
    <motion.section
      id={section.id}
      className={`section ${isActive ? 'active' : ''}`}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.1 }}
      transition={{ duration: 0.6 }}
      layout
    >
      <div className="section-content">
        <div className={styles.carouselSection}>
          <h2>{section.title}</h2>
          
          {section.content.subtitle && (
            <h3 className="subtitle">{section.content.subtitle}</h3>
          )}
          
          <div className={styles.carouselWrapper}>
            {shouldRenderCarousel && (
              <CoverflowCarousel 
                images={section.content.images}
                autoplaySpeed={5000}
                showArrows={true}
                showDots={true}
              />
            )}
          </div>
          
          {section.content.text && (
            <div className={styles.textContent}>
              <p>{section.content.text}</p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6rem 2rem;
          scroll-snap-align: center;
          scroll-snap-stop: always;
          position: relative;
          background-color: var(--primary-bg);
          color: var(--primary-text);
          opacity: 1;
          transform: translateY(0);
          transition: transform 0.6s ease, opacity 0.6s ease;
          will-change: transform, opacity;
          flex-shrink: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          contain: content;
        }
        
        .section-content {
          width: 100%;
          max-width: var(--content-max-width);
          margin: 0 auto;
          text-align: center;
          padding: 0 2rem;
        }
        
        h2 {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0 0 2rem;
        }
        
        .subtitle {
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 1rem 0 2rem;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .section {
            padding: 2rem 1rem;
            scroll-snap-align: none;
            scroll-snap-stop: normal;
            min-height: auto;
          }
          
          .section-content {
            padding: 0 1rem;
          }
          
          h2 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
          
          .subtitle {
            font-size: 1.5rem;
            margin: 0.8rem 0 1.5rem;
          }
        }
      `}</style>
    </motion.section>
  )
} 
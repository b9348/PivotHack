'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from '@/components/NavBar'
import Section from '@/components/Section'
import FlipCard from '@/components/FlipCard'
import FAQ from '@/components/FAQ'

interface SectionContent {
  text?: string
  title?: string
  subtitle?: string
  cards?: {
    title: string
    items: string[]
  }[]
  faqItems?: {
    question: string
    answer: string
  }[]
  background?: string
}

interface Section {
  id: string
  title: string
  content: SectionContent
}

const sections: Section[] = [
  {
    id: 'intro',
    title: '',
    content: {
      background: '/PivotHack BG.png'
    }
  },
  {
    id: 'welcome',
    title: '5月23日-5月25日，北京十一学校',
    content: {
      subtitle: '用一个周末的时间，从0到1打造出一个真实项目',
      text: '用一个周末的时间，用一场黑客松的方式，看到高中生的另一种可能'
    }
  },
  {
    id: 'provide',
    title: '我们提供什么',
    content: {
      cards: [
        {
          title: '工作环境',
          items: [
            '在北京十一学校，三天两夜沉浸式创新体验',
            '睡眠空间提供，保证优质休息',
            '五顿正餐餐食提供，优质能量补充',
            '免费无限零食和咖啡提供'
          ]
        },
        {
          title: '资源支持',
          items: [
            '全程Hack Mentor指导，提供产品/技术/设计/商业化支持',
            '行业大咖Workshop分享',
            '免费算力，3D打印和硬件开发支持'
          ]
        },
        {
          title: '展示平台',
          items: [
            'Demo Day产品亮相机会',
            '创投机构，独立开发者，学术大咖评委点评'
          ]
        }
      ]
    }
  },
  {
    id: 'benefits',
    title: '你能收获什么',
    content: {
      cards: [
        {
          title: '激励和奖品',
          items: [
            '多种评奖机制',
            '万元级别奖金和奖品'
          ]
        },
        {
          title: '团队和友谊',
          items: [
            '与小队成员收获亲密战友友谊',
            '加入参与者社区，和其他优秀的年轻人建立联系，分享项目经验'
          ]
        },
        {
          title: '原创的项目',
          items: [
            '收获一个从0到1的可用产品',
            '孵化器和hackathons内推资源，支持继续迭代产品并推向市场'
          ]
        }
      ]
    }
  },
  {
    id: 'faq',
    title: 'FAQ',
    content: {
      faqItems: [
        {
          question: '什么是 Hackathon ？',
          answer: 'Hackathon 是20多年前来自硅谷的一种活动，创造者们在限定时间内组成队伍，将自己的想法落地为现实产品。'
        },
        {
          question: '我适合参加 PivotHack 吗？',
          answer: '适合，我们欢迎每一个对创造有热情的同学报名参加 PivotHack 。我们欢迎关注产品创新，经济商科，技术开发，平面设计的同学在我们的活动中发挥自己的能力。'
        },
        {
          question: 'PivotHack 和其他的 Hackathon 有何不同？',
          answer: 'PivotHack 是一场面向高中生的 Hackathon，在一个周末的时间内，你将在导师和学生技术团队的指导下，创造属于自己的产品Demo，并向世界展示你的想法。'
        },
        {
          question: 'PivotHack 是否有报名费用？',
          answer: '活动完全免费，无任何报名和参与费用，并且我们将免费提供餐食和住宿空间。由于目前的资金状况，我们很抱歉暂时不能覆盖往返北京十一学校的交通费用。'
        },
        {
          question: '如何报名 PivotHack',
          answer: '填写 PivotHack 报名表报名我们的活动，在填写报名表后一到两周内，我们将通知你参与后续的面试，录取结果将通过邮件和手机通知'
        },
        {
          question: '这是一个合作项目吗？我可以自主组队吗？',
          answer: 'PivotHack 的参与者将以4人为一小队搭建自己的产品，我们将在线下活动开始前提供组队渠道帮助大家认识并交流，并自由组队，组委会会在线下活动开始前根据技能分配将未结组的参与者均衡结组。'
        }
      ]
    }
  },
  {
    id: 'apply',
    title: '立即报名',
    content: {
      text: '和我们一起，向世界展示中学生的创新力量'
    }
  }
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionTitles = sections.map(section => section.title)

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      requestAnimationFrame(() => {
        const mainContent = document.querySelector('.main-content')
        if (!mainContent) return

        const sectionElements = document.querySelectorAll('.section')
        let newActiveSection = 0
        let minDistance = Infinity

        sectionElements.forEach((section, index) => {
          const rect = section.getBoundingClientRect()
          const viewportCenter = window.innerHeight / 2
          const sectionCenter = rect.top + rect.height / 2
          const distance = Math.abs(viewportCenter - sectionCenter)
          
          if (distance < minDistance) {
            minDistance = distance
            newActiveSection = index
          }
        })

        if (newActiveSection !== activeSection) {
          setIsScrolling(true)
          setActiveSection(newActiveSection)
          
          // Add pause effect
          setTimeout(() => {
            setIsScrolling(false)
          }, 800) // 800ms pause
        }
      })
    }

    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeSection, isScrolling])

  const scrollToSection = (index: number) => {
    const sectionElement = document.querySelectorAll('.section')[index]
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="app">
      <NavBar sections={sections} activeSection={activeSection} />
      <div className="section-indicator">
        {sectionTitles.map((title, index) => (
          <motion.div
            key={index}
            className={`indicator-item ${index === activeSection ? 'active' : ''}`}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: index === activeSection ? 1 : 0.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollToSection(index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="indicator-line" />
            <div className="indicator-text">{title}</div>
          </motion.div>
        ))}
      </div>
      <main className={`main-content ${isScrolling ? 'scrolling' : ''}`}>
        <AnimatePresence>
          {sections.map((section, index) => (
            <Section
              key={section.id}
              section={section}
              isActive={index === activeSection}
            />
          ))}
        </AnimatePresence>
      </main>
    </div>
  )
} 
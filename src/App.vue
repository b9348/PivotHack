<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Section from './components/Section.vue'

const sections = [
  {
    id: 'intro',
  },
  {
    id: 'aspiration',
    title: '这是最好的时代',
    content: {
      text: 'AI革命带来的是个人的学习力和生产力的大幅提升。几年前的程序小白，靠着数十个日夜的孤灯奋战才能入门一门开发语言，翻遍社区论坛寻求debug方法，只为呈现一个简陋的网页框架。而如今靠着Cursor和Claude，仅靠自然语言vibe coding就能将碎片化的想法生成为技术方案。现在，产品从0到1的时间甚至只需要按小时计算。在这场技术革命里，每个怀揣火种的普通人都有机会跨过那曾经的技术门槛，将构想和洞察在现实中落地生根。'
    }
  },
  {
    id: 'event-info',
    title: '让PivotHack成为你的“Aha Moment”',
    content: {
      time: '5月23-25日',
      location: '北京市十一学校',
      message: '我们所需要的，只是一次机会，一次看到另一种生活方式，看到另一种目标的机会，一次尝试新的可能的机会，一次搭建你的梦想的机会。所以，这就是我们正在做的事情——我们将在五月底举办一场「免费」的黑客松，场地在北京市十一学校，我们将招募一批携带着无限的Passion的高中生，一起在一个周末的时间里co-living and co-building，组成小队，在「AI For Good」的主题下搭建一个网站，一个应用，一个小硬件，自己的第一个AI项目。我们欢迎学习平面设计，学习经济商科，学习软硬件开发的你，但更重要的是对「创造」有Passion的你报名我们的活动，一起尝试从循规蹈矩的高中生活中Pivot出来，看到新的一种可'
    }
  },
  {
    id: 'support',
    title: '支持与资源',
    content: {
      items: [
        '地点：北师大附中，提供餐饮、零食和住宿',
        '可使用机器人、3D打印机、物联网和硬件设备',
        '专家指导工作坊',
        '开放式沉浸工作环境',
        '免费参与'
      ]
    }
  },
  {
    id: 'schedule',
    title: '日程安排',
    content: {
      date: '5月23-25日，北师大附中',
      schedule: [] // To be filled with detailed schedule
    }
  },
  {
    id: 'venue',
    title: '场地',
    content: {
      name: '北师大附中',
      description: '顶尖的创新设施'
    }
  },
  {
    id: 'rewards',
    title: '奖励',
    content: {
      prizes: [] // To be filled with rewards
    }
  },
  {
    id: 'apply',
    title: '立即报名',
    content: {
      message: '仅限28名参与者 - 即刻锁定名额！'
    }
  },
  {
    id: 'partners',
    title: '战略合作伙伴',
    content: {
      partners: [] // To be filled with partner logos
    }
  }
]

const activeSection = ref(0)

// Add section titles for the indicator
const sectionTitles = sections.map(section => section.title)

const handleScroll = () => {
  requestAnimationFrame(() => {
    const mainContent = document.querySelector('.main-content')
    if (!mainContent) return

    const sectionElements = document.querySelectorAll('.section')
    const scrollPosition = mainContent.scrollTop
    
    const windowHeight = window.innerHeight

    let newActiveSection = 0
    let minDistance = Infinity

    sectionElements.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      const distance = Math.abs(rect.top)
      
      if (distance < minDistance) {
        minDistance = distance
        newActiveSection = index
      }
    })

    activeSection.value = newActiveSection
  })
}

onMounted(() => {
  const mainContent = document.querySelector('.main-content')
  if (mainContent) {
    mainContent.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const mainContent = document.querySelector('.main-content')
  if (mainContent) {
    mainContent.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="app">
    <NavBar :sections="sections" :activeSection="activeSection" />
    <div class="section-indicator">
      <div 
        v-for="(title, index) in sectionTitles" 
        :key="index"
        class="indicator-item"
        :class="{ active: index === activeSection }"
      >
        <div class="indicator-line"></div>
        <div class="indicator-text">{{ title }}</div>
      </div>
    </div>
    <main class="main-content">
      <Section
        v-for="(section, index) in sections"
        :key="section.id"
        :section="section"
        :isActive="index === activeSection"
      />
    </main>
  </div>
</template>

<style>
:root {
  --primary-bg: #000000;
  --primary-text: #ffffff;
  --section-padding: 2rem;
  --content-max-width: 1200px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  height: calc(100vh - var(--nav-height, 0px));
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  position: relative;
  will-change: transform;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main-content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-content {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.section-indicator {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  pointer-events: none;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.1;
  transform: translateX(0);
  transition: opacity 0.3s ease;
  pointer-events: auto;
}

.indicator-line {
  width: 2px;
  height: 24px;
  background: #FFEC03;
  transform: scaleY(0.5);
  opacity: 0.1;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.indicator-text {
  font-size: 0.875rem;
  color: #FFEC03;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-1rem);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.indicator-item.active {
  opacity: 1;
}

.indicator-item.active .indicator-line {
  transform: scaleY(1);
  opacity: 1;
}

.indicator-item.active .indicator-text {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1200px) {
  .section-indicator {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Section from './components/Section.vue'

const sections = [
  {
    id: 'intro',
    title: 'PivotHack',
    content: {
      logo: '/logo.png',
      description: 'Welcome to PivotHack'
    }
  },
  {
    id: 'aspiration',
    title: 'Aspiration',
    content: {
      text: 'Our vision for the future of technology and innovation'
    }
  },
  {
    id: 'event-info',
    title: 'Event Information',
    content: {
      time: 'May 23-25',
      location: 'BNDS',
      message: 'Join us for an exciting hackathon experience!'
    }
  },
  {
    id: 'support',
    title: 'Support & Resources',
    content: {
      items: [
        'Location: BNDS with food, snacks, and accommodation',
        'Access to robotics, 3D printer, IoT, and hardware',
        'Expert-led workshops',
        'Open & immersive working environment',
        'FREE participation'
      ]
    }
  },
  {
    id: 'schedule',
    title: 'Schedule',
    content: {
      date: 'May 23-25, BNDS',
      schedule: [] // To be filled with detailed schedule
    }
  },
  {
    id: 'venue',
    title: 'Venue',
    content: {
      name: 'BNDS',
      description: 'State-of-the-art facilities for innovation'
    }
  },
  {
    id: 'rewards',
    title: 'Rewards',
    content: {
      prizes: [] // To be filled with rewards
    }
  },
  {
    id: 'apply',
    title: 'Apply Now',
    content: {
      message: 'Limited to 28 participants - secure your spot today!'
    }
  },
  {
    id: 'partners',
    title: 'Strategic Partners',
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

.section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: opacity, transform;
}

.section.active {
  opacity: 1;
  transform: translateY(0);
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
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.5s ease;
  pointer-events: auto;
}

.indicator-line {
  width: 2px;
  height: 24px;
  background: #FFEC03;
  transform: scaleY(0.5);
  transition: transform 0.5s ease;
}

.indicator-text {
  font-size: 0.875rem;
  color: #FFEC03;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-1rem);
  transition: all 0.5s ease;
}

.indicator-item.active {
  opacity: 1;
  transform: translateX(0);
}

.indicator-item.active .indicator-line {
  transform: scaleY(1);
}

.indicator-item.active .indicator-text {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 1200px) {
  .section-indicator {
    display: none;
  }
}
</style>

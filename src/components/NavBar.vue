<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  sections: Array<{
    id: string
    title: string
  }>
  activeSection: number
}>()

const scrollToSection = (index: number) => {
  const element = document.querySelectorAll('.section')[index]
  element.scrollIntoView({ behavior: 'smooth' })
}

// Only show specific sections in nav
const navSections = ['aspiration', 'event-info', 'support']
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-intro': activeSection === 0 }">
    <div class="nav-content">
      <div class="logo-container">
        <img 
          :src="activeSection === 0 ? '/pivothack/IntroLogo.png' : '/pivothack/HomepageLogo.png'" 
          :alt="activeSection === 0 ? 'Intro Logo' : 'Homepage Logo'" 
          :class="['logo-image', { 'intro-logo': activeSection === 0 }]"
        />
      </div>
      <div class="nav-links">
        <button
          v-for="section in sections.filter(s => navSections.includes(s.id))"
          :key="section.id"
          @click="scrollToSection(sections.findIndex(s => s.id === section.id))"
          class="nav-link"
        >
          {{ section.title }}
        </button>
        <a
          href="https://bcnv9gyut9jb.feishu.cn/share/base/form/shrcn9ULf1923cdIW9Xwny4829c"
          target="_blank"
          rel="noopener noreferrer"
          class="apply-button"
        >
          立即报名
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height, 80px);
  background: #000000;
  backdrop-filter: blur(300px);
  z-index: 100;
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.navbar-intro {
  background: transparent;
}

.navbar-intro button {
  color: #000000;
}

.navbar-intro button:hover {
  color: rgba(0, 0, 0, 0.7);
}

.nav-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--section-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-image {
  width: 120px;
  height: auto;
  transition: all 0.3s ease;
  object-fit: contain;
}

.intro-logo {
  width: 60px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  background: none;
  border: none;
  color: var(--primary-text);
  opacity: 0.7;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.nav-link:hover {
  opacity: 1;
}

.navbar-intro .nav-link {
  color: #000000;
}

.apply-button {
  background: #FFEC03;
  color: #000000;
  border: none;
  padding: 0.45rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.navbar-intro .apply-button {
  background: #000000;
  color: #FFEC03;
}

.apply-button:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .navbar {
    height: auto;
  }

  .nav-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem var(--section-padding);
  }

  .logo-image {
    width: 100px;
  }

  .intro-logo {
    width: 50px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    padding-bottom: 0.5rem;
  }
}
</style> 
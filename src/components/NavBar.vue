<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
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
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-intro': activeSection === 0 }">
    <div class="nav-content">
      <div class="logo-container">
        <img 
          :src="activeSection === 0 ? '/IntroLogo.png' : '/HomepageLogo.png'" 
          :alt="activeSection === 0 ? 'Intro Logo' : 'Homepage Logo'" 
          :class="['logo-image', { 'intro-logo': activeSection === 0 }]"
        />
      </div>
      <div class="nav-links">
        <button
          v-for="(section, index) in sections.slice(1)"
          :key="section.id"
          @click="scrollToSection(index + 1)"
        >
          {{ section.title }}
        </button>
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
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 120px;
  height: auto;
  transition: all 0.3s ease;
}

.intro-logo {
  width: 60px;
}

.nav-links {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-links::-webkit-scrollbar {
  display: none;
}

button {
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

button:hover {
  opacity: 1;
  color: #FFEC03;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }

  .logo-image {
    width: 100px;
  }

  .intro-logo {
    width: 150px;
  }
}
</style> 
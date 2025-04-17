<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  section: {
    id: string
    title: string
    content: any
  }
  isActive: boolean
}>()
</script>

<template>
  <section :id="section.id" :class="['section', { active: isActive, 'intro-inverted': section.id === 'intro' }]">
    <div class="section-content">
      <div v-if="section.id === 'intro'" class="intro-section">
        <!-- Empty intro section, only background image -->
      </div>

      <div v-else-if="section.id === 'support'" class="support-section">
        <h2>{{ section.title }}</h2>
        <ul>
          <li v-for="item in section.content.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-else-if="section.id === 'apply'" class="apply-section">
        <h2>{{ section.title }}</h2>
        <p class="highlight">{{ section.content.message }}</p>
        <a 
          href="https://bcnv9gyut9jb.feishu.cn/share/base/form/shrcn9ULf1923cdIW9Xwny4829c" 
          target="_blank" 
          rel="noopener noreferrer"
          class="cta-button"
        >
          立即报名
        </a>
      </div>

      <div v-else class="default-section">
        <h2>{{ section.title }}</h2>
        <div class="content">
          <p v-for="[key, value] in Object.entries(section.content)" :key="key">
            {{ value }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  background-color: var(--primary-bg);
  color: var(--primary-text);
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.6s ease;
  will-change: transform;
}

.section:not(.active):not(#intro) {
  opacity: 0.1;
}

.section.active {
  opacity: 1;
  transform: translateY(0);
}

.intro-inverted {
  background: transparent !important;
}

.intro-inverted .intro-section h1,
.intro-inverted .intro-section p {
  color: #000000;
}

.section-content {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
}

.intro-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.intro-section::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/PivotHack BG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1;
  transform: scale(1.02);
  transition: transform 0.6s ease;
}

.section:not(.active) .intro-section::before {
  transform: scale(0.98);
}

.intro-section .logo {
  width: 200px;
  height: auto;
}

.intro-section h1 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
}

.support-section {
  width: 100%;
}

.support-section ul {
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  display: grid;
  gap: 1rem;
  max-width: 800px;
  width: 100%;
}

.support-section li {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease;
  text-align: center;
}

.support-section li:hover {
  transform: translateY(-5px);
}

.apply-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.highlight {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFEC03;
}

.intro-inverted .highlight {
  color: #000000;
}

.cta-button {
  padding: 0.6rem 1.8rem;
  font-size: 1.2rem;
  background: #FFEC03;
  color: #000;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.intro-inverted .cta-button {
  background: #000000;
  color: #FFEC03;
}

.cta-button:hover {
  transform: scale(1.05);
}

.default-section {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.content {
  font-size: 1.2rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }

  .section-content {
    padding: 0 1rem;
  }

  .intro-section h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  .content {
    font-size: 1rem;
  }
}
</style> 
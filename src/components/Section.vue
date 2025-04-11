<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
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
        <img :src="section.content.logo" alt="PivotHack Logo" class="logo" />
        <h1>{{ section.title }}</h1>
        <p>{{ section.content.description }}</p>
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
        <button class="cta-button">Apply Now</button>
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
}

.intro-inverted {
  background-color: #FFEC03 !important;
  color: #000000 !important;
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
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #FFEC03;
  color: #000;
  border: none;
  border-radius: 8px;
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
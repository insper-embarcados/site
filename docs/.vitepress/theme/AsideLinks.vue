<script setup>
import { useData } from 'vitepress'

defineProps({
  mobileOnly: Boolean,
})

const { frontmatter } = useData()
</script>

<template>
  <div
    v-if="frontmatter.links && frontmatter.links.length"
    :class="['aside-links', mobileOnly ? 'aside-links--mobile' : 'aside-links--desktop']"
  >
    <p v-if="frontmatter.linksTitle" class="aside-links-header">{{ frontmatter.linksTitle }}</p>
    <div
      v-for="link in frontmatter.links"
      :key="link.url"
      :class="[link.box || 'box', 'custom-block']"
    >
      <p v-if="link.title" class="custom-block-title">{{ link.title }}</p>
      <p>
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          <span v-if="link.icon">{{ link.icon }} </span>{{ link.text }}
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.aside-links {
  margin-bottom: 16px;
}

.aside-links-header {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin: 0 0 8px 0;
}

.aside-links .custom-block {
  margin-bottom: 8px;
}

/* desktop instance (aside): hide on mobile */
.aside-links--desktop {
  display: block;
}

@media (max-width: 1279px) {
  .aside-links--desktop {
    display: none;
  }
}

/* mobile instance (doc-before): hide on desktop */
.aside-links--mobile {
  display: none;
}

@media (max-width: 1279px) {
  .aside-links--mobile {
    display: block;
  }
}
</style>

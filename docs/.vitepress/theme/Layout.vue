<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import SidebarLinks from './SidebarLinks.vue'

// Import the Lando Layout directly
import VPLLayout from '@lando/vitepress-theme-default-plus/components/VPLLayout.vue'

const { frontmatter } = useData()

// Extract sidebar links from frontmatter
const sidebarLinks = computed(() => {
  console.log('[SidebarLinks DEBUG] frontmatter:', frontmatter.value)
  if (!frontmatter.value || !frontmatter.value.sidebar_links) {
    return []
  }
  console.log('[SidebarLinks DEBUG] Found links:', frontmatter.value.sidebar_links)
  return frontmatter.value.sidebar_links
})
</script>

<template>
  <VPLLayout>
    <template #aside-ads-before>
      <SidebarLinks :links="sidebarLinks" />
    </template>
  </VPLLayout>
</template>

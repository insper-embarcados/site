---
description: Materiais de consulta sobre pico e sistemas embarcados
layout: page
title: Consultas
---

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Material de consulta
    </template>
    <template #lead>
      Apoio no desenvolvimento de hardware e software.
    </template>
  </VPLCollectionPageTitle>

  <VPLCollectionPageTags v-model="tags" />

  <VPLCollectionPageSection v-if="showGuides">
    <template #title>
      Guias
    </template>
    <template #lead>
      Misto de teoria e exemplos.
    </template>
    <template #items>
      <VPLCollectionItems
        :items="guides.pages"
        :tags="tags"
      />
    </template>
  </VPLCollectionPageSection>

</VPLCollectionPage>

<script setup>
import {computed} from 'vue';
import {useCollection} from '@lando/vitepress-theme-default-plus';
import {
  VPLCollectionItems,
  VPLCollectionPage,
  VPLCollectionPageSection,
  VPLCollectionPageTags,
  VPLCollectionPageTitle,
} from '@lando/vitepress-theme-default-plus';

const guides = useCollection('guide');
const posts = useCollection('post');
const {hasItems, tags} = useCollection();

const showGuides = computed(() => hasItems(guides.pages, tags));
const showPosts = computed(() => hasItems(posts.pages, tags));
</script>

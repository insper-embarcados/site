<template>
  <Layout :class="headerClass">
    <!-- slots do Lando Plus (replicados para manter funcionalidade) -->
    <template #layout-top>
      <Alert
        v-if="alert"
        :key="alertKey"
        :content="alert.content"
        :closeable="alert.closeable"
        :type="alert.type"
      />
    </template>

    <template #sidebar-nav-after>
      <div v-if="sidebarEnder !== false" class="sidebar-end">
        <VPSideBarItem :depth="0" :item="sidebarEnder" />
      </div>
    </template>

    <template #doc-before>
      <div v-if="header !== ''" class="collection-header">
        <PostHeader v-if="header === 'post'" />
        <CollectionHeader v-else />
      </div>
      <AsideLinks mobile-only />
    </template>

    <template #aside-ads-before>
      <AsideLinks />
      <Tags :key="tagsKey" />
      <Jobs :key="jobsKey" />
      <Sponsors :key="sponsorsKey" />
    </template>

    <template #doc-footer-before>
      <Tags v-if="header === 'post'" :key="tagsKey" />
      <div v-if="mailchimp" class="newsletter-wrapper">
        <MailChimp v-bind="mailchimp" />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import VPSideBarItem from 'vitepress/dist/client/theme-default/components/VPSidebarItem.vue';

import Alert from '@lando/vitepress-theme-default-plus/components/VPLAlert.vue';
import CollectionHeader from '@lando/vitepress-theme-default-plus/components/VPLCollectionHeader.vue';
import Jobs from '@lando/vitepress-theme-default-plus/components/VPLJobs.vue';
import MailChimp from '@lando/vitepress-theme-default-plus/components/VPLMailChimp.vue';
import PostHeader from '@lando/vitepress-theme-default-plus/components/VPLPostHeader.vue';
import Sponsors from '@lando/vitepress-theme-default-plus/components/VPLSponsors.vue';
import Tags from '@lando/vitepress-theme-default-plus/components/VPLCollectionItemTags.vue';

import AsideLinks from './AsideLinks.vue';

const { Layout } = DefaultTheme;

let alertKey = ref(0);
let jobsKey = ref(0);
let sponsorsKey = ref(0);
let tagsKey = ref(0);
const { frontmatter, page, theme } = useData();

const alert = computed(() => frontmatter.value.alert ?? theme.value.alert ?? false);
const header = computed(() => frontmatter.value.collection || '');
const headerClass = computed(() => frontmatter.value.collection ? `collection-${frontmatter.value.collection}` : '');
const mailchimp = computed(() => frontmatter.value?.mailchimp?.action ? frontmatter.value.mailchimp : false);
const sidebarEnder = computed(() => theme.value.sidebarEnder ?? false);

watch(() => page.value.relativePath, () => {
  alertKey = page.value.relativePath;
  jobsKey = page.value.relativePath;
  sponsorsKey = page.value.relativePath;
  tagsKey = page.value.relativePath;
});
</script>

<style scoped>
.newsletter-wrapper {
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 0;
}
</style>

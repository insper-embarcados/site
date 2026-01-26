
import VPLTheme from '@lando/vitepress-theme-default-plus';
import SidebarLinks from './SidebarLinks.vue'
import Layout from './Layout.vue'
import './custom.css';

export default {
  ...VPLTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('SidebarLinks', SidebarLinks)
    if (VPLTheme.enhanceApp) {
      VPLTheme.enhanceApp({ app })
    }
  }
}


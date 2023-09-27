<template>
  <a-layout>
    <a-layout-sider
      :trigger="null"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        paddingTop: '64px',
        left: 0,
        top: 0,
        bottom: 0,
      }">
      <SideNav />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          backgroundColor: '#fff',
        }">
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '64px 0 0',
          overflow: 'auto',
          padding: '24px 24px 0',
        }">
        <router-view />

        <a-layout-footer :style="{ textAlign: 'center' }">
          Vue.js 3 + TypeScript + Ant Design Vue @2021 Created by
          <a
            href="https://t.me/IvannaCantelberg"
            target="_blank"
            rel="noopener noreferrer">
            @IvannaCantelberg
          </a>
        </a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import SideNav from '@/layout/SideNav.vue';

export default defineComponent({
  name: 'AppLayout',
  components: {
    SideNav,
  },
  setup() {
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const collapsed: Ref<boolean> = ref<boolean>(false);
    return {
      collapsed: collapsed,
      toggleCollapsed: toggleCollapsed,
    };
  },
});
</script>

<style scoped>
.ant-layout {
  height: 100%;
}
</style>

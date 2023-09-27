<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <SideNav :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout-header style="background: #fff">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="toggleCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
    </a-layout-header>
    <a-layout-content
      :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        height: '100%',
      }">
      <router-view />
    </a-layout-content>
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

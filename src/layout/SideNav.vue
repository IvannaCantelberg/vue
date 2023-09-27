<template>
  <div class="logo" />
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <user-outlined />
      <span>nav 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <video-camera-outlined />
      <span>nav 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <upload-outlined />
      <span>nav 3</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const SideNav = defineComponent({
  name: 'SideNav',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
    };
  },
});

export default SideNav;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

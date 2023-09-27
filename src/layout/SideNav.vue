<template>
  <div class="logo" />
  <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <MenuItem key="1">
      <UserOutlined />
      <span>Home</span>
    </MenuItem>
    <MenuItem key="2">
      <video-camera-outlined />
      <span>nav 2</span>
    </MenuItem>
    <MenuItem key="3">
      <upload-outlined />
      <span>nav 3</span>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { Menu, MenuItem } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

const AntdComponents = {
  Menu,
  MenuItem,
  UserOutlined,
};

const SideNav = defineComponent({
  name: 'SideNav',
  components: {
    ...AntdComponents,
  },
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

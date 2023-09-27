<template>
  <Dropdown>
    <Avatar src="https://i.pravatar.cc/50" alt="user avatar" />
    <template #overlay>
      <Menu>
        <MeuItem>
          <a href="/profile">Profile</a>
        </MeuItem>
        <MeuItem>
          <a href="/">Sign Out</a>
        </MeuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { Avatar, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { defineComponent } from 'vue';

const AntdComponents = {
  Avatar,
  Dropdown,
  Menu,
  MenuItem,
};

export default defineComponent({
  name: 'UserAvatar',
  components: {
    ...AntdComponents,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

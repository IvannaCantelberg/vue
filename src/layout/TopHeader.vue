<template>
  <div>
    <PageHeader
      v-bind:title="title"
      v-bind:sub-title="subTitle"
      :ghost="false"
      @back="() => $router.go(-1)"
      :avatar="{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }">
      <template #extra>
        <Button key="1" @click="goToProfile">Profile</Button>
      </template>
    </PageHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PageHeader, Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const AntdComponents = {
  PageHeader,
  Button,
};

export default defineComponent({
  name: 'TopHeader',
  components: {
    ...AntdComponents,
  },
  watch: {
    $route() {
      this.title = this.$route.meta.title as string;
      this.subTitle = this.$route.meta.subTitle as string;
    },
  },
  data() {
    return {
      title: this.$route.meta.title as string,
      subTitle: this.$route.meta.subTitle as string,
    };
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
  },
});
</script>

<style scoped></style>

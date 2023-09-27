<template>
  <Layout>
    <Sider
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
    </Sider>
    <Layout :style="{ marginLeft: '200px' }">
      <Header
        :style="{
          position: 'fixed',
          right: 0,
          left: '200px',
          padding: '0',
          zIndex: 1,
        }">
        <TopHeader />
      </Header>
      <Content
        :style="{
          margin: '80px 0 0',
          overflow: 'auto',
          padding: '24px 24px 0',
        }">
        <router-view />
        <Footer :style="{ textAlign: 'center' }">
          Vue.js 3 + TypeScript + Ant Design Vue @2023 Created by
          <a
            href="https://t.me/IvannaCantelberg"
            target="_blank"
            rel="noopener noreferrer">
            @IvannaCantelberg
          </a>
        </Footer>
      </Content>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import TopHeader from '@/layout/TopHeader.vue';
import SideNav from '@/layout/SideNav.vue';
import { Layout } from 'ant-design-vue';
import Sider from 'ant-design-vue/es/layout/Sider';
import { Content, Footer, Header } from 'ant-design-vue/es/layout/layout';
import { defineComponent } from 'vue';

const AntdComponents = {
  Layout,
  Sider,
  Header,
  Content,
  Footer,
};
export default defineComponent({
  name: 'AppLayout',
  components: {
    ...AntdComponents,
    TopHeader,
    SideNav,
  },
});
</script>

<style scoped></style>

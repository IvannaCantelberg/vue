<template>
  <Drawer
    title="Edit post"
    :width="720"
    :open="isOpen"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose">
    <PostForm
      v-if="isOpen"
      ref="postFormRef"
      v-bind:form-data="postData"
      :is-edit-mode="true"
      @submit="onUpdatePost" />

    <template #extra>
      <Space>
        <Button @click="onClose">Cancel</Button>
        <Button type="primary" @click="validateForm()"> Update</Button>
      </Space>
    </template>
  </Drawer>
</template>

<script lang="ts">
import PostForm from '@/components/post/PostFrom.vue';
import { IPost, usePostsStore } from '@/store/posts.store';
import { Button, Drawer, Space } from 'ant-design-vue';
import axios from 'axios';
import { defineComponent, ref } from 'vue';

const AntdComponents = {
  Drawer,
  Button,
  Space,
};

const store = usePostsStore();

export default defineComponent({
  name: 'PostEdit',
  components: {
    ...AntdComponents,
    PostForm,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    postData: {},
    postIndex: {
      type: Number,
      required: true,
    },
  },
  emits: ['close', 'update'],

  data() {
    return {};
  },
  setup() {
    const postFormRef = ref<typeof PostForm>(PostForm);
    return { postFormRef };
  },
  methods: {
    onClose() {
      this.$emit('close');
      this.postFormRef.resetForm();
    },
    validateForm() {
      this.postFormRef.validateForm();
    },
    async onUpdatePost(post: IPost) {
      const updatedPost: IPost | boolean = await this.updatePost(post);
      if (!updatedPost) return;
      store.editPost(this.postIndex, updatedPost as IPost);
      this.$emit('update');
    },
    async updatePost(post: IPost) {
      return await axios
        .put<IPost>(`/api/posts/${post._id}`, post)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
  },
});
</script>

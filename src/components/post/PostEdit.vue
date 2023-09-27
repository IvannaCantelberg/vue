<template>
  <a-drawer
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
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="validateForm()"> Update</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PostForm from '@/components/post/PostFrom.vue';
import { IPost, usePostsStore } from '@/store/posts.store';
import axios from 'axios';

const store = usePostsStore();

export default defineComponent({
  name: 'PostEdit',
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
  components: {
    PostForm,
  },
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

<template>
  <Drawer
    title="Create new post"
    :width="720"
    :open="isOpen"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose">
    <PostForm
      v-if="isOpen"
      ref="postFormRef"
      v-bind:form-data="postData"
      :is-edit-mode="false"
      @submit="onCreatePost" />

    <template #extra>
      <Space>
        <Button @click="onClose">Cancel</Button>
        <Button type="primary" @click="validateForm()"> Create</Button>
      </Space>
    </template>
  </Drawer>
</template>

<script lang="ts">
import PostForm from '@/components/post/PostFrom.vue';
import {
  IPost,
  useInitialPostDataStore,
  usePostsStore,
} from '@/store/posts.store';
import { Button, Drawer, Space } from 'ant-design-vue';
import axios from 'axios';
import { defineComponent, ref } from 'vue';

const store = usePostsStore();
const initialPostStore = useInitialPostDataStore();

export default defineComponent({
  name: 'PostCreate',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['close', 'create'],
  components: {
    PostForm,
    Space,
    Drawer,
    Button,
  },
  data() {
    return {
      postData: {
        type: {} as IPost,
        required: true,
        default: { ...initialPostStore.initialPostData },
      },
    };
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
    async onCreatePost(post: IPost) {
      const newPost: IPost | false = await this.createPost(post);
      if (!newPost) {
        return;
      }
      store.addPost(newPost);
      this.postFormRef.resetForm();
      this.$emit('create');
    },
    async createPost(post: IPost) {
      return await axios
        .post('/api/posts', post)
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

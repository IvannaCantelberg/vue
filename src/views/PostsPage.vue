<template>
  <Button type="primary" @click="onCreatePost"> Create Post </Button>

  <PostCreate
    :isOpen="isCreatePostOpened"
    @close="onCloseCreatePost"
    @create="onCloseCreatePost" />

  <PostEdit
    :postData="editedPost"
    :postIndex="editPostIndex"
    :isOpen="isEditPostOpened"
    @close="onCloseEditPost"
    @update="onCloseEditPost" />

  <Empty v-if="!store.posts.length" />

  <Space direction="vertical" class="cards-wrapper">
    <PostCard
      v-for="(post, index) in store.posts"
      :key="post._id"
      :postData="post"
      :index="index"
      @delete="onDeletePost(index, post)"
      @edit="onPostEdit(index, post)" />
  </Space>
</template>

<script lang="ts">
import PostCard from '@/components/post/PostCard.vue';
import PostCreate from '@/components/post/PostCreate.vue';
import PostEdit from '@/components/post/PostEdit.vue';
import { IPost, IPostTypes, usePostsStore } from '@/store/posts.store';
import { Button, Empty, Space } from 'ant-design-vue';
import axios from 'axios';
import { Ref, defineComponent, ref } from 'vue';

const AntdComponents = {
  Empty,
  Space,
  Button,
};
const store = usePostsStore();

export default defineComponent({
  name: 'PostsPage',
  components: {
    ...AntdComponents,
    PostCard,
    PostCreate,
    PostEdit,
  },
  setup() {
    return {
      store,
    };
  },
  methods: {
    async fetchPosts() {
      const posts: IPost[] = (await axios.get('/api/posts')).data;
      this.store.registerPosts(posts);
      console.log(posts);
    },

    async fetchPostTypes() {
      const postTypes = (await axios.get<IPostTypes[]>('/api/postTypes')).data;
      this.store.registerRecordTypes(postTypes);
    },

    async deletePost(postId: string) {
      return await axios
        .delete(`/api/posts/${postId}`)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },

    async onDeletePost(atIndex: number, post: IPost) {
      if (!post._id) return;
      const isDeleted = await this.deletePost(post._id);
      if (!isDeleted) return;
      this.store.deletePost(atIndex);
    },

    onPostEdit(atIndex: number, post: IPost) {
      this.editedPost = post;
      this.editPostIndex = atIndex;
      this.isEditPostOpened = !this.isEditPostOpened;
    },

    onCloseEditPost() {
      this.isEditPostOpened = false;
    },

    onCloseCreatePost() {
      this.isCreatePostOpened = false;
    },

    onCreatePost() {
      this.isCreatePostOpened = !this.isCreatePostOpened;
    },
  },

  async beforeMount() {
    await this.fetchPosts();
    await this.fetchPostTypes();
  },

  data() {
    return {
      isEditPostOpened: false,
      isCreatePostOpened: false,
      posts: store.posts,
      editedPost: {} as IPost,
      editPostIndex: ref<number>(-1) as Ref<number>,
    };
  },
});
</script>

<style lang="scss" scoped>
.cards-wrapper {
  margin-top: 20px;
  display: flex;
}
</style>

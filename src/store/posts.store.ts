import { defineStore } from 'pinia';

export const useInitialPostDataStore = defineStore('initialPostData', {
  state: () => ({
    initialPostData: {
      title: '',
      isPublic: true,
      recordType: {
        _id: '',
        name: '',
        color: '',
      },
      description: '',
      location: '',
    } as IPost,
  }),
});

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as IPost[],
    recordTypes: [] as IPostTypes[],
  }),
  actions: {
    addPost(post: IPost) {
      this.posts.unshift({ ...post });
    },
    editPost(atIndex: number, post: IPost) {
      this.posts[atIndex] = post;
    },
    deletePost(atIndex: number) {
      this.posts.splice(atIndex, 1);
    },
    registerPosts(posts: IPost[]) {
      this.posts = posts;
    },
    registerRecordTypes(recordTypes: IPostTypes[]) {
      this.recordTypes = recordTypes;
    },
    getRecordTypeById(_id: string) {
      return this.recordTypes.find((recordType) => recordType._id === _id);
    },
  },
});

export interface IPost {
  _id?: string;
  title: string;
  isPublic: boolean;
  recordType: IPostTypes;
  description: string;
  location: string;
}

export interface IPostTypes {
  _id: string;
  name: string;
  color: string;
}

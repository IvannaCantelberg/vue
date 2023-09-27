<template>
  <a-form
    ref="formRef"
    :model="form"
    name="nest-messages"
    :validate-messages="validateMessages"
    @submit="onSubmit">
    <a-form-item
      :name="['post', 'title']"
      label="Title"
      :rules="[{ required: true }]">
      <a-input v-model:value="form.post.title" />
    </a-form-item>
    <a-form-item
      :name="['post', 'location']"
      label="Location"
      :rules="[{ required: true }]">
      <a-input v-model:value="form.post.location" />
    </a-form-item>
    <a-form-item
      :name="['post', 'recordType']"
      label="Type"
      :rules="[{ required: true }]">
      <a-select
        ref="select"
        @select="onSelect"
        v-model:value="form.post.recordType._id">
        <a-select-option
          v-for="record in records"
          :key="record._id"
          :value="record._id">
          {{ record.name }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :name="['post', 'description']" label="Description">
      <a-textarea v-model:value="form.post.description" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { FormInstance } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { useInitialPostDataStore, usePostsStore } from '@/store/posts.store';

const store = usePostsStore();
const initialPostStore = useInitialPostDataStore();

export default defineComponent({
  name: 'PostForm',
  setup() {
    const formRef = ref<FormInstance>();
    const validateMessages = {
      required: '${label} is required!',
    };

    return {
      formRef,
      validateMessages,
    };
  },
  props: {
    formData: null,
    isEditMode: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['submit'],
  data() {
    return {
      records: [...store.recordTypes],
      form: {
        post: { ...initialPostStore.initialPostData },
      },
    };
  },
  mounted() {
    if (this.isEditMode) {
      Object.assign(this.form.post, this.formData);
    }
  },
  unmounted() {
    initialPostStore.$reset();
    this.resetForm();
  },
  methods: {
    validateForm() {
      this.formRef
        ?.validate()
        .then((valid) => {
          if (!valid) {
            return false;
          }
          this.formRef?.$emit('submit');
        })
        .catch((err) => console.log(err));
    },

    resetForm() {
      this.formRef?.resetFields();
    },

    onSelect(id: string) {
      const record = this.records.find((r) => r._id === id);
      if (!record) return;
      this.form.post.recordType = record;
    },

    onSubmit() {
      console.log('onSubmit Form', this.form.post);
      this.$emit('submit', this.form.post);
    },
  },
});
</script>

<style scoped></style>

<template>
  <Form
    ref="formRef"
    :model="form"
    name="nest-messages"
    :validate-messages="validateMessages"
    @submit="onSubmit">
    <FormItem
      :name="['post', 'title']"
      label="Title"
      :rules="[{ required: true }]">
      <Input v-model:value="form.post.title" />
    </FormItem>
    <FormItem
      :name="['post', 'location']"
      label="Location"
      :rules="[{ required: true }]">
      <Input v-model:value="form.post.location" />
    </FormItem>
    <FormItem
      :name="['post', 'recordType']"
      label="Type"
      :rules="[{ required: true }]">
      <Select
        ref="select"
        @select="onSelect(form.post.recordType._id)"
        v-model:value="form.post.recordType._id">
        <SelectOption
          v-for="record in records"
          :key="record._id"
          :value="record._id">
          {{ record.name }}
        </SelectOption>
      </Select>
    </FormItem>

    <FormItem :name="['post', 'description']" label="Description">
      <Textarea v-model:value="form.post.description" />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {
  Form,
  FormInstance,
  FormItem,
  Input,
  Select,
  SelectOption,
  Textarea,
} from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { useInitialPostDataStore, usePostsStore } from '@/store/posts.store';

const AntdComponents = {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  Textarea,
};

const store = usePostsStore();
const initialPostStore = useInitialPostDataStore();

export default defineComponent({
  name: 'PostForm',
  components: {
    ...AntdComponents,
  },
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

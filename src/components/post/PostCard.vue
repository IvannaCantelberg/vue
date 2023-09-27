<template>
  <a-card :title="postData.title" :bordered="true" hoverable>
    <template v-slot:extra>
      <a-space>
        <PostBadge
          :text="postData.recordType.name"
          :color="postData.recordType.color" />

        <a-tooltip title="Edit Post">
          <a-button shape="circle" type="text" @click="onEdit">
            <template #icon><EditOutlined /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip title="Delete Post">
          <a-button shape="circle" type="text" @click="onDelete">
            <template #icon><DeleteOutlined /></template>
          </a-button>
        </a-tooltip>
      </a-space>
      <!-- <a-button shape="circle" :icon="h(EditFilled)" /> -->
    </template>

    <a-card-meta :title="'Anonymous'" :description="createdAt">
      <template v-slot:avatar>
        <a-avatar src="https://i.pravatar.cc/50" />
      </template>
    </a-card-meta>

    Description:
    <p>{{ postData.description || '- - - - ' }}</p>
  </a-card>
</template>
<script lang="ts">
// import CardWrapper from './Card/index.vue';
import { defineComponent } from 'vue';
import PostBadge from './PostBadge.vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'PostCard',
  components: {
    PostBadge,
    EditOutlined,
    DeleteOutlined,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    postData: {
      type: Object,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  methods: {
    onEdit() {
      this.$emit('edit', this.index, this.postData);
      console.log('Edit');
    },
    onDelete() {
      this.$emit('delete', this.index, this.postData);
      console.log('Delete');
    },
  },
  setup() {
    const createdAt = new Date().toLocaleDateString();
    return { createdAt };
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <Card :title="postData.title" :bordered="true" hoverable>
    <template v-slot:extra>
      <Space>
        <PostBadge
          :text="postData.recordType.name"
          :color="postData.recordType.color" />

        <Tooltip title="Edit Post">
          <Button shape="circle" type="text" @click="onEdit">
            <template #icon><EditOutlined /></template>
          </Button>
        </Tooltip>
        <Tooltip title="Delete Post">
          <Button shape="circle" type="text" @click="onDelete">
            <template #icon><DeleteOutlined /></template>
          </Button>
        </Tooltip>
      </Space>
      <!-- <a-button shape="circle" :icon="h(EditFilled)" /> -->
    </template>

    <CardMeta :title="'Anonymous'" :description="createdAt">
      <template v-slot:avatar>
        <Avatar src="https://i.pravatar.cc/50" alt="user avatar" />
      </template>
    </CardMeta>

    Description:
    <p>{{ postData.description || '- - - - ' }}</p>
  </Card>
</template>
<script lang="ts">
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { Avatar, Button, Card, CardMeta, Space, Tooltip } from 'ant-design-vue';
import { defineComponent } from 'vue';
import PostBadge from './PostBadge.vue';

const AntdComponents = {
  EditOutlined,
  DeleteOutlined,
  Card,
  CardMeta,
  Space,
  Tooltip,
  Button,
  Avatar,
};

export default defineComponent({
  name: 'PostCard',
  components: {
    ...AntdComponents,
    PostBadge,
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

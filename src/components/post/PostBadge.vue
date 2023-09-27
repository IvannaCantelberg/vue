<template>
  <div class="badge-wrapper" :style="{ borderColor: color, color: color }">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostBadge',
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  setup() {
    // this.color = this.color || BLACK;
    const createdAt = new Date().toLocaleDateString();
    return { createdAt };
  },
});
</script>

<style scoped lang="scss">
.badge-wrapper {
  border: 1px solid;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-right: 5px;
}
</style>

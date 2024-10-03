<script setup lang="ts">
import * as Ui from "../ui";

defineProps<{
  title: string;
}>();
</script>
<template>
  <div class="page_layout">
    <Ui.Heading :title="title" level="h2" />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";
.page_layout {
  margin: $spaces-l;
  padding: $spaces-m;
  @include column-container;

  .content {
    @include column-container;
    margin: $spaces-l;
    border: 2px solid $color-graniteGray;
    height: 90vh;
    max-height: 90vh;
    border-radius: $spaces-sm;
  }
}
</style>

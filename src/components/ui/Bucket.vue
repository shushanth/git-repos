<script setup lang="ts">
type Level = "primary";

withDefaults(defineProps<{ level?: Level }>(), { level: "primary" });
</script>
<template>
  <div
    :class="{
      bucket: true,
      'bucket-primary': level === 'primary',
    }"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";
.bucket {
  @include column-container;
  border-bottom: 1px solid $color-neonSilverLight;
}
.bucket-primary {
  padding: $spaces-l 0 $spaces-xxl 0;
}
</style>

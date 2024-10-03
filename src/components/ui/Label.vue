<script setup lang="ts">
type Level = "primary" | "error";
withDefaults(defineProps<{ level?: Level; label?: string }>(), {
  level: "primary",
  label: "",
});
</script>

<template>
  <div class="label_container">
    <p
      :class="{
        label: true,
        error: level === 'error',
      }"
      v-if="label"
    >
      {{ label }}
    </p>
    <p
      :class="{
        label: true,
        error: level === 'error',
      }"
      v-if="!label"
    >
      <slot />
    </p>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";

.label_container {
  @include column-container;
  .label {
    font-size: $font-s;
    padding: $spaces-m 0;
  }
  .error {
    color: $color-redPrimary;
  }
}
</style>

<script setup lang="ts">
const props = defineProps<{ id: string; value: string }>();
const emits = defineEmits<{
  (e: "onClose", id: string): void;
}>();
</script>
<template>
  <div class="chip">
    <p class="label">{{ value }}</p>
    <div class="close" @click="emits('onClose', props.id)">&#x2717;</div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";
.chip {
  border-radius: $spaces-m;
  background-color: $color-neonSilver;
  display: inline-flex;
  font-size: $font-xxs;
  padding: $spaces-m;
  .label {
    color: $color-jetBlack;
    padding-right: $spaces-m;
    font-weight: bold;
  }
  .close {
    color: $color-white;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>

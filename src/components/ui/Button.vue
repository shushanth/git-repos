<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
const emits = defineEmits<{
  (e: "onBtnClick"): void;
}>();

const onBtnClick = () => emits("onBtnClick");
</script>
<template>
  <div class="button_container" @click="onBtnClick">
    <button :disabled="disabled"><slot /></button>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";
.button_container {
  @include column-container;

  button {
    font-size: $font-s;
    padding: $spaces-l;
    background-color: $color-tropicalIndigo;
    color: $color-white;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: $spaces-sm;

    &:hover {
      background-color: $color-tropicalIndigoLight;
    }

    &:disabled {
      pointer-events: none;
      background-color: $color-tropicalIndigoLight;
    }
  }
}
</style>

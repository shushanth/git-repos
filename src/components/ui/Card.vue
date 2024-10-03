<script setup lang="ts"></script>
<template>
  <div class="card">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";
.card {
  @include column-container;
  border: 1px solid $color-neonSilver;
  width: 350px;
  height: 450px;
  max-height: 450px;
  overflow-y: auto;
  box-shadow: 0 10px 10px $color-whiteSnow;
  padding: $spaces-l;
  border-radius: $spaces-sm;
}
</style>

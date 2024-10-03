<script setup lang="ts">
type Level = "h1" | "h2" | "h3";

const props = withDefaults(
  defineProps<{
    level: Level;
    title: string;
  }>(),
  {
    level: "h1",
    title: "heading",
  }
);

const isMatchLevel = (level: Level): boolean => {
  return level === props.level;
};
</script>
<template>
  <div class="heading">
    <h1 v-if="isMatchLevel('h1')">{{ title }}</h1>
    <h2 v-if="isMatchLevel('h2')">{{ title }}</h2>
    <h3 v-if="isMatchLevel('h3')">{{ title }}</h3>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
.heading {
  padding: $spaces-sm $spaces-l;
  h1 {
    font-size: $font-xl;
  }
  h2 {
    font-size: $font-l;
  }
  h3 {
    font-size: $font-m;
    font-weight: 500;
  }
}
</style>

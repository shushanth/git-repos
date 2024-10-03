<script setup lang="ts">
import { ref } from "vue";
import * as Ui from "@/components/ui";
defineProps<{ label: string; min: string; max: string }>();

const emits = defineEmits<{
  (e: "onRangeUpdate", value: string): void;
}>();

const rangeValue = ref<string>("100");

const rangeChange = () => {
  emits("onRangeUpdate", rangeValue.value);
};
</script>
<template>
  <div class="input_range">
    <Ui.Label :label="`Stars ${rangeValue}`" />
    <input
      type="range"
      v-model="rangeValue"
      :min="min"
      :max="max"
      @input="rangeChange"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
.input_range {
  @include column-container;
}
</style>

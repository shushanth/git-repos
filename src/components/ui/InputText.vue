<script setup lang="ts">
import * as Ui from "@/components/ui";
type InputType = "text";

withDefaults(
  defineProps<{
    type?: InputType;
    placeholder?: string;
    min?: string;
    value?: string;
    label?: string;
  }>(),
  {
    type: "text",
    placeholder: "Search",
  }
);

const emits = defineEmits<{
  (e: "onInputChange", value: string): void;
}>();

const onInput = (event: Event) => {
  const el = event.target as HTMLInputElement;
  emits("onInputChange", el.value);
};
</script>
<template>
  <Ui.Label :label="label" />
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    aria-label="search-filter"
    @input="onInput"
    :value="value"
    ariaLabel="repo-input"
  />
</template>
<style scoped lang="scss">
@import "../../assets/styles/variables.scss";

.input {
  padding: 10px;
  color: $color-jetBlack;
  border: 1px solid $color-grayPrimary;
  border-radius: $spaces-sm;
  width: 250px;
}
</style>

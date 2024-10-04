<script setup lang="ts">
import { computed, ref } from "vue";
import * as Ui from "../ui";
export type Options = {
  id: string;
  name: string;
};
const props = defineProps<{
  options: Options[];
}>();

const emits = defineEmits<{
  (e: "onOptionSelect", optionId: string, optionValue: string): void;
}>();

const inputValue = ref("");

const filteredOptions = computed(() => {
  return props.options.filter((option) =>
    option.name
      .toLocaleLowerCase()
      .includes(inputValue.value.toLocaleLowerCase()),
  );
});

const onInputUpdate = (value: string) => {
  inputValue.value = value;
};

const onOptionUpdate = (id: string, name: string) => {
  inputValue.value = "";
  emits("onOptionSelect", id, name);
};
</script>
<template>
  <div class="input_dropdown">
    <Ui.Input
      :value="inputValue"
      placeholder="Search language"
      @onInputChange="onInputUpdate"
    />
    <div
      class="input_dropdown_options"
      v-if="inputValue && filteredOptions?.length"
    >
      <template v-for="option in filteredOptions" :key="option.id">
        <p class="value" @click="onOptionUpdate(option.id, option.name)">
          {{ option.name }}
        </p>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";
.input_dropdown {
  @include column-container();
  position: relative;
  &_options {
    position: absolute;
    width: 100%;
    border: 1px solid $color-graniteGray;
    top: 45px;
    border-radius: $spaces-sm;
    z-index: 10000;
    background-color: $color-white;
    box-shadow: 0 10px 10px $color-whiteSnow;
    .value {
      @include column-container();
      padding: $spaces-m $spaces-sm;
      font-size: $font-s;
      color: $color-blackPrimary;
      border-bottom: 1px solid $color-neonSilver;
      cursor: pointer;

      &:hover {
        background-color: $color-neonSilver;
      }
    }
  }
}
</style>

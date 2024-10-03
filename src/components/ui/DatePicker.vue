<script setup lang="ts">
import { areDateSame } from "@/utils/utils";
import { onMounted, onUpdated, ref, watch } from "vue";
import Datepicker from "vue3-datepicker";
import * as Ui from "@/components/ui";

const props = defineProps<{
  label: string;
  type: string;
  date: string;
}>();
const emits = defineEmits<{
  (e: "onDateChange", value: string, type: string): void;
}>();

const date = ref(new Date(props.date));
watch(date, (updatedDate, oldDate) => {
  if (updatedDate && oldDate && areDateSame(updatedDate, oldDate)) {
    return;
  }
  emits("onDateChange", updatedDate?.toDateString() ?? "", props.type);
});
</script>
<template>
  <Ui.Label :label="type" />
  <Datepicker
    :style="{
      padding: '10px',
      color: '#393939',
      border: '1px solid #ccc',
      'border-radius': '4px',
      width: '250px',
    }"
    v-model="date"
    typeable
  />
</template>
<style scoped lang="scss">
@import "../../assets/styles/mixins.scss";

.date_picker_container {
  @include column-container;
}
</style>

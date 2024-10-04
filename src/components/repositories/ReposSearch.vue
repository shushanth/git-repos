<script setup lang="ts">
import * as Ui from "@/components/ui";
import type {
  RepositoriesStateSearch,
  RepositoriesDateRange,
  RepositoriesLanguages,
} from "@/stores/models/repositories.model";
import { LANGUAGES_CONFIG, type LangKeys } from "@/utils/constants";
import { computed, reactive } from "vue";

const props = defineProps<{
  selectedLangs: RepositoriesLanguages[];
  fromDate: string;
  toDate: string;
  starsRange: string;
}>();
const reposFilter = reactive<RepositoriesStateSearch>({
  languages: props.selectedLangs.length ? props.selectedLangs : [],
  datesRange: { from: props.fromDate, to: props.toDate },
  starsRange: props.starsRange,
});
const emits = defineEmits<{
  (e: "onSubmitFilter", filters: RepositoriesStateSearch): void;
}>();

const languageAdd = (id: string, name: string) => {
  const optionId = id as LangKeys;
  const config = { id: optionId, name } as RepositoriesLanguages;
  reposFilter.languages = [...reposFilter.languages, config];
};

const languageRemove = (id: LangKeys) => {
  const updatedLanguages = reposFilter.languages.filter(
    (lang) => lang.id !== id
  );
  reposFilter.languages = [...updatedLanguages];
};

const dateRangeUpdate = (date: string, type: string) => {
  const dateRangeType = type as keyof RepositoriesDateRange;
  reposFilter.datesRange = { ...reposFilter.datesRange, [dateRangeType]: date };
};

const starsRangeUpdate = (value: string) => {
  reposFilter.starsRange = value;
};

const submitFilter = () => emits("onSubmitFilter", reposFilter);

const searchDisabled = computed(() => !reposFilter.languages.length);
</script>
<template>
  <div class="filter_containers">
    <Ui.Heading title="Filters" level="h3" />
    <div class="filter_containers_form">
      <Ui.Bucket v-if="reposFilter.languages.length">
        <div class="selected_filters">
          <div
            class="item"
            v-for="language in reposFilter.languages"
            :key="language.id"
          >
            <Ui.Chip
              :id="language.id"
              :value="language.name"
              @onClose="languageRemove(language.id)"
            />
          </div>
        </div>
      </Ui.Bucket>
      <Ui.Bucket>
        <Ui.InputDropdown
          :options="LANGUAGES_CONFIG"
          @onOptionSelect="languageAdd"
        />
      </Ui.Bucket>
      <Ui.Bucket>
        <Ui.DatePicker
          type="from"
          label="From"
          :date="fromDate"
          @onDateChange="dateRangeUpdate"
        />
        <Ui.DatePicker
          :date="toDate"
          type="to"
          label="To"
          @onDateChange="dateRangeUpdate"
        />
      </Ui.Bucket>

      <Ui.Bucket>
        <Ui.InputRange
          label="Stars"
          min="100"
          max="10000"
          @onRangeUpdate="starsRangeUpdate"
        />
      </Ui.Bucket>
      <Ui.Bucket>
        <Ui.Button :disabled="searchDisabled" @onBtnClick="submitFilter"
          >Search selected filters</Ui.Button
        >
      </Ui.Bucket>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";

.filter_containers {
  @include column-container;
  margin: $spaces-l;

  &_form {
    padding: $spaces-l 0;
    .selected_filters {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin: 0 $spaces-sm;
        padding: $spaces-sm 0;
      }
    }
  }
}
</style>

<script setup lang="ts">
import * as Ui from "@/components/ui";
import ReposSearch from "@/components/repositories/ReposSearch.vue";
import ReposList from "@/components/repositories/ReposList.vue";
import { useRepositoriesStore } from "@/stores/repositories";
import type { RepositoriesStateSearch } from "@/stores/models/repositories.model";
import { storeToRefs } from "pinia";
import type { LangKeys } from "@/utils/constants";

const { repositoriesSearch, getReposByLanguage, repositories } = storeToRefs(
  useRepositoriesStore()
);
const { fetchRepositories, updateRepositoriesSearchFilter, updatePageResults } =
  useRepositoriesStore();

const onsubmitFilter = async (filters: RepositoriesStateSearch) => {
  await updateRepositoriesSearchFilter(filters);
  await fetchRepositories();
};

const updatePageByLanguage = (language: LangKeys) => {
  updatePageResults(language);
};
</script>
<template>
  <Ui.PageLayout title="Repositories">
    <div class="repositories">
      <div class="repositories_search">
        <ReposSearch
          :selectedLangs="repositoriesSearch.languages"
          :fromDate="repositoriesSearch.datesRange.from"
          :toDate="repositoriesSearch.datesRange.to"
          :starsRange="repositoriesSearch.starsRange"
          @onSubmitFilter="onsubmitFilter"
        />
      </div>
      <div class="repositories_list">
        <template v-if="repositories.loading && !repositories.error">
          <Ui.Label label="loading..." />
        </template>
        <template v-if="repositories.error">
          <Ui.Label
            level="error"
            label="Something went wrong, please try again"
          />
        </template>
        <template v-if="!repositories.loading && !repositories.error">
          <ReposList
            :reposList="getReposByLanguage"
            :fromDate="repositoriesSearch.datesRange.from"
            :toDate="repositoriesSearch.datesRange.to"
            :starsCount="repositoriesSearch.starsRange"
            @onUpdatePageResults="updatePageByLanguage"
          />
        </template>
      </div>
    </div>
  </Ui.PageLayout>
</template>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
.repositories {
  display: flex;
  height: 100vh;
  justify-content: center;
  gap: $spaces-xxl;
  width: 100%;
  &_search {
    width: 300px;
    max-width: 300px;
    border-right: 2px solid $color-whiteSnow;
  }
  &_list {
    flex: 1;
    overflow-y: auto;
    max-height: 85vh;
  }
}
</style>

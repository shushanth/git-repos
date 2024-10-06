<script setup lang="ts">
import type { RepositoriesByName } from "@/stores/models/repositories.model";
import type { LangKeys } from "@/utils/constants";
import * as Ui from "@/components/ui";
import { computed } from "vue";
const props = defineProps<{
  reposList: RepositoriesByName<LangKeys>;
  fromDate: string;
  toDate: string;
  starsCount: string;
}>();

const emits = defineEmits<{
  (e: "onUpdatePageResults", key: LangKeys): void;
}>();

const showReposCard = (lang: string): boolean => {
  const repoLang = lang as LangKeys;
  return !!props.reposList[repoLang]?.list.length;
};

const showReposPagination = (lang: string): boolean => {
  const repoLang = lang as LangKeys;
  const dataList = props.reposList[repoLang];
  debugger;
  const paginationExists =
    dataList?.page.currentPage &&
    dataList.page.currentPage <= dataList.page.totalPages &&
    dataList.page.totalPages > 1;
  return !!paginationExists;
};

const starsCountFormat = (count: string): string => {
  return `${Math.abs(Number(count) / 1000).toFixed(1)}k`;
};

const reposListKeys = computed(() => {
  return Object.keys(props.reposList);
});

const paginateRepos = (lang: LangKeys) => {
  emits("onUpdatePageResults", lang);
};
</script>
<template>
  <div class="repos_list">
    <Ui.Heading level="h3" title="Github repositories" />
    <Ui.Label v-if="reposListKeys.length">
      <p class="repo_info">
        between {{ fromDate }} and {{ toDate }} with atleast
        {{ starsCount }} stars
      </p>
    </Ui.Label>
    <Ui.Label v-if="!reposListKeys.length">No repositories found</Ui.Label>
    <div class="repos_list_cards" v-if="reposListKeys.length">
      <template v-for="reposLanguage in reposListKeys" :key="reposLanguage">
        <Ui.Card v-if="showReposCard(reposLanguage)">
          <Ui.Heading level="h3" :title="reposLanguage" />
          <div class="repos_languages_list">
            <div
              class="item"
              v-for="languageItem in reposList[reposLanguage as LangKeys]?.list"
              :key="languageItem.id"
            >
              <Ui.Bucket>
                <Ui.Label>
                  <a :href="languageItem.link" target="_blank">
                    {{ languageItem.name }}
                  </a>
                </Ui.Label>
                <Ui.Label :label="languageItem.description" />

                <Ui.Label>{{
                  new Date(languageItem.createdDate).toLocaleDateString()
                }}</Ui.Label>
                <Ui.Label>
                  {{ starsCountFormat(languageItem.starsCount) }}&#9734;
                </Ui.Label>
              </Ui.Bucket>
            </div>
          </div>
          <div
            v-if="showReposPagination(reposLanguage)"
            class="repos_list_pagination"
          >
            <Ui.Button @click="paginateRepos(reposLanguage as LangKeys)"
              >Show more</Ui.Button
            >
          </div>
        </Ui.Card>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";
.repos_list {
  @include column-container;
  margin: $spaces-l 0;
  .repo_info {
    @include column-container;
    font-size: $font-s;
    font-style: italic;
  }
  &_cards {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin: $spaces-xl;
  }
  .repos_languages_list {
    margin: $spaces-l 0;
    @include column-container;
  }
}
</style>

import { defineStore } from "pinia";

import { apiService, buildQuery, ITEMS_PER_PAGE } from "../services/apiService";
import type {
  RepositoriesByName,
  RepositoriesList,
  RepositoriesContentState,
  RepositoriesStateSearch,
  RepositoriesState,
  RepositoriesLanguages,
  RepositoriesResponse,
} from "@/stores/models/repositories.model";
import { dateFormat } from "@/utils/utils";
import type { LangKeys } from "@/utils/constants";

const http = apiService();

const repositoriesInitState: RepositoriesContentState = {
  loading: false,
  error: false,
  repos: {},
};

const repositoriesSearchInitState: RepositoriesStateSearch = {
  languages: [],
  datesRange: {
    from: dateFormat(new Date()),
    to: dateFormat(new Date()),
  },
  starsRange: "100",
};

export const useRepositoriesStore = defineStore({
  id: "respositories",
  state: (): RepositoriesState => {
    return {
      repositories: repositoriesInitState,
      repositoriesSearch: repositoriesSearchInitState,
    };
  },
  getters: {
    getReposByLanguage(state): RepositoriesByName<LangKeys> {
      const languageIds = Object.keys(state.repositories.repos) as LangKeys[];
      const repoConfig = (lang: LangKeys) =>
        state.repositories.repos[lang]?.list.map(
          (config: Partial<RepositoriesResponse>) => ({
            id: config.id,
            link: config.html_url,
            name: config.name,
            createdDate: config.created_at,
            starsCount: config.stargazers_count,
            description: config.description,
          })
        );
      const dataRepos = languageIds.reduce((acc: any, curr: LangKeys) => {
        let data = {
          ...acc,
          [curr]: {
            list: repoConfig(curr),
            page: {
              totalPages: state.repositories.repos[curr]?.page.totalPages,
              currentPage:
                state.repositories.repos[curr]?.page.currentPage ?? 1,
            },
          },
        };
        return data;
      }, {});
      return dataRepos;
    },
  },
  actions: {
    repositoriesLoading(loading: boolean) {
      this.repositories.loading = loading;
    },
    repositoriesError(error: boolean) {
      this.repositories.error = error;
    },
    repositoriesSuccess(
      data: {
        total_count: number;
        items: RepositoriesList[];
      },
      key?: string,
      updateExistingResults: boolean = false
    ) {
      debugger;
      const totalPages = Math.ceil(data.total_count / ITEMS_PER_PAGE);
      const languageKey = key as LangKeys;
      this.repositoriesLoading(false);
      this.repositoriesError(false);
      if (this.repositories.repos[languageKey]) {
        const currentPage =
          this.repositories.repos[languageKey].page.currentPage || 1;
        if (updateExistingResults) {
          this.repositories.repos[languageKey].list.push(...data.items);
        } else {
          this.repositories.repos[languageKey].list = data.items;
        }
        this.repositories.repos[languageKey].page.currentPage = currentPage;
        this.repositories.repos[languageKey].page.totalPages = totalPages;
        this.repositories.repos[languageKey].page.loading = false;
      } else {
        this.repositories.repos[languageKey] = {
          list: data.items,
          page: {
            currentPage: 1,
            totalPages,
            loading: false,
          },
        };
      }
    },
    fetchRepositories() {
      this.repositoriesLoading(true);

      const onSuccess = (
        data: {
          total_count: number;
          items: RepositoriesList[];
        },
        key?: string
      ) => {
        this.repositoriesSuccess(data, key);
      };
      const onFailure = (error: Error) => {
        this.repositoriesError(true);
      };

      this.repositoriesSearch.languages.forEach(
        (language: RepositoriesLanguages) => {
          const filterQuery = buildQuery(
            language.id,
            this.repositoriesSearch.datesRange.from,
            this.repositoriesSearch.datesRange.to,
            this.repositoriesSearch.starsRange,
            this.repositories.repos[language.id]?.page.currentPage || 1
          );
          const languageId = language.id as string;
          http.GET(filterQuery, onSuccess, onFailure, languageId);
        }
      );
    },
    updateRepositoriesSearchFilter(filters: RepositoriesStateSearch) {
      const filtersFormat = {
        ...filters,
        datesRange: {
          from: dateFormat(new Date(filters.datesRange.from)),
          to: dateFormat(new Date(filters.datesRange.to)),
        },
      };
      this.repositoriesSearch = filtersFormat;
    },
    updatePageResults(language: LangKeys) {
      if (this.repositories.repos[language]) {
        this.repositories.repos[language].page.loading = true;
        this.repositories.repos[language].page.currentPage += 1;
      }
      const filterQuery = buildQuery(
        language,
        this.repositoriesSearch.datesRange.from,
        this.repositoriesSearch.datesRange.to,
        this.repositoriesSearch.starsRange,
        this.repositories.repos[language]?.page.currentPage || 1
      );

      const onSuccess = (data: {
        total_count: number;
        items: RepositoriesList[];
      }) => {
        this.repositoriesSuccess(data, language, true);
      };

      const onFailure = (error: Error) => {
        this.repositoriesError(true);
      };

      http.GET(filterQuery, onSuccess, onFailure, language);
    },
  },
});

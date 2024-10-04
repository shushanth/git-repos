import type { LangKeys } from "../../utils/constants";

export type RepositoriesLanguages = {
  id: LangKeys;
  name: string;
};

export type RepositoriesDateRange = {
  from: string;
  to: string;
};

export type RepositoriesResponse = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: string;
  created_at: string;
};

export type RepositoriesList = {
  id: number;
  name: string;
  link: string;
  description: string;
  starsCount: string;
  createdDate: string;
};

export type RepositoriesByName<T extends LangKeys> = {
  [P in T]?: {
    list: RepositoriesList[];
    page: {
      totalPages: number;
      currentPage: number;
      loading: boolean;
    };
  };
};

export type RepositoriesContentState = {
  loading: boolean;
  error: boolean;
  repos: RepositoriesByName<LangKeys>;
};

export type RepositoriesStateSearch = {
  languages: RepositoriesLanguages[];
  datesRange: RepositoriesDateRange;
  starsRange: string;
};

export type RepositoriesState = {
  repositories: RepositoriesContentState;
  repositoriesSearch: RepositoriesStateSearch;
};

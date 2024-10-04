import { dateFormat } from "@/utils/utils";
import type { RepositoriesLanguages } from "@/stores/models/repositories.model";
import axios from "axios";
import type { LangKeys } from "@/utils/constants";

export const BASE_URL = "https://api.github.com/search/repositories";
export const ITEMS_PER_PAGE = 30;

export type HttpVerbs = {
  GET: "GET";
};

export type HttpConfig = {
  [k in keyof HttpVerbs]: (
    query: string,
    onSuccess: (result: any, key?: string) => void,
    onFailure: (error: Error, key?: string) => void,
    key?: string
  ) => void;
};

export const apiService = (): HttpConfig => {
  const config: HttpConfig = {
    GET: async (query, onSuccess, onFailure, key?: string) => {
      const url = `${BASE_URL}${query}`;
      try {
        const result = await axios.get(url);
        onSuccess(result.data, key);
      } catch (error: any) {
        onFailure(error, key);
        throw error;
      }
    },
  };
  return config;
};

export function buildQuery(
  language: LangKeys,
  fromDate: string,
  toDate: string,
  starsRange: string,
  currentPage: number
): string {
  const dateRange = `created:"${dateFormat(new Date(fromDate))}..${dateFormat(new Date(toDate))}"`;
  const languagesQuery = `language:${language.toLocaleLowerCase()} `;
  const starsCountRange = `>=${starsRange}`;
  const filterQuery = `?q=${dateRange}${languagesQuery}stars:${starsCountRange}&sort='stars'&order='desc'&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`;
  return filterQuery;
}

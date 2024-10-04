export type LangKeys = keyof typeof LANGUAGES;

const LANGUAGES = {
  JAVASCRIPT: "Javascript",
  TYPESCRIPT: "Typescript",
  JAVA: "Java",
  RUST: "Rust",
  C: "C",
  PYTHON: "Python",
};

const LANGUAGES_CONFIG_KEYS = Object.keys(LANGUAGES) as LangKeys[];
export const LANGUAGES_CONFIG = LANGUAGES_CONFIG_KEYS.map((key) => ({
  id: key,
  name: LANGUAGES[key],
}));

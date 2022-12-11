export interface FormEntryProps extends Record<string, string> {
  url: string;
}

export const enum FormErrors {
  "url" = "Please enter a valid github URL",
  "api" = "Oops! Something went wrong. Try again.",
}

export interface ValidationReturnProps extends Record<string, string> {
  owner: string;
  repo: string;
}

import { useState, useCallback, FormEvent, useEffect } from "react";
import {
  FormEntryProps,
  ValidationReturnProps,
  FormErrors,
} from "@/types/form.types";
import { getParam } from "@/utils/params.util";
import { useRouter } from "next/router";

export const useForm = () => {
  /**
   * Catch error query param and remove it from the URL
   */
  const router = useRouter();
  useEffect(() => {
    const error = getParam("error");
    if (!error) return;
    setFormError(error === "url" ? FormErrors.url : FormErrors.api);
    router.replace("/", undefined, { shallow: true });
  }, [router.query]);

  /**
   * Check if URL is valid and parse owner / repo
   */
  const [formError, setFormError] = useState("");
  const validateUrlData = useCallback(
    (url: string): ValidationReturnProps | void => {
      if (!url.includes("https://github.com/")) return;

      const { pathname } = new URL(url);
      const [, owner, repo] = pathname.split("/");
      if (!owner || !repo) return;

      return { owner, repo };
    },
    []
  );

  /**
   * Handle form submit
   */
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const formData = new FormData(event.currentTarget);
    const { url } = Object.fromEntries(formData) as FormEntryProps;
    const urlData = validateUrlData(url);
    if (!urlData) return setFormError(FormErrors.url);

    const { owner, repo } = urlData;
    router.push(`/${owner}/${repo}`);
  }, []);

  return { onSubmit, formError };
};

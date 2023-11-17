import { useRouter } from "next/router";

import * as React from "react";

import { LanguageSelector } from "@wmo-dev/language-selector";
import { useCookies } from "react-cookie";

import * as Styled from "./styled";

export interface Props {
  className?: string;
}

const ONE_YEAR = 365 * 24 * 60 * 60;

export const LanguageChanger: React.FC<Props> = ({ className = "" }) => {
  const router = useRouter();
  const [, setCookie] = useCookies(["NEXT_LOCALE"]);

  const language = router.locale ?? router.defaultLocale ?? "en-US";
  const availableLanguages = router.locales ?? ["en-US"];

  const onChange = React.useCallback(
    (language: string) => {
      router.push(router, undefined, { locale: language });
      setCookie("NEXT_LOCALE", language, {
        sameSite: true,
        maxAge: ONE_YEAR,
      });
    },
    [router, setCookie]
  );

  return (
    <Styled.LanguageChangerWrapper className={className}>
      <LanguageSelector
        language={language}
        availableLanguages={availableLanguages}
        onChange={onChange}
      />
    </Styled.LanguageChangerWrapper>
  );
};

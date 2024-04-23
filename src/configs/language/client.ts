// import HttpApi from "i18next-http-backend";
import { UserConfig } from "react-i18next";

// import { isBrowser } from "utils/environment";

import { i18nCommonConfig } from "./common";
import { isBrowser } from "lib/utils/environment";

export const i18nClientConfig: UserConfig = {
  ...i18nCommonConfig,
  // use: isBrowser ? [HttpApi] : [],
  backend: isBrowser
    ? {
        loadPath: "/locales/en-US/layout.json",
      }
    : undefined,
  react: { useSuspense: isBrowser },
};

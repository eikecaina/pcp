// import { AppProps } from "next/app";

// import { appWithTranslation } from "next-i18next";

// import { i18nClientConfig } from "configs/language/client";

// import { ElementType } from "react";

// export const withTranslations: React.HOC = (Component: ElementType) =>
//   appWithI18Next(Component, ni18nConfig);
  // appWithTranslation(Component, i18nClientConfig);


  import { AppProps } from "next/app";

// import { appWithTranslation } from "next-i18next";

import { i18nClientConfig } from "configs/language/client";

export const withTranslations: React.HOC<AppProps> = (Component) =>
  appWithTranslation(Component, i18nClientConfig);

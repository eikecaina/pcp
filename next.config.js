const APP_ENV = process.env.APP_ENV ?? "dev";

module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "pt-BR", "es-MX"],
    localeDetection: true,
  },
  env: {
    SITE_NAME: "Nextjs Boileplate",
  },
  serverRuntimeConfig: {
    APP_ENV,
  },
  async rewrites() {
    return [
      {
        source: "/locales/:language/:namespace",
        destination: "/api/locales/:language/:namespace",
      },
    ];
  },
};

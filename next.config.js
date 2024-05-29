const APP_ENV = process.env.APP_ENV ?? "dev";

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/', // automatically becomes /docs/with-basePath
  //       destination: '/:locale', // automatically becomes /docs/another
  //       permanent: false,
  //     },
  //   ]
  // },
  output: "standalone",
  env: {
    SITE_NAME: "WTPC",
  },
  serverRuntimeConfig: {
    APP_ENV,
  },
};

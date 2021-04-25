const CracoLessPlugin = require("craco-less");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = {
  babel: {
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      "babel-plugin-parameter-decorator",
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: true,
                compact: true,
              }),
              "@primary-color": "tomato",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

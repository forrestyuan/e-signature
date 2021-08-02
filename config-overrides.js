const {
  override,
  addWebpackAlias,
  addLessLoader,
  addPostcssPlugins,
} = require("customize-cra");
const path = require("path");
/* config-overrides.js */
module.exports = override(
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src"),
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  addPostcssPlugins([require("postcss-px2rem")({ remUnit: 100 })]),
  // 使babel支持除了src以外的文件
  (config) => {
    // Let Babel compile outside of src/.
    const tsRule = config.module.rules[1].oneOf[2];
    tsRule.include = undefined;
    tsRule.exclude = /node_modules/;
    return config;
  }
);

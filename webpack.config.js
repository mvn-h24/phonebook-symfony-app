const Encore = require("@symfony/webpack-encore");
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("app", "./assets/app.ts")
  .enableSingleRuntimeChunk()
  .addAliases({
    "@app/ui": path.resolve(__dirname, "assets/app/components"),
    "@app/store": path.resolve(__dirname, "assets/app/store/index.ts"),
    "@api-client": path.resolve(__dirname, "assets/app/client/index.ts"),
  })
  .configureBabel((config) => {
    config.plugins.push("@babel/plugin-transform-runtime");
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .enableVueLoader(() => {}, { runtimeCompilerBuild: false })
  .enableTypeScriptLoader((options) => {
    options.appendTsSuffixTo = [/\.vue$/];
  })
  .enableForkedTypeScriptTypesChecking()

  /*
   * FEATURE CONFIG
   */
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());
if (Encore.isProduction()) {
  Encore.splitEntryChunks();
}
module.exports = Encore.getWebpackConfig();

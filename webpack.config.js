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
    "@app/ui": path.resolve(__dirname, "assets/app/components/"),
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .enableVueLoader(() => {}, { runtimeCompilerBuild: false })
  .enableTypeScriptLoader((options) => {
    options.appendTsSuffixTo = [/\.vue$/];
  })

  /*
   * FEATURE CONFIG
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());
if (Encore.isProduction()) {
  Encore.splitEntryChunks();
}
module.exports = Encore.getWebpackConfig();

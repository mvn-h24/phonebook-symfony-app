const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.ts')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()


    .enableVueLoader(() => {}, { runtimeCompilerBuild: false })
    .enableTypeScriptLoader(options => {
        options.appendTsSuffixTo = [/\.vue$/];
    })

    /*
     * FEATURE CONFIG
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();

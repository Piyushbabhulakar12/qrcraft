const PrerenderSPAPlugin = require("prerender-spa-plugin");
const path = require("path");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: config.output.path,
        routes: ["/"],
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
        },
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          headless: true,
          renderAfterTime: 1000, // short wait to avoid timeout
        }),
        postProcess(renderedRoute) {
          // ignore prerender failures to let build succeed
          return renderedRoute;
        },
      })
    );
  }
  return config;
};

const PrerenderSPAPlugin = require("prerender-spa-plugin");
const path = require("path");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "build"),
        routes: ["/"], // your routes here
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
        },
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          renderAfterDocumentEvent: "prerender-ready", // wait for this event
          headless: true,
        }),
      })
    );
  }
  return config;
};

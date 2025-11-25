const PrerenderSPAPlugin = require("prerender-spa-plugin");
const path = require("path");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "build"),
        routes: ["/"],
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
        },
      })
    );
  }
  return config;
};

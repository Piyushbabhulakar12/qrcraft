// const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const path = require("path");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// module.exports = function override(config, env) {
//   if (env === "production") {
//     config.plugins.push(
//       new PrerenderSPAPlugin({
//         staticDir: path.join(__dirname, "build"),
//         routes: ["/"], // make sure your routes exist
//         renderer: new Renderer({
//           renderAfterDocumentEvent: "render-event", // see note below
//         }),
//       })
//     );
//   }
//   return config;
// };

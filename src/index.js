import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Detect if we are prerendering (running in Node/Puppeteer)
const isPrerendering = typeof window === "undefined";
const Router = isPrerendering ? StaticRouter : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router location={isPrerendering ? "/" : undefined}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();

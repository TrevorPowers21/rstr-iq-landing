import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import InvestorPreview from "./InvestorPreview";

// Hidden, unlisted route — no router library needed for one path. Not
// linked anywhere in the site nav or sitemap; reachable only by whoever
// has this exact URL.
const isInvestorPreview = window.location.pathname === "/preview/gv3k9m2p";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isInvestorPreview ? <InvestorPreview /> : <App />}</StrictMode>,
);

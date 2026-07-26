import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/600-italic.css";
import { App } from "./App.jsx";
import { CheckoutPage } from "./Checkout.jsx";
import { LegalPage } from "./Legal.jsx";
import "./styles.css";

const query = new URLSearchParams(window.location.search);
const pathname = window.location.pathname.replace(/\/+$/, "");
const isCheckout =
  query.get("page") === "checkout" ||
  pathname.endsWith("/checkout");
const legalType =
  query.get("page") === "privacy" || pathname.endsWith("/privacy")
    ? "privacy"
    : query.get("page") === "terms" || pathname.endsWith("/terms")
      ? "terms"
      : null;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isCheckout ? <CheckoutPage /> : legalType ? <LegalPage type={legalType} /> : <App />}
  </React.StrictMode>,
);

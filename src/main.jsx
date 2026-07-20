import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/600-italic.css";
import { App } from "./App.jsx";
import { CheckoutPage } from "./Checkout.jsx";
import "./styles.css";

const query = new URLSearchParams(window.location.search);
const isCheckout =
  query.get("page") === "checkout" ||
  window.location.pathname.replace(/\/+$/, "").endsWith("/checkout");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isCheckout ? <CheckoutPage /> : <App />}
  </React.StrictMode>,
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


// render to page
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
        </ClerkProvider>
  </React.StrictMode>
);

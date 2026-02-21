// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";

const htmlRoot = document.querySelector<HTMLDivElement>("#root");

if(htmlRoot){
  const root = createRoot(htmlRoot);
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>
  )
}
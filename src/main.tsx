import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { MobileProvider } from "./context/Mobile.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MobileProvider>
        <App />
      </MobileProvider>
    </AuthProvider>
  </React.StrictMode>,
);



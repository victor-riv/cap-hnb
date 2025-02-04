import React from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes/Routes";
import "./style/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);


import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import PlanetPage from "./components/primary-pages/PlanetPage";
import RandomPlanet from "./components/primary-pages/RandomPlanet";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PostsPage from "./components/posts/PostsPage";
import Post from "./components/single-post/Post";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="planets/:planet" element={<PlanetPage />} />
            <Route path="planets/:planet/discussion" element={<PostsPage />} />
            <Route
              path="planets/:planet/discussion/:postId"
              element={<Post />}
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<RandomPlanet />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

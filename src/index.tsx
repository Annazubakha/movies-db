import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Home } from "./pages/Home/Home";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { LinearProgress } from "@mui/material";

const Movies = lazy(() => import("./components/Movies/Movies"));
const About = lazy(() => import("./pages/About/About"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function AppEntrypoint() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntrypoint />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

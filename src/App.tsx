import { render } from "react-dom";
import { StrictMode, useState, lazy, Suspense } from "react";
import ThemeContext from "./ThemeContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Provider store={store}>
          <ThemeContext.Provider value={theme}>
            <BrowserRouter>
              <header>
                <Link to="/">Adopt Me 123123!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </Provider>
      </Suspense>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DescriptionContainer from "./components/DescriptionContainer";
import Header from "./components/Header";
import PathContainer from "./components/PathContainer";
import Home from "./pages/Home";
import Main from "./pages/Main";
import useThemeStore from "./stores/ThemeStore";

const App = () => {
  const { selectedTheme } = useThemeStore();

  return (
    <div className={selectedTheme + " text-sm font-light md:text-md"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/home" exact element={<Home />}>
            <Route path="learning-path" exact element={<PathContainer />} />
            <Route
              path="description/:index"
              exact
              element={<DescriptionContainer />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

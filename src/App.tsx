import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CocktailDetail } from "./components/cocktailDetail";
import { CocktailList } from "./components/cocktailList";
import { CocktailsProvider } from "./context/cocktailProvider";

const App = () => {
  return (
    <BrowserRouter>
      <CocktailsProvider>
        <Routes>
          <Route path="/" element={<CocktailList />} />
          <Route path="/:id" element={<CocktailDetail />} />
        </Routes>
      </CocktailsProvider>
    </BrowserRouter>
  );
};

export default App;

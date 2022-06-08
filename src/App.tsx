import React from "react";
import { Route, Routes } from "react-router-dom";
import { CocktailDetail } from "./components/cocktailDetail";
import { CocktailList } from "./components/cocktailList";
import { CocktailsProvider } from "./context/cocktailProvider";

const App = () => {
  return (
    <CocktailsProvider>
      <Routes>
        <Route path="/" element={<CocktailList />} />
        <Route path="/:id" element={<CocktailDetail />} />
      </Routes>
    </CocktailsProvider>
  );
};

export default App;

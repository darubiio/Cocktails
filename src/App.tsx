import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CocktailList } from "./components/cocktailList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CocktailList
              url={"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="}
            />
          }
        />
        {/* <Route path="/:id" element={<CocktailDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

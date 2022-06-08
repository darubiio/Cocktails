import React from "react";
import { Link } from "react-router-dom";
import { Cocktail } from "../interfaces";

export const Cocktails = ({ arrC }: { arrC: Cocktail[] }) => {
  return (
    <div>
      {arrC && (
        <div id="cocktail list">
          {arrC.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <Link to={`/${cocktail.idDrink}`}>{cocktail.strDrink}</Link>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

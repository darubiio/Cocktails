import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CocktailContext } from "../context/cocktailProvider";
import { usePreparation } from "./hook/usePreparation";

export const CocktailDetail = () => {
  let { id } = useParams();
  const {
    state: { arrC },
  } = useContext(CocktailContext);

  const cocktail = arrC.find((cocktl) => cocktl.idDrink === id);
  const preparation = usePreparation(cocktail);

  return (
    <div>
      <h3>{cocktail?.strDrink}</h3>
      {preparation?.map((el) => (
        <div key={el.measure + el.ingredient}>
          <span>
            {el.ingredient} {el.measure ? `(${el.measure})` : ""}
          </span>
        </div>
      ))}
      <p>{cocktail?.strInstructions}</p>
    </div>
  );
};

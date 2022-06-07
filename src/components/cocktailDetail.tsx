import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CocktailContext } from "../context/cocktailProvider";
import { Cocktail } from "../interfaces";

type Preparation = {
  ingredient: string;
  measure: string;
};

export const CocktailDetail = () => {
  let { id } = useParams();
  const {
    state: { arrC },
  } = useContext(CocktailContext);

  const cocktail = arrC.find((cocktl) => cocktl.idDrink === id);

  let preparation: Preparation[] = [];
  for (let i = 0; i <= 15; i++) {
    if (cocktail && cocktail[("strIngredient" + i) as keyof Cocktail]) {
      const ingredient = cocktail[("strIngredient" + i) as keyof Cocktail];
      const measure = cocktail[("strMeasure" + i) as keyof Cocktail];
      preparation = [...preparation, { ingredient, measure }];
    }
  }
  return (
    <div>
      <h3>{cocktail?.strDrink}</h3>
      {preparation.map((el) => (
        <div key={el.measure + el.ingredient}>
          <span>{`${el.ingredient} (${el.measure})`}</span>
        </div>
      ))}
      <p>{cocktail?.strInstructions}</p>
    </div>
  );
};

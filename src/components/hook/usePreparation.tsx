import { Cocktail } from "../../interfaces";

type Preparation = {
  ingredient: string;
  measure: string;
};

export const usePreparation = (cocktail: Cocktail | undefined) => {
  let preparation: Preparation[] = [];
  for (let i = 0; i <= 15; i++) {
    if (cocktail && cocktail[("strIngredient" + i) as keyof Cocktail]) {
      const ingredient = cocktail[("strIngredient" + i) as keyof Cocktail];
      const measure = cocktail[("strMeasure" + i) as keyof Cocktail];
      preparation = [...preparation, { ingredient, measure }];
    }
  }
  return preparation;
};

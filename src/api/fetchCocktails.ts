import axios from "axios";
import { Cocktail } from "../interfaces";

export const fetchCocktails = async (
  url: string,
  setCocktail: (cocktail: Cocktail[]) => void,
  setError: (error: string) => void
) => {
  await axios
    .get(url)
    .then((res) => {
      const { drinks } = res.data;
      return drinks
        ? setCocktail(res.data.drinks)
        : setError("We couldn't find cocktails with the given name");
    })
    .catch((error) => {
      setError("Server Error");
    });
};

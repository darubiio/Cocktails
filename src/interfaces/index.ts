import { Dispatch } from "react";

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strMeasure1: string;
}

export type ActionType =
  | { type: "setCocktails"; payload: Cocktail[] }
  | { type: "setError"; payload: string }
  | { type: "setLoading" };

export type StateType = {
  arrC: Cocktail[];
  err: string;
  loading: boolean;
};

export type ContextType = {
  state: StateType;
  // dispatch: Dispatch<ActionType>;
  setCocktail: (cocktails: Cocktail[]) => void;
  setError: (error: string) => void;
  setLoading: () => void;
};

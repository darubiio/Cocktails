import React, {
  ChangeEvent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../api/fetchCocktails";
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
  | { type: "setError"; payload: string };

type StateType = {
  arrC: Cocktail[];
  err: string;
};
const cocktailsInitialState: StateType = { arrC: [], err: "" };

const cocktailReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "setCocktails":
      return { ...state, arrC: action.payload, err: "" };
    case "setError":
      return { ...state, err: action.payload, arrC: [] };
    default:
      return state;
  }
};

export const CocktailList = ({ url }: { url: string }) => {
  const [{ arrC, err }, dispatch] = useReducer(
    cocktailReducer,
    cocktailsInitialState
  );
  const ref = useRef<NodeJS.Timeout>();
  const [query, setQuery] = useState("");

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
  };

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      fetchCocktails(`${url}${query}`, dispatch);
    }, 500);
  }, [query, url, dispatch]);

  return (
    <>
      <input
        type="text"
        placeholder="Cocktail name"
        value={query}
        aria-label="Cocktail name"
        onChange={handleChange}
      />

      {arrC && (
        <div id="cocktail list">
          {arrC.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <Link to={`/${cocktail.idDrink}`}>{cocktail.strDrink}</Link>
            </li>
          ))}
        </div>
      )}
      {err && <p role="alert">{err}</p>}
    </>
  );
};

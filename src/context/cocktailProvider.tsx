import { createContext, useCallback, useReducer } from "react";
import { Cocktail, ContextType, StateType } from "../interfaces";
import { cocktailReducer } from "./cocktailReducer";

const cocktailsInitialState: StateType = { arrC: [], err: "", loading: true };
export const CocktailContext = createContext({} as ContextType);

export const CocktailsProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(cocktailReducer, cocktailsInitialState);

  const setCocktail = useCallback((cocktail: Cocktail[]) => {
    dispatch({ type: "setCocktails", payload: cocktail });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: "setError", payload: error });
  }, []);

  const setLoading = useCallback(() => {
    dispatch({ type: "setLoading" });
  }, []);

  return (
    <CocktailContext.Provider
      value={{ state, setCocktail, setError, setLoading }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

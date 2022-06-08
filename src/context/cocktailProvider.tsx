import { createContext, useReducer } from "react";
import { ContextType, StateType } from "../interfaces";
import { cocktailReducer } from "./cocktailReducer";

const cocktailsInitialState: StateType = { arrC: [], err: "", loading: true };
export const CocktailContext = createContext<ContextType>({
  state: cocktailsInitialState,
  dispatch: () => null,
});

export const CocktailsProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(cocktailReducer, cocktailsInitialState);
  return (
    <CocktailContext.Provider value={{ state, dispatch }}>
      {children}
    </CocktailContext.Provider>
  );
};

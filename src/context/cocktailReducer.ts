import { Reducer } from "react";
import { ActionType, StateType } from "../interfaces";

export const cocktailReducer: Reducer<StateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case "setCocktails":
      return { ...state, arrC: action.payload, err: "" };
    case "setError":
      return { ...state, err: action.payload, arrC: [] };
    default:
      return state;
  }
};

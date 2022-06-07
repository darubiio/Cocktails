import axios from "axios";
import { Dispatch } from "react";
import { ActionType } from "../components/cocktailList";

export const fetchCocktails = async (
  url: string,
  dispatch: Dispatch<ActionType>
) => {
  await axios
    .get(url)
    .then((res) => {
      const { drinks } = res.data;
      return drinks
        ? dispatch({ type: "setCocktails", payload: res.data.drinks })
        : dispatch({
            type: "setError",
            payload: "We couldn't find cocktails with the given name",
          });
    })
    .catch((error) => {
      dispatch({ type: "setError", payload: "Server error" });
    });
};

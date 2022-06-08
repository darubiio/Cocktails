import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchCocktails } from "../api/fetchCocktails";
import { CocktailContext } from "../context/cocktailProvider";
import { Cocktails } from "./cocktails";
import { ErrorM } from "./error";
import { Input } from "./input";

export const CocktailList = () => {
  const {
    state: { arrC, err },
    dispatch,
  } = useContext(CocktailContext);

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
      fetchCocktails(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
        dispatch
      );
    }, 400);
  }, [query, dispatch]);

  return (
    <>
      <Input
        type="text"
        placeholder="Cocktail name"
        value={query}
        aria-label="Cocktail name"
        onChange={handleChange}
      />
      <Cocktails arrC={arrC} />
      <ErrorM err={err} />
    </>
  );
};

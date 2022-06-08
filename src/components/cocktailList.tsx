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
import { Loading } from "./loading";

export const CocktailList = () => {
  const {
    state: { arrC, err, loading },
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
      dispatch({ type: "setLoading" });
    }
    ref.current = setTimeout(() => {
      fetchCocktails(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
        dispatch
      );
    }, 300);
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
      <Loading loading={loading} />
      <Cocktails arrC={arrC} />
      <ErrorM err={err} />
    </>
  );
};

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
    setCocktail,
    setError,
    setLoading,
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
      setLoading();
    }
    ref.current = setTimeout(() => {
      fetchCocktails(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
        setCocktail,
        setError
      );
    }, 300);
  }, [query, setCocktail, setError, setLoading]);

  return (
    <>
      <Input
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

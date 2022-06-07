import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../api/fetchCocktails";
import { CocktailContext } from "../context/cocktailProvider";

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
    }, 500);
  }, [query, dispatch]);

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

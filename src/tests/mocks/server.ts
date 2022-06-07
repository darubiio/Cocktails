import { rest } from "msw";
import { setupServer } from "msw/lib/node";

export const server = setupServer(
  rest.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php",
    (req, res, ctx) => {
      return res(
        ctx.json({
          drinks: [
            {
              idDrink: 1,
              strDrinkThumb: "./images/thumbs-down.svg",
              strDrink: "test drink",
              strInstructions: "test instructions",
              strIngredient1: "test ingredient",
            },
          ],
        })
      );
    }
  )
);

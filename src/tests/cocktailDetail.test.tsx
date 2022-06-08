import App from "../App";
import { server } from "./mocks/server";
import { rest } from "msw";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { CocktailsProvider } from "../context/cocktailProvider";
import { CocktailList } from "../components/cocktailList";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("given an inaccesible api return a message", async () => {
  server.use(
    rest.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php",
      (req, res, ctx) => {
        return res(ctx.status(503));
      }
    )
  );
  render(
    <CocktailsProvider>
      <CocktailList />
    </CocktailsProvider>
  );
  const queryInput = screen.getByRole("textbox", { name: /cocktail name/i });
  userEvent.type(queryInput, "test");
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/Server error/i);
});

test("click a cocktail link should change the route", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
  const link = await screen.findByRole("link", { name: /test drink/i });
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  expect(history.location.pathname).toEqual("/1542");
});

test("click a cocktail link should display cocktel detail", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const link = await screen.findByRole("link", { name: /test drink/i });
  userEvent.click(link);
  const head = await screen.findByRole("heading");
  expect(head).toHaveTextContent(/test drink/i);
});

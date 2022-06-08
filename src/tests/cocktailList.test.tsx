import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "./mocks/server";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import { rest } from "msw";
import { CocktailList } from "../components/cocktailList";
import { CocktailsProvider } from "../context/cocktailProvider";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should display loading first and after a change", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const loading = screen.getByText(/loading.../i);
  expect(loading).toBeInTheDocument();
  const queryInput = screen.getByRole("textbox", { name: /cocktail name/i });
  userEvent.type(queryInput, "test");
  expect(loading).toBeInTheDocument();
});

test("given drinks data, renders output to screen", async () => {
  const history = createMemoryHistory();
  render(
    <CocktailsProvider>
      <Router location={history.location} navigator={history}>
        <CocktailList />
      </Router>
    </CocktailsProvider>
  );
  const queryInput = screen.getByRole("textbox", { name: /cocktail name/i });
  userEvent.type(queryInput, "test");

  const link = await screen.findByRole("link", { name: /test drink/i });
  expect(link).toBeInTheDocument();
});

test("given no drinks data, render a message", async () => {
  server.use(
    rest.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php",
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            drinks: null,
          })
        );
      }
    )
  );
  render(
    <CocktailsProvider>
      <CocktailList />
    </CocktailsProvider>
  );
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    /We couldn't find cocktails with the given name/i
  );
});

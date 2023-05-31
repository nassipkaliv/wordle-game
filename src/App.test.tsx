import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent } from "./test/test-utils";

describe("Simple working test", () => {
  test("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/wordle/i)).toBeInTheDocument();
  });

  test("shows empty state", () => {
    useStore.getState().newGame([]);
    render(<App />);
    expect(screen.queryByText("Game Over!")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  test("shows one row of guesses", () => {
    useStore.getState().newGame(["touch"]);
    render(<App />);
    expect(document.querySelector("main")?.textContent).toEqual("touch");
  });

  test("shows lost game over state", () => {
    useStore.getState().newGame(Array(6).fill("grass"));
    render(<App />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
  });

  test("shows won game over state", () => {
    useStore.getState().newGame(Array(2).fill("grass"));
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);
    render(<App />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
  });

  test("able to start new game", () => {
    useStore.getState().newGame(Array(6).fill("grass"));
    render(<App />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
    userEvent.click(screen.getByText("New Game"));
    expect(document.querySelector("main")?.textContent).toEqual("");
  });
});
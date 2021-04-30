import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import './App.css';
import Settings from "./Settings";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
  act(() => {
    render(<Settings auth={{onAuthStateChanged: () => null}}/>, container);
  })
  expect(container.textContent).toContain("Settings");
  expect(container.textContent).toContain("History");
  expect(container.textContent).toContain("x");
});
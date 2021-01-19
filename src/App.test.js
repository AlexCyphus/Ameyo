import 'regenerator-runtime/runtime'
import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

// mock html canvas
import 'jest-canvas-mock';

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

it("renders", async () => {
    act(() => {
      render(<App/>, container);
    })
    expect(container.textContent).toContain("Settings");
});

it("doesn't render statistics or settings", async () => {
  act(() => {
    render(<App/>, container);
  })
  expect(container.textContent).not.toContain("Completed Tickets");
  expect(container.textContent).not.toContain("Freeze on today's image");
});
import createPalette from "@material-ui/core/styles/createPalette";
import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import './App.css';
import Item from "./Item";

let container = null;

jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
      draggableProps: {
        style: {},
      },
      innerRef: jest.fn(),
    }, {}),
    Draggable: ({ children }) => children({
      draggableProps: {
        style: {},
      },
      innerRef: jest.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,
  }));

const itemWithLabel =  {
    "id": "item-1",
    "content": "Hello: world",
    "checked": "unchecked",
    "date": [1,22]
}

const itemWithoutLabel =  {
    "id": "item-1",
    "content": "Helo world",
    "checked": "unchecked",
    "date": [1,22]
}

let colors = {}

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  colors = {}
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders a label when it should", () => {
    act(() => {
        render(<Item item={itemWithLabel} colors={colors} claimColor={() => {}}/>, container);
    })
    expect(container.children[0].children[1].classList).toContain("dot");
});

it("doesn't render a label when it shouldn't", () => {
    act(() => {
        render(<Item item={itemWithoutLabel} colors={colors} claimColor={() => {}}/>, container);
    })
    expect(container.children[0].children[1]).toBe(undefined)
});
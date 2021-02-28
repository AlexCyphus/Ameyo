import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";

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

it("renders with item", () => {
  act(() => {
    let items = [{"id":"item-1","content":"this is a test card","checked":"unchecked","date":[12,5]}]
    let column = {"id":"habits","title":"Habits","emoji":"⏰","itemIds":["item-1"],"description":"Daily tasks"}
    render(<DragDropContext><Column items={items} column={column} inputs=""/></DragDropContext>, container);
  })
  expect(container.textContent).toBe("Habits⏰this is a test card");
});

it("renders without any items", () => {
  act(() => {
    let items = []
    let column = {"id":"habits","title":"Habits","emoji":"⏰","itemIds":["item-1", "item-3"],"description":"Daily tasks"}
    render(<DragDropContext><Column items={items} column={column} inputs=""/></DragDropContext>, container);
  })
  expect(container.textContent).toBe("Habits⏰");
});


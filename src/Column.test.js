// hello.test.js

import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Item from './Item'

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
    const items = [{"id":"item-1","content":"this is a test card","checked":"unchecked","date":[12,5]}]
    const column = {"id":"habits","title":"Habits","emoji":"⏰","itemIds":["item-1"],"description":"Daily tasks"}
    render(<DragDropContext><Column items={items} column={column} inputs=""/></DragDropContext>, container);
  })
  expect(container.textContent).toBe("this is a test card");
});

//   act(() => {
//     render(<Hello name="Margaret" />, container);
//   });
//   expect(container.textContent).toBe("Hello, Margaret!");
// });

// renders in general 

// renders correctly given certain props 

// matches snapshot
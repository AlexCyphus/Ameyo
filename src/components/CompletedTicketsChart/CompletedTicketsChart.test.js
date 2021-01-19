import 'regenerator-runtime/runtime'
import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CompletedTicketsChart from './CompletedTicketsChart'
// import {Line} from 'react-chartjs-2'

// mock html canvas
// import 'jest-canvas-mock';
// jest.mock('react-chartjs-2', () => 'Chart')

let container = null;
let history = []

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);  
  let todaysDate = new Date();
  let yesterday = new Date(todaysDate - 86400000);
  history = JSON.parse(JSON.stringify([["Wireframes for recommended test", yesterday],["Dev ticket for recommended test", yesterday],["Design ticket for recommended test",yesterday],["deutsche Hausaufgaben",yesterday],["Read \"Chat Life\" proposal",yesterday],["deutsche Stunde",yesterday]]))
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("given history a chart renders", async () => {
    act(() => {
      render(<CompletedTicketsChart history={history}/>, container);
    })

    // how can i test that its actually rendering the chart properly?
    // this currently doesn't really do anything
    expect(container.children[0].children[0].children[0].height).toBe(0)
  });
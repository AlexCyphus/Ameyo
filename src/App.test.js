import 'regenerator-runtime/runtime'
import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() })


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

it("correctly renders the time", () => {
  const wrapper = shallow(<App/>);
  const getTimeDifference = (type, endOfDay, date) => wrapper.instance().getTimeDifference(type, endOfDay, date);

  const makeDateCorrectDate = (oldDate) => {
    let todaysDate = new Date()
    oldDate.setDate(todaysDate.getDate())
    oldDate.setMonth(todaysDate.getMonth())
    oldDate.setFullYear(todaysDate.getFullYear())
    return oldDate
  }

  // the date isnt quite right
//   let date = new Date("Sat Feb 20 2021 12:30:00 GMT+0100 (Central European Standard Time)")
//   date = makeDateCorrectDate(date)
//   expect(getTimeDifference('minutes', "00:00", date)).toBe("30")
//   expect(getTimeDifference('hours', "23:00", date)).toBe("10")
//   expect(getTimeDifference('minutes', "23:00", date)).toBe("30")
  
//   date = new Date("Sat Feb 20 2021 02:00:00 GMT+0100 (Central European Standard Time)")
//   date = makeDateCorrectDate(date)
//   expect(getTimeDifference('hours', "01:00", date)).toBe("23")
//   expect(getTimeDifference('minutes', "01:00", date)).toBe("59")
//   expect(getTimeDifference('hours', "00:59", date)).toBe("22")
//   expect(getTimeDifference('minutes', "00:59", date)).toBe("59")

//   date = new Date("Sat Feb 20 2021 00:00:00 GMT+0100 (Central European Standard Time)")
//   date = makeDateCorrectDate(date)
//   expect(getTimeDifference('hours', "02:30", date)).toBe("2")
//   expect(getTimeDifference('minutes', "02:30", date)).toBe("30")
//   expect(getTimeDifference('hours', "00:00", date)).toBe("0")
//   expect(getTimeDifference('minutes', "00:00", date)).toBe("0")
//   expect(getTimeDifference('hours', "23:59", date)).toBe("23")
//   expect(getTimeDifference('minutes', "23:59", date)).toBe("59")
//   expect(getTimeDifference('hours', "22:59", date)).toBe("22")
//   expect(getTimeDifference('minutes', "22:59", date)).toBe("59")
//   expect(getTimeDifference('hours', "22:29", date)).toBe("22")
//   expect(getTimeDifference('minutes', "22:29", date)).toBe("29")
})

// it("correctly triggers a new day", () => {
//   const wrapper = shallow(<App/>);
//   // const changeEndOfDay = wrapper.instance().changeEndOfDay(timeValue, date)
//   const holder = {
//     setState: (whatever, callback) => {
//       callback()
//     },
//     changeEndOfDay: (timeValue, date) => () => (wrapper.instance().changeEndOfDay(timeValue, date)).bind(this),
//     updateClock: () => {},
//     checkTime: () => {},
//   }

//   const localStorage = {}

//   Storage.prototype.setItem = jest.fn((loc, val) => localStorage[loc] = val);
//   Storage.prototype.getItem = jest.fn((loc) => localStorage[loc]);

//   let date = new Date("Sat Feb 20 2021 00:00:00 GMT+0100 (Central European Standard Time)")
//   expect(holder.changeEndOfDay("05:00", date)()).toBe("2")





  
// })
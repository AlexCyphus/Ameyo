import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Item from "./Item.js"

export default class App extends Component {
  constructor(props) {
    super(props)

    // states
    this.state = {dailyHabits: ['Walk the dog', 'Drink 5 glasses of water']}
  }
  componentDidMount() {
    localStorage.setItem('breakfast', 'cereal'); // this is a {key: value}
  };

  addItem(){}

  checkItem(){}

  deleteItem(){}



  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <p>Daily Habits</p>
          <div className="items">
            {this.state.dailyHabits.map((item) => {
              return <Item item="item"/>
              }
            )}
          </div>
          <div className="addItem">
            <p>+ Add daily habit</p>
          </div>
        </div>
        <div className="col-4">
          <p>Weekly Goals</p>
        </div>
        <div className="col-4">
          <p>Yearly Goals</p>
        </div>
      </div>

    </div>
  );
}
}

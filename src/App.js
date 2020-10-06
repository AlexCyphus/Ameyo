import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Column from "./Column.js"

//https://github.com/plibither8/markdown-new-tab/blob/master/src/manifest.json
export default class App extends Component {
  constructor(props) {
    super(props)
    // states
    this.state = {
      dailyHabits: [
        {title: '30 minutes of German flashcards. 30 minutes of German flashcards.', completed: false, key: 1}
      ]
    }
    this.checkItem = this.checkItem.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('breakfast', 'cereal'); // this is a {key: value}
  };

  addItem(){}

  checkItem(e){
    console.log('check')
    if (e.target.tagName === 'Div') {
      const tr = e.target.parentNode.parentNode
      tr.classList.toggle('blue')
    }
  }

  deleteItem(){}

  render() {
    return (
    <div className="d-flex columns d-flex">
      <div className="inner-container justify-content-center">
        <Column items={this.state.dailyHabits} title="Daily Habits" action="+ Add daily habit" checkItem={this.checkItem} key={1}/>
      </div>
      <div className="outer-footer d-flex text-center">
        <div className="col footer-item">⚙️ Settings ⚙</div>
        <div className="col-auto footer-item">2 hour 54 minutes remaining</div>
        <div className="col footer-item">📈 Statistics 📈</div>
      </div>
    </div>
  );
}
}

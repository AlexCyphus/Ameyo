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
      minutesLeft: 60 - new Date().getMinutes(),
      hoursLeft: 24 - new Date().getHours(),
      date: new Date(),
      col1Items: [
        {title: '30 minutes of German flashcards. 30 minutes of German flashcards.', completed: true},
        {title: '30 minutes of German flashcards. 30 minutes of German flashcards.', completed: true}
      ],
      col2Items: [
        {title: '30 minutes of German flashcards. 30 minutes of German flashcards.', completed: true},
        {title: '30 minutes of German flashcards. 30 minutes of German flashcards.', completed: true}
      ],
      col1: '',
      col2: '',
    }
    this.checkItem = this.checkItem.bind(this)
    this.itemInputChange = this.itemInputChange.bind(this)
    this.submitItem = this.submitItem.bind(this)
  }

  componentDidMount() {
    const storage = window.localStorage;
    localStorage.setItem('breakfast', 'cereal'); // this is a {key: value}
    this.intervalID = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // makes the clock work
  tick() {this.setState({date: new Date()});}

  componentDidUpdate(){
  }

  itemInputChange(e){
    this.setState({[e.target.id]: e.target.value})
  }

  submitItem(e){
    e.preventDefault();
    var value = this.state.[e.target.id];
    var state = e.target.id + "Items"
    var obj = {title: value, completed: false, }
    this.setState({[state]: [...this.state.[state], obj]})
    this.setState({[e.target.id]: ''});
  }

  checkItem(){

  }

  deleteItem(){}

  render() {
    let minutesLeft = 59 - this.state.date.getMinutes();
    let hoursLeft = 23 - this.state.date.getHours();

    let plurals = ['','']
    if (hoursLeft > 1) {plurals[0] = 's'}
    if (minutesLeft > 1) {plurals[1] = 's'}

    return (
    <div className="d-flex columns d-flex">
      <div className="inner-container justify-content-center">
        <Column items={this.state.col1Items} itemInputChange={this.itemInputChange} submitItem={this.submitItem} title="Daily Habits" action="+ Add daily habit" checkItem={this.checkItem} key={1} colNum={1} inputVal={this.state.col1}/>
        <Column items={this.state.col2Items} itemInputChange={this.itemInputChange} submitItem={this.submitItem} title="To-Dos" action="+ Add a to-do" checkItem={this.checkItem} key={2} colNum={2} inputVal={this.state.col2}/>
      </div>
      <div className="outer-footer d-flex text-center">
        <div className="col footer-item">⚙️ Settings ⚙</div>
        <div className="col-auto footer-item"><p>{hoursLeft} {"hour" + plurals[0]} {minutesLeft} {"minute" + plurals[1]} remaining</p></div>
        <div className="col footer-item">📈 Statistics 📈</div>
      </div>
    </div>
  );
  }
}

import React, {Component} from 'react';
import './App.css';
import './App.scss';
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
      col1Items: [],
      col2Items: [],
      col1: '',
      col2: '',
      latestKey: 0,
    }
    this.checkItem = this.checkItem.bind(this)
    this.itemInputChange = this.itemInputChange.bind(this)
    this.submitItem = this.submitItem.bind(this)
    this.checkItem = this.checkItem.bind(this)
  }

  componentDidMount() {
    // local storage blanks
    let col1Items = []
    let col2Items = []

    // check to see if column has saved content
    if (JSON.parse(localStorage.getItem('col1Items'))){col1Items = JSON.parse(localStorage.getItem('col1Items'))}
    else {localStorage.setItem('col1Items', '[]')}
    if (JSON.parse(localStorage.getItem('col2Items'))){col2Items = JSON.parse(localStorage.getItem('col2Items'))}
    else {localStorage.setItem('col2Items', '[]')}

    // if localStorage then save to state
    this.setState({col1Items: col1Items,col2Items: col2Items})

    // update date once a second
    this.intervalID = setInterval(() => this.tick(), 1000);
  };

  // create new date
  tick() {this.setState({date: new Date()});}

  // update state when form data changed
  itemInputChange(e){this.setState({[e.target.id]: e.target.value})}

  submitItem(e){
    // dont let page refresh on submit
    e.preventDefault();

    var uniqueHash = this.state.[e.target.id].split("")[0] + new Date().getTime()
    var value = this.state.[e.target.id]; // the value of the input
    var stateKey = e.target.id + "Items" // the name of the column + "Items" => state name
    var obj = {title: value, completed: "item-incomplete", id: uniqueHash} // formatting the object

    // set state of submitted item
    this.setState(
      {
        [stateKey]: [...this.state.[stateKey], obj], // set specific column state to previous state + new object
        [e.target.id]: '', // clear the value
        id: uniqueHash
      }, () => {
        localStorage.setItem('col1Items', JSON.stringify(this.state.col1Items)) // once state saved -> save state to localstorage
        localStorage.setItem('col2Items', JSON.stringify(this.state.col2Items))
      }
    )
  }

  checkItem(e){
    e.stopPropagation()
    console.log(e.target)

  }

  deleteItem(){}

  // used for testing
  componentDidUpdate(){}

  render() {
    // set up for the countdown
    let minutesLeft = 59 - this.state.date.getMinutes();
    let hoursLeft = 23 - this.state.date.getHours();

    let plurals = ['','']
    if (hoursLeft > 1) {plurals[0] = 's'}
    if (minutesLeft > 1) {plurals[1] = 's'}

    return (
    <div className="d-flex columns d-flex">
      <div className="inner-container justify-content-center">
        <Column checkItem={this.checkItem} items={this.state.col1Items} itemInputChange={this.itemInputChange} submitItem={this.submitItem} title="Daily Habits" action="+ Add daily habit" checkItem={this.checkItem} key={1} colNum={1} inputVal={this.state.col1}/>
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

import React, {Component} from 'react';
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { DragDropContext } from 'react-beautiful-dnd';
import states from './states';


// components
import Settings from './Settings';
import Statistics from './Statistics';
import Column from "./Column.js"

// functions 
import checkTimeImport from './functions/checkTime';
import {onDragEnd, onDragStart} from './functions/dragLogic';
import {uncheckHabits, checkItem, addItem} from './functions/itemLogic'
import {queryLocalStorage} from './functions/queryLogic'

// credits //
// https://github.com/plibither8/markdown-new-tab/blob/master/src/manifest.json
// https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend

export default class App extends Component {
  state = states

  constructor(props) {
    super(props)
    this.checkTime = this.checkTime.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.itemInputChange = this.itemInputChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.checkItem = this.checkItem.bind(this)
    this.uncheckHabits = this.uncheckHabits.bind(this)
    this.settingsOpen = this.settingsOpen.bind(this)
    this.settingsClose = this.settingsClose.bind(this)
    this.statisticsOpen = this.statisticsOpen.bind(this)
    this.statisticsClose = this.statisticsClose.bind(this)
    this.queryLocalStorage = this.queryLocalStorage.bind(this)
  }

  checkTime = checkTimeImport
  onDragEnd = onDragEnd
  onDragStart = onDragStart
  uncheckHabits = uncheckHabits
  checkItem = checkItem
  addItem = addItem
  queryLocalStorage = queryLocalStorage

  settingsOpen(){this.setState({settings: true})}
  settingsClose(){this.setState({settings:false})}
  statisticsOpen(){this.setState({statistics: true})}
  statisticsClose(){this.setState({statistics:false})}
  

  queryLocalStorage(_callback = false){
    const newState = {...this.state}

    if (JSON.parse(localStorage.getItem('items'))){newState.items = JSON.parse(localStorage.getItem('items'))}
    if (JSON.parse(localStorage.getItem('columns'))){newState.columns = JSON.parse(localStorage.getItem('columns'))}
    if (JSON.parse(localStorage.getItem('columnOrder'))){newState.columnOrder = JSON.parse(localStorage.getItem('columnOrder'))}
    if (JSON.parse(localStorage.getItem('monthlyHabitsCount'))){newState.monthlyHabitsCount = JSON.parse(localStorage.getItem('monthlyHabitsCount'))}
    if (JSON.parse(localStorage.getItem('background'))){newState.background = JSON.parse(localStorage.getItem('background'))}

    this.setState(newState, () => {
      if (_callback) {_callback()};
    })
  }

  componentWillMount() {
    const newState = {...this.state}
    // check local storage 
    if (JSON.parse(localStorage.getItem('background'))){newState.background = JSON.parse(localStorage.getItem('background'))}
    else {newState.background = "url('/default.jpg')"}

    this.setState(newState, () => {document.body.style.backgroundImage = newState.background})
  }

  componentDidMount() {
    // local storage blanks
    this.setState(states)

   // if items already in local storage
    this.queryLocalStorage()

    // update clock + time logic once in a while 
    this.intervalID = setInterval(() => this.checkTime(), 30000);

    setTimeout(() => this.checkTime(), 0)
  };  

  // update state when form data changed
  itemInputChange(e){
    const newInputs = {
      ...this.state.inputs,
      [e.target.id]: e.target.value
    }
    this.setState({inputs: newInputs})
  }

  componentDidUpdate(){}

  render() {
    // set up for the countdown (this isn't working)
    let minutesLeft = 59 - this.state.date.getMinutes();
    let hoursLeft = 23 - this.state.date.getHours();

    let plurals = ['','']
    if (hoursLeft > 1) {plurals[0] = 's'}
    if (minutesLeft > 1) {plurals[1] = 's'}

    let columnVisibility = this.state.settings || this.state.statistics ? 'd-none' : 'd-flex'

    return (
      <DragDropContext onDragEnd={this.onDragEnd} onBeforeCapture={this.onDragStart}>
        <Settings settingsState={this.state.settings} settingsClose={this.settingsClose} onClick={this.settingsOpen}/>
        <Statistics 
          statisticsState={this.state.statistics}
          statisticsClose={this.statisticsClose}
          onClick={this.statisticsOpen}
          monthlyHabitsCount={this.state.monthlyHabitsCount}
        />
        <div className={"columns " + columnVisibility}>
          <div className="inner-container">
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const items = column.itemIds.map(itemId => this.state.items[itemId])
            let type;
            this.state.columns[columnId].type ? type=this.state.columns[columnId].type : type='none';
            return <Column 
                      key={column.id}
                      column={column} 
                      items={items} 
                      checkItem={this.checkItem} 
                      itemInputChange={this.itemInputChange} 
                      addItem={this.addItem} 
                      title={this.state.columns[columnId].title} 
                      inputs={this.state.inputs} 
                      deletable={this.state.deletable} 
                      type={type} 
                      description={this.state.columns[columnId].description}
                      emoji={this.state.columns[columnId].emoji}
                      hover={this.state.hover}
                    />
          })}
          </div>
          <div className="outer-footer d-flex text-center">
            <div className="col footer-item clickable" onClick={this.settingsOpen}><p>⚙️ Settings</p></div>
            <div className="col-auto m-auto" id="countdown"><p>{hoursLeft} {"hour" + plurals[0]} {minutesLeft} {"minute" + plurals[1]} remaining</p></div>
            <div className="col footer-item clickable" onClick={this.statisticsOpen}><p>📈 Statistics</p></div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
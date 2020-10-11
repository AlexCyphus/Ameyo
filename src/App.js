import React, {Component} from 'react';
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Column from "./Column.js"
import { DragDropContext } from 'react-beautiful-dnd';
import states from './states';

// credits //
// https://github.com/plibither8/markdown-new-tab/blob/master/src/manifest.json
// https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend

export default class App extends Component {
  state = states

  constructor(props) {
    super(props)
    this.checkItem = this.checkItem.bind(this)
    this.itemInputChange = this.itemInputChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.checkItem = this.checkItem.bind(this)
  }

  componentDidMount() {

    // load initial data (not for production)
    // localStorage.setItem('items', JSON.stringify(this.state.items))
    // localStorage.setItem('columns', JSON.stringify(this.state.columns))
    // localStorage.setItem('columnOrder', JSON.stringify(this.state.columnOrder))

    // local storage blanks
    let items;
    let columns;
    let columnOrder;

    // is there content in local storage?
    if (JSON.parse(localStorage.getItem('items'))){
      items = JSON.parse(localStorage.getItem('items'))
      this.setState({items: items})
    }
    if (JSON.parse(localStorage.getItem('columns'))){
      columns = JSON.parse(localStorage.getItem('columns'))
      this.setState({columns: columns})
    }
    if (JSON.parse(localStorage.getItem('columnOrder'))){
      columnOrder = JSON.parse(localStorage.getItem('columnOrder'))
      this.setState({columnOrder: columnOrder})
    }

    // update date once a second
    //this.intervalID = setInterval(() => this.tick(), 1000);
  };

  // create new date
  tick() {this.setState({date: new Date()});}

  // update state when form data changed
  itemInputChange(e){
    const newInputs = {
      ...this.state.inputs,
      [e.target.id]: e.target.value
    }
    this.setState({inputs: newInputs})
  }

  addItem(e){
    // dont let page refresh on submit
    e.preventDefault();
    var columnId = e.target.id;
    var value = this.state.inputs[columnId]; // the value of the input

    // find the first unused itemId
    let itemId;
    let itemIdNum;
    let itemsLen = Object.keys(this.state.items).length + 1
    for (var x = 1; x < itemsLen + 1; x++){
      let searchVal = "item-" + x;
      if (!this.state.items[searchVal]){
        itemId = "item-" + x;
        itemIdNum = x - 1;
      }
    }

    let newObj = this.state.columns[columnId].itemIds

    newObj.push(itemId)

    // format input for items
    const newState = {
      ...this.state,
      items: {
        ...this.state.items,
        [itemId]: {id: itemId, content: value, checked: "unchecked"}
      },
      columns: {
        ...this.state.columns,
        [columnId]: {
          ...this.state.columns[columnId],
          itemIds: newObj
        }
      },
      inputs: {
        ...this.state.inputs,
        [columnId]: ''
      }
    }

    // update state
    this.setState(newState, () => {
      localStorage.setItem('columns', JSON.stringify(this.state.columns))
      localStorage.setItem('items', JSON.stringify(this.state.items))
    })

  }

  checkItem(e){
    let newChecked = '';
    if (this.state.items[e.target.id].checked == "unchecked"){newChecked = "checked"}
    else {newChecked = "unchecked"}
    const newState = {
      ...this.state,
      items: {
        ...this.state.items,
        [e.target.id]: {
          ...this.state.items[e.target.id],
          checked: newChecked
        }
      }
    }
    this.setState(newState, () => {localStorage.setItem('items', JSON.stringify(this.state.items))})
  }

  // used for testing
  componentDidUpdate(){
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const start = this.state.columns[source.droppableId];
    // was it dropped in a column?
    this.setState({deletable: false},
      () => {
        if (!destination){return}

        if (destination.droppableId.split('-')[0] == 'deletable'){
          // remove item from items array
          let newItems = this.state.items
          delete newItems[draggableId]

          // remove item from column -> itemIds array
          let newColumn = this.state.columns[source.droppableId]
          newColumn.itemIds.splice(source.index, 1)

          // update state
          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [source.droppableId]: newColumn
            },
            items: newItems
          }

          this.setState(newState, () => {
            localStorage.setItem('columns', JSON.stringify(this.state.columns))
            localStorage.setItem('items', JSON.stringify(this.state.items))
          })
          return
        }

        // did anything move?
        if (destination.droppableId === source.droppableId && destination.index === source.index) {return}

        const finish = this.state.columns[destination.droppableId]

        if (start === finish) {
          const column = start
          const newTaskIds = Array.from(column.itemIds)
          newTaskIds.splice(source.index, 1); // remove the one that was moved
          newTaskIds.splice(destination.index, 0, draggableId) // remove nothing add a new one

          const newColumn = {
            ...column,
            itemIds: newTaskIds
          };

          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [newColumn.id]: newColumn,
            }
          }

          this.setState(newState, () => {
            localStorage.setItem('columns', JSON.stringify(this.state.columns))
          })
          return
        }

        const startTaskIds = Array.from(start.itemIds);
        startTaskIds.splice(source.index, 1); // remove where it came from
        const newStart = {
          ...start,
          itemIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.itemIds);
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
          ...finish,
          itemIds: finishTaskIds
        }

        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
          }
        }

        this.setState(newState, () => {localStorage.setItem('columns', JSON.stringify(this.state.columns))})
        return
      }
    )
  }

  onDragStart = () => {
    this.setState({deletable: true})
  }

  render() {
    // set up for the countdown
    let minutesLeft = 59 - this.state.date.getMinutes();
    let hoursLeft = 23 - this.state.date.getHours();

    let plurals = ['','']
    if (hoursLeft > 1) {plurals[0] = 's'}
    if (minutesLeft > 1) {plurals[1] = 's'}

    return (
      <DragDropContext onDragEnd={this.onDragEnd} onBeforeCapture={this.onDragStart}>
        <div className="d-flex columns d-flex">
          <div className="inner-container justify-content-center">
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const items = column.itemIds.map(itemId => this.state.items[itemId])
            return <Column key={column.id} column={column} items={items} checkItem={this.checkItem} itemInputChange={this.itemInputChange} addItem={this.addItem} title={this.state.columns[columnId].title} checkItem={this.checkItem} inputs={this.state.inputs} deletable={this.state.deletable}/>
          })}
          </div>
          <div className="outer-footer d-flex text-center">
            <div className="col footer-item">⚙️ Settings ⚙️</div>
            <div className="col-auto footer-item"><p>{hoursLeft} {"hour" + plurals[0]} {minutesLeft} {"minute" + plurals[1]} remaining</p></div>
            <div className="col footer-item">📈 Statistics 📈</div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
  //   <Column items={this.state.col2Items} itemInputChange={this.itemInputChange} addItem={this.addItem} title="To-Dos" action="+ Add a to-do" checkItem={this.checkItem} key={2} colNum={2} inputVal={this.state.col2}/>
  // </div>

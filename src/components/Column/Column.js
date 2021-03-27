import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import '../../App.css';
import './Column.scss'
import Item from '../../Item'

export default class Column extends React.Component {
  constructor() {
    super()
    this.keyDownHandler = this.keyDownHandler.bind(this)
  }

  keyDownHandler(e) {
    let value = this.props.inputs[this.props.column.id]
    if (e.keyCode == 13) {
      e.preventDefault()
      if (value != "") {
        this.props.addItem(e) 
      }
    }
  }

  render() {
    let hover = this.props.hover ? ' min-height ' : ''
    let display = this.props.items.length > 0 ? '' : this.props.hover ? '' : ' d-none ';
    let margintop = this.props.items.length > 0 ? '' : 'mt-0'
    
    return ([
      <div key="1" className="col-3 p-1">
        <div className="outer-column">
          <div className="d-flex">
            <div className="col-auto pl-2"><p className="column-header text-left">{this.props.column.title}</p></div>
          </div>
          <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div className={"items" + hover + display} ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => 
                <Item key={item.id} item={item} index={index} checkItem={this.props.checkItem} checked={item.checked} type={this.props.type} colors={this.props.colors} claimColor={this.props.claimColor} showContextMenu={this.props.showContextMenu}/>
              )}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
          {this.props.deletable 
            ?
            <div className="add-item d-flex delete-item">
              <div className="w-100 h-100 text-center deletion-box" placeholder="test">
                <Droppable droppableId={'deletable-'+this.props.column.id} className="h-100">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <p>delete item</p>
                    {provided.placeholder}
                  </div>
                )}
                </Droppable>
              </div>        
            </div>
            :
            <form onKeyDown={this.keyDownHandler} id={this.props.column.id} autoComplete="off">
              <div className={"add-item d-flex" + margintop}>
                <textarea className="w-100 h-100 text-center" type="textArea" placeholder="+ Add item" onChange={this.props.itemInputChange} id={this.props.column.id + "-add"} value={this.props.inputs[this.props.column.id]}/>
              </div>
            </form>
          }
        </div>
      </div>
    ])
  }
}

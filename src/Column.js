
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './App.css';
import Item from './Item'

export default class Column extends React.Component {
  render() {
    let hover = this.props.hover ? ' min-height ' : ''
    let display = this.props.items.length > 0 ? '' : this.props.hover ? '' : ' d-none ';
    let margintop = this.props.items.length > 0 ? '' : 'mt-0'
    return ([
      <div className="col-3 p-1">
        <div className="outer-column">
          <div className="d-flex">
            <div className="col-auto pl-2"><p className="column-header text-left">{this.props.title}</p></div>
            <div className="col pr-2"><p className="column-header text-right emoji">{this.props.emoji}</p></div>
          </div>
          <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div className={"items" + hover + display} ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => 
                <Item key={item.id} item={item} index={index} checkItem={this.props.checkItem} checked={item.checked} type={this.props.type}/>
              )}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
          {this.props.deletable ?
            <Droppable droppableId={'deletable-'+this.props.column.id} className="h-100">
            {(provided) => (
                <div className="add-item d-flex delete-item" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="w-100 h-100 text-center deletion-box" placeholder="test">
                    <p>delete item</p>
                    {provided.placeholder}
                  </div>
                </div>
            )}
            </Droppable>
          :
          <form onSubmit={this.props.addItem} id={this.props.column.id} autoComplete="off">
            <div className={"add-item d-flex" + margintop}>
              <input className="w-100 h-100 text-center" type="text" placeholder="+ Add item" onChange={this.props.itemInputChange} id={this.props.column.id} value={this.props.inputs[this.props.column.id]}/>
            </div>
          </form>
          }

        </div>
      </div>
    ])
  }
}

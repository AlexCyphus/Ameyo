
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './App.css';
import Item from './Item'

export default class Column extends React.Component {
  render() {
    return ([
      <div className="col-3 p-1">
      <p className="column-header text-center">{this.props.title}</p>
        <div className="outer-column">
          <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div className="items" ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => <Item key={item.id} item={item} index={index}/>)}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
          <form className="w-100" onSubmit={this.props.addItem} id={this.props.column.id}>
            <div className="add-item d-flex">
              <input className="w-100 text-center" type="text" placeholder={this.props.action} onChange={this.props.itemInputChange} id={this.props.column.id} value={this.props.inputs[this.props.column.id]}/>
            </div>
          </form>
        </div>
      </div>
    ])
  }
}

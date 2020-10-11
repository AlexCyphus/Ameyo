
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
              {this.props.items.map((item, index) => <Item key={item.id} item={item} index={index} checkItem={this.props.checkItem} checked={item.checked}/>)}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
          {this.props.deletable ?
            <Droppable droppableId={'deletable-'+this.props.column.id} className="h-100">
            {(provided) => (
                <div className="add-item d-flex" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="w-100 h-100 text-center deletion-box" placeholder="test">
                    <p>delete item</p>
                    {provided.placeholder}
                  </div>
                </div>
            )}
            </Droppable>
          :
          <form onSubmit={this.props.addItem} id={this.props.column.id}>
            <div className="add-item d-flex">
              <input className="w-100 h-100 text-center" type="text" placeholder="+ Add item" onChange={this.props.itemInputChange} id={this.props.column.id} value={this.props.inputs[this.props.column.id]}/>
            </div>
          </form>
          }

        </div>
      </div>
    ])
  }
}

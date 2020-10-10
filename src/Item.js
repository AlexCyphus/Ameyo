import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

export default class Item extends React.Component {
  render(){
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div className="item-row d-flex" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="item-checkbox d-flex">
            <div className="checkbox m-auto">
            </div>
          </div>
          <div className="item-name"><p className="item-p">{this.props.item.content}</p></div>
          </div>
        )}
      </Draggable>
    )
  }
}


//

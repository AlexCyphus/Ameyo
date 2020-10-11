import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

export default class Item extends React.Component {
  render(){
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index} id={this.props.item.id}>
        {(provided, snapshot) => (
          <div className={"item-row d-flex " + this.props.checked} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={this.props.checkItem} id={this.props.item.id}>
          <div className="item-checkbox d-flex" id={this.props.item.id}>
            <div className="checkbox m-auto" id={this.props.item.id}>
              {this.props.checked === 'checked' ? <p>x</p> : null}
            </div>
          </div>
          <div className="item-name" id={this.props.item.id}><p className="item-p" id={this.props.item.id}>{this.props.item.content}</p></div>
          </div>
        )}
      </Draggable>
    )
  }
}


//

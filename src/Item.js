import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

export default class Item extends React.Component {
  render(){
    const itemId = this.props.item.id;
    const checkedClass = this.props.checked;
    return (
      <Draggable draggableId={itemId} index={this.props.index} id={itemId}>
        {(provided, snapshot) => (
          <div className={"item-row d-flex " + checkedClass} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={this.props.checkItem} id={itemId}>
          <div className="item-checkbox d-flex" id={itemId}>
            <div className="checkbox m-auto" id={itemId}>
              {checkedClass === 'checked' ? <p id={itemId}>x</p> : null}
            </div>
          </div>
          <div className="item-name" id={itemId}><p className="item-p" id={itemId}>{this.props.item.content}</p></div>
          </div>
        )}
      </Draggable>
    )
  }
}


//

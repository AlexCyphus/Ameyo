import { amber } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';
import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label.tsx'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const itemId = this.props.item.id;
    const checkedClass = this.props.checked;
    var label = false
    var color;

    // check if item should have label 
    if (this.props.item.content.split(" ")[0].includes(":")){label = this.props.item.content.split(":")[0]}

    if (this.props.colors && Object.values(this.props.colors)){
      if (!Object.values(this.props.colors).includes(label)){
        for (var x = 0; x < Object.keys(this.props.colors).length; x++){
          let key = Object.keys(this.props.colors)[x]
          let val = this.props.colors[key]
          if (val == false){
            color = key
            this.props.claimColor(key, label)
            break;
          }
        }
      }
      else {
        color = Object.keys(this.props.colors).find(key => this.props.colors[key] === label)
      }
    }

    return (
      <Draggable draggableId={itemId} index={this.props.index} id={itemId}>
        {(provided, snapshot) => (
          <div className={"item-row d-flex " + checkedClass} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={this.props.checkItem} id={itemId}>
            {this.props.type === 'none' ? 
              <div className="item-checkbox d-flex" id={itemId}>
              <div className="checkbox m-auto" id={itemId}>
                {checkedClass === 'checked' ? <p id={itemId}>x</p> : null}
              </div>
            </div>
            : null}
            <div className={"item-name"} id={itemId}>
              <p className={"item-p " + (this.props.type !== 'none' ? 'px-3' : '')} id={itemId}>{this.props.item.content}</p>
            </div>
            <Label display={label} color={String(color)}/>
          </div>
        )}
      </Draggable>
    )
  }
}
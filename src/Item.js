import { amber } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';
import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label.tsx'

const Item = (props) => {
    const itemId = props.item.id;
    const checkedClass = props.checked;
    var label = false
    var color;

    // check if item should have label 
    if (props.item.content.split(" ")[0].includes(":")){label = props.item.content.split(":")[0]}

    // set the color... 
    if (!Object.values(props.colors).includes(label)){
      for (var x = 0; x < Object.keys(props.colors).length; x++){
        console.log('start loop')
        let key = Object.keys(props.colors)[x]
        let val = props.colors[key]
        if (val == false){
          color = key
          props.claimColor(key, label)
          break;
        }
      }
    }

    return (
      <Draggable draggableId={itemId} index={props.index} id={itemId}>
        {(provided, snapshot) => (
          <div className={"item-row d-flex " + checkedClass} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={props.checkItem} id={itemId}>
            {props.type === 'none' ? 
              <div className="item-checkbox d-flex" id={itemId}>
              <div className="checkbox m-auto" id={itemId}>
                {checkedClass === 'checked' ? <p id={itemId}>x</p> : null}
              </div>
            </div>
            : null}
            <div className={"item-name"} id={itemId}>
              <p className={"item-p " + (props.type !== 'none' ? 'px-3' : '')} id={itemId}>{props.item.content}</p>
            </div>
            <Label display={label} color={String(color)}/>
          </div>
        )}
      </Draggable>
    )
  }

export default Item

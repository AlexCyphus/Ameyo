import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label.tsx'

export default class Item extends React.Component {
  constructor(){
    super()
    this.state = {
      label: false,
      color: 'none'
    }
  }

  UNSAFE_componentWillMount(){
    if (this.props.item.content.split(" ")[0].includes(":")){this.setState({label:this.props.item.content.split(":")[0]})}
    if (this.props.colors && Object.values(this.props.colors)){
      if (!Object.values(this.props.colors).includes(this.state.label)){
        for (var x = 0; x < Object.keys(this.props.colors).length; x++){
          let key = Object.keys(this.props.colors)[x]
          let val = this.props.colors[key]
          if (val === false){
            this.setState({color: key})
            // this is where the error comes from
            this.props.claimColor(key, this.state.label)
            break;
          }
        }
      }
      else {this.setState({color: Object.keys(this.props.colors).find(key => this.props.colors[key] === this.state.label)})}
    }
  }
  
  render() {
    const itemId = this.props.item.id;
    const checkedClass = this.props.checked;

    /* UNRESOLVED ISSUE */
    /* 
    We use the "colors" state to determine what colors have already been taken by other labels
    We claim these colors on rendering which causes the state to change, the component to re-render, and _theoretically_ the function to be called again
    Need to move the this.props.claimColor outside of the render method
    */

    // check if item should have label 

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
            <Label display={this.state.label} color={String(this.state.color)}/>
          </div>
        )}
      </Draggable>
    )
  }
}
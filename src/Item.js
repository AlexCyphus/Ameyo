import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label.tsx'

export default class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      label: this.props.item.content.split(" ")[0].includes(":") ? this.props.item.content.split(":")[0] : false,
      color: 'none'
    }
  }

  componentDidMount(){
    // if saved labels and colors already exist
    if (this.props.colors && Object.values(this.props.colors)){

      // if the current label doesn't exist yet
      if (!Object.values(this.props.colors).includes(this.state.label)){
        const emptyColor = Object.keys(this.props.colors).find((key) => this.props.colors[key] === false)
        this.setState({color: emptyColor})
        this.props.claimColor(emptyColor, this.state.label)
      }

      // if the current label already exists
      else {this.setState({color: Object.keys(this.props.colors).find(key => this.props.colors[key] === this.state.label)})}
    }
  }
  
  render() {
    const itemId = this.props.item.id;
    const checkedClass = this.props.checked;

    return (
      <>
        <Draggable draggableId={itemId} index={this.props.index} id={itemId}>
          {(provided, snapshot) => (
            <div className={"item-row d-flex " + checkedClass} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={this.props.checkItem} onContextMenu={this.props.showContextMenu} id={itemId}>
              {this.props.type === 'none' && 
                <div className="item-checkbox d-flex" id={itemId}>
                <div className="checkbox m-auto" id={itemId}>
                  {checkedClass === 'checked' && <p id={itemId}>x</p>}
                </div>
              </div>
              }
              <div className={"item-name"} id={itemId}>
                <p className={"item-p " + (this.props.type !== 'none' ? 'px-3' : '')} id={itemId}>{this.props.item.content}</p>
              </div>
              <Label display={this.state.label} color={String(this.state.color)}/>
            </div>
          )}
        </Draggable>
      </>
    )
  }
}
import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label.tsx'

export default class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      label: this.props.item.content.split(" ")[0].includes(":") ? this.props.item.content.split(":")[0] : false,
      color: null
    }
  }

  generateRandomColor() {
    let letters = '0123456789ABCDEF'; 
    let color = '#';
    for (let i = 0; i < 6; i++) { 
      color += letters[Math.floor(Math.random() * 16)]; 
    }
    return color; 
  }

  checkAndUpdateColor(){
    const labelColorsObject = this.props.colors
    const labels = Object.keys(labelColorsObject)
    const activeLabel = this.state.label

    // if saved labels and colors already exist
    if (labelColorsObject){

      // if the current label doesn't exist yet
      if (!labels.includes(this.state.label)){
        const newColor = this.generateRandomColor()
        this.setState({
          color: newColor
        })
        this.props.claimColor(activeLabel, newColor)
      }

      // if the current label already exists
      else {
        this.setState({
          color: labelColorsObject[activeLabel]
        })
      }
    }
  }

  componentDidMount(){
    this.checkAndUpdateColor()
  }

  componentDidUpdate(){
    const newLabel = this.props.item.content.split(" ")[0].includes(":") ? this.props.item.content.split(":")[0] : false
    if (this.state.label != newLabel){
      this.setState({
        label: newLabel
      }, this.checkAndUpdateColor
      )
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
              <Label display={this.state.label} color={this.state.color}/>
            </div>
          )}
        </Draggable>
      </>
    )
  }
}
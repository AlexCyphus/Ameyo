import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label'

interface IndividualItem {
  content: string,
  id: string
}

interface ItemProps {
  item: IndividualItem,
  colors: ColorObject,
  claimColor: Function,
  checked: string,
  type: string
  index: number
  checkItem(): void,
  showContextMenu(): void
}

interface ColorObject {
  [key: string]: string 
}

interface ItemState {
  label: string | null,
  color: string
}

export default class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps){
    super(props)
    this.state = {
      label: this.props.item.content.split(" ")[0].includes(":") ? this.props.item.content.split(":")[0] : null,
      color: ''
    }
  }

  componentDidMount(){
    this.checkAndUpdateColor()
  }

  componentDidUpdate(){
    const activeLabel = this.state.label
    const newLabel = this.props.item.content.indexOf(": ") ? this.props.item.content.substr(0, this.props.item.content.indexOf(": ")) : null

    // if the label is different to the active label then update the active label
    if ((activeLabel != newLabel && newLabel != null)){
      this.setState({
        label: newLabel
      }, this.checkAndUpdateColor
      )
    }
  }

  checkAndUpdateColor(){
    const generateRandomColor = () => '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
    const labelColorsObject = this.props.colors
    const labels = Object.keys(labelColorsObject)
    const activeLabel = this.state.label

    if (activeLabel === null){return}

    // if the current label doesn't exist yet
    else if (!labels.includes(activeLabel)){
      const newColor = generateRandomColor()
      this.setState({
        color: newColor
      })
      this.props.claimColor(activeLabel, newColor)
    }

    // if the current label already exists
    else {
      this.setState({color: labelColorsObject[activeLabel]})
    }
  }
  
  render() {
    const itemId = this.props.item.id;
    const checkedClass = this.props.checked;

    return (
      <>
        <Draggable draggableId={itemId} index={this.props.index}>
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
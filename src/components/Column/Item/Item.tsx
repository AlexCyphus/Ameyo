import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import Label from './Label/Label'

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
  monthlyHabitsCount: monthlyHabitsCountI
  columnTitle: string
}

interface ColorObject {
  [key: string]: string 
}

interface ItemState {
  label: string | null
  color: string
  streak: number | null | string
}

interface monthlyHabitsCountI {
  [key: string]: number[]
}

export default class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps){
    super(props)
    this.state = {
      label: this.props.item.content.split(" ")[0].includes(":") ? this.props.item.content.split(":")[0] : null,
      color: '',
      streak: null
    }
  }

  componentDidMount(){
    // check number of days without doing a habit only goes to 30+ 
    // if we are in the habits column 
      if (this.props.columnTitle === 'Habits') {
        const monthlyHabitsCount = this.props.monthlyHabitsCount
        // if we have a history of completing this habit 
        if (this.props.monthlyHabitsCount[this.props.item.content]) {
          const habitHistory = this.props.monthlyHabitsCount[this.props.item.content]

          if (habitHistory[0] == 0){
            this.setState({
              streak: habitHistory.indexOf(1) != -1 ? -(habitHistory.indexOf(1)) : -(habitHistory.length)
            })
          }

          else if (habitHistory[0] == 1) {
            this.setState({
              streak: habitHistory.indexOf(0) != -1 ? habitHistory.indexOf(0) : habitHistory.length
            })   
          }
        } else {
          this.setState({
            streak: 0 
          })
        }       
      }

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
    const streakBackground = 
      this.state.streak !== null 
        ? (this.state.streak > -7 && this.state.streak < 0) 
          ? `streak-negative${this.state.streak}`
          : this.state.streak >= 0 
            ? ''
            : `streak-negative-7`
        : ''

    return (
      <>
        <Draggable draggableId={itemId} index={this.props.index}>
          {(provided, snapshot) => (
            <div className={"item-row d-flex " + checkedClass + ' ' + streakBackground} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={this.props.checkItem} onContextMenu={this.props.showContextMenu} id={itemId}>
              {(typeof this.state.streak === 'string' || typeof this.state.streak === 'number')
                && <div className="streak-holder">
                    <p className="streak-number">{this.state.streak}</p>
                  </div>
              }
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
export function onDragEnd(result, defaultAction=false, itemId) {
  
  let destination = {}
  let source = {}
  let draggableId = {}

  const deleteTicket = (newDraggableId) => {

    draggableId = newDraggableId ? newDraggableId : draggableId
    
    let newItems = JSON.parse(JSON.stringify(this.state.items))

    // remove item from column -> itemIds array
    let newColumn = this.state.columns[source.droppableId]
    newColumn.itemIds.splice(source.index, 1)

    const newMonthlyHabits = {...this.state.monthlyHabitsCount}
     // check if habit
     if(source.droppableId === "habits"){
      // remove from monthlyhabitcount
      delete newMonthlyHabits[this.state.items[draggableId].content]
    }

    var newColors = JSON.parse(JSON.stringify({...this.state.colors}))
    
    // check if it was labelled 
    
    // remove item from items array
    delete newItems[draggableId]
    
    if (this.state.items[draggableId].content.split(" ")[0].includes(":")){
      const label = this.state.items[draggableId].content.split(":")[0]
      
      var itemIds = Object.keys(newItems)

      var moreItemsWithLabel = false
      itemIds.forEach(item => newItems[item].content.split(" ")[0].includes(label + ":") ? moreItemsWithLabel = true : null)

      // if there are more items with the same label 
      if (!moreItemsWithLabel){
        // "unclaim" the color for that label
        const color = Object.keys(this.state.colors).find(key => this.state.colors[key] === label)
        newColors[color] = false
      } 
    }

    // update state
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [source.droppableId]: newColumn
      },
      items: newItems,
      monthlyHabitsCount: newMonthlyHabits,
      colors: newColors
    }

    const setStateAndStorage = () => {
      this.setState(newState, () => {
        localStorage.setItem('columns', JSON.stringify(this.state.columns))
        localStorage.setItem('items', JSON.stringify(this.state.items))
        localStorage.setItem('monthlyHabitsCount', JSON.stringify(this.state.monthlyHabitsCount))
        localStorage.setItem('colors', JSON.stringify(this.state.colors))
      }) 
    }

    this.queryLocalStorage(setStateAndStorage)
    return
  }

  if (defaultAction == "delete") {
    // find the column its in
    let column = ''
    let index = 0

    for (var col in this.state.columns) {
        if (this.state.columns[col].itemIds.includes(itemId)) {
            column = col
            index = this.state.columns[col].itemIds.indexOf(itemId)
            break
        }
    }

    source.droppableId = column
    source.index = index

    return deleteTicket(itemId)
  }

  if (result){
    ({ destination, source, draggableId } = result);  
  }

  const start = this.state.columns[source.droppableId];
  const finish = this.state.columns[destination.droppableId]

  this.setState({
    deletable: false,
    hover: false
  },
    () => {      
      if (!destination){return}

      // if dropped in deletion column 
      if (destination.droppableId.split('-')[0] === 'deletable'){
        return deleteTicket()
      }

      // no movement between columns or within columns
      if (destination.droppableId === source.droppableId && destination.index === source.index) {return} 

      // movement within the same column
      if (start === finish) {
        const column = start
        const newTaskIds = Array.from(column.itemIds)
        newTaskIds.splice(source.index, 1); // remove the one that was moved
        newTaskIds.splice(destination.index, 0, draggableId) // remove nothing add a new one

        const newColumn = {
          ...column,
          itemIds: newTaskIds
        };

        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn,
          }
        }

        this.setState(newState, () => {
          localStorage.setItem('columns', JSON.stringify(this.state.columns))
        })
        return
      }

      // else if there was movement 
      const startTaskIds = Array.from(start.itemIds);
      
      // remove where it came from
      startTaskIds.splice(source.index, 1); 
      
      // create new state
      const newStart = {...start, itemIds: startTaskIds}
      const finishTaskIds = Array.from(finish.itemIds);
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        itemIds: finishTaskIds
      }

      // check if it was a habit
      const newMonthlyHabits = {...this.state.monthlyHabitsCount}
         if(source.droppableId === "habits"){
          // remove from monthlyhabitcount
          delete newMonthlyHabits[this.state.items[draggableId].content]
        }


      // save new state
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        },
        monthlyHabitsCount: newMonthlyHabits
      }

      this.setState(newState, () => {
        localStorage.setItem('columns', JSON.stringify(this.state.columns))
        localStorage.setItem('monthlyHabitsCount', JSON.stringify(this.state.monthlyHabitsCount))
      })
      return
    }
  )
}

export function onDragStart() {
  this.setState({
    deletable: true,
    hover: true
  })
}

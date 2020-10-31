export function onDragEnd(result) {
  const { destination, source, draggableId } = result;
  const start = this.state.columns[source.droppableId];
  // was it dropped in a column?
  this.setState({
    deletable: false,
    hover: false
  },
    () => {
      if (!destination){return}

      if (destination.droppableId.split('-')[0] === 'deletable'){
        let newItems = this.state.items
        

        // remove item from column -> itemIds array
        let newColumn = this.state.columns[source.droppableId]
        newColumn.itemIds.splice(source.index, 1)

        const newMonthlyHabits = {...this.state.monthlyHabitsCount}
         // check if habit
         if(source.droppableId == "habits"){
          // remove from monthlyhabitcount
          delete newMonthlyHabits[this.state.items[draggableId].content]
        }

        // remove item from items array
        delete newItems[draggableId]

        // update state
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [source.droppableId]: newColumn
          },
          items: newItems,
          monthlyHabitsCount: newMonthlyHabits
        }

        const setStateAndStorage = () => {
          this.setState(newState, () => {
            localStorage.setItem('columns', JSON.stringify(this.state.columns))
            localStorage.setItem('items', JSON.stringify(this.state.items))
            localStorage.setItem('monthlyHabitsCount', JSON.stringify(this.state.monthlyHabitsCount))
          }) 
        }

        this.queryLocalStorage(setStateAndStorage)
        return
      }

      // no movement between columns or within columns
      if (destination.droppableId === source.droppableId && destination.index === source.index) {return}

      const finish = this.state.columns[destination.droppableId]

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
         if(source.droppableId == "habits"){
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

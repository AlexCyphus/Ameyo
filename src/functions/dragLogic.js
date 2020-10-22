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

      if (destination.droppableId.split('-')[0] == 'deletable'){
        // remove item from items array
        let newItems = this.state.items
        delete newItems[draggableId]

        // remove item from column -> itemIds array
        let newColumn = this.state.columns[source.droppableId]
        newColumn.itemIds.splice(source.index, 1)

        // update state
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [source.droppableId]: newColumn
          },
          items: newItems
        }

        const setStateAndStorage = () => {
          this.setState(newState, () => {
            localStorage.setItem('columns', JSON.stringify(this.state.columns))
            localStorage.setItem('items', JSON.stringify(this.state.items))
          }) 
        }

        this.queryLocalStorage(setStateAndStorage)
        return
      }

      // did anything move?
      if (destination.droppableId === source.droppableId && destination.index === source.index) {return}

      const finish = this.state.columns[destination.droppableId]

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

      const startTaskIds = Array.from(start.itemIds);
      startTaskIds.splice(source.index, 1); // remove where it came from
      const newStart = {
        ...start,
        itemIds: startTaskIds
      }

      const finishTaskIds = Array.from(finish.itemIds);
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        itemIds: finishTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      this.setState(newState, () => {localStorage.setItem('columns', JSON.stringify(this.state.columns))})
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

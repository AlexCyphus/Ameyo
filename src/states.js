const states = {
  items: {
    // 'item-1': {id: 'item-1', content: '30 minutes of French', checked: 'unchecked', date},
    // 'item-2': {id: 'item-2', content: 'Meditate', checked: 'checked'},
    // 'item-3': {id: 'item-3', content: 'Exercise', checked: 'unchecked'},
    // 'item-4': {id: 'item-4', content: 'Program', checked: 'checked'},
    // 'item-5': {id: 'item-5', content: 'Finish the 4 hour work week', checked: 'unchecked'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Habits',
      itemIds: []//'item-1', 'item-2', 'item-3', 'item-4'] // maintains order
    },
    'column-2': {
      id: 'column-2',
      title: 'Today',
      itemIds: []//'item-5'] // maintains order
    },
    'column-3': {
      id: 'column-3',
      title: 'Yesterday',
      itemIds: [] // maintains order
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  inputs: {
    'column-1': '',
    'column-2': '',
    'column-3': ''
  },
  minutesLeft: 60 - new Date().getMinutes(),
  hoursLeft: 24 - new Date().getHours(),
  date: new Date(),
  deletable: false
}

export default states

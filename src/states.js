const states = {
  items: {
    'item-1': {id: 'item-1', content: 'Take out the garbage'},
    'item-2': {id: 'item-2', content: 'Watch tv'},
    'item-3': {id: 'item-3', content: 'Do lots of drugs'},
    'item-4': {id: 'item-4', content: 'Slepe'},
    'item-5': {id: 'item-5', content: 'Code'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4'] // maintains order
    },
    'column-2': {
      id: 'column-2',
      title: 'Blocked',
      itemIds: [] // maintains order
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
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
}

export default states

const states = {
  items: {
    // 'item-1': {id: 'item-1', content: '30 minutes of French', checked: 'unchecked', date},
  },
  columns: {
    'habits': {
      id: 'habits',
      title: 'Habits',
      itemIds: [],
      description: 'Daily tasks' //'item-1', 'item-2', 'item-3', 'item-4'] // maintains order
    },
    'today': {
      id: 'today',
      title: 'Today',
      itemIds: [],
      description: 'Tasks to do today'
    },
    'yesterday': {
      id: 'yesterday',
      title: 'Yesterday',
      itemIds: [],
      description: 'Tasks completed yesterday'
    },
    'backlog': {
      id: 'backlog',
      title: 'Backlog',
      itemIds: [],
      description: "Future tasks", 
      type: 'backlog'
    }
  },
  history: [], // [["item-10","2020-10-13T07:30:50.711Z"],["item-9","2020-10-13T07:31:05.711Z"],["item-12","2020-10-13T07:31:05.711Z"],["item-13","2020-10-13T07:31:05.711Z"]],
  columnOrder: ['habits', 'today', 'backlog', 'yesterday'],
  inputs: {
    'habits': '',
    'today': '',
    'yesterday': '',
    'backlog': ''
  },
  minutesLeft: 60 - new Date().getMinutes(),
  hoursLeft: 24 - new Date().getHours(),
  date: new Date(),
  deletable: false,
  settings: false,
  statistics: false
}

export default states

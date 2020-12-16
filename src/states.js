const states = {
  items: {
    // 'item-1': {id: 'item-1', content: '30 minutes of French', checked: 'unchecked', date},
  },
  columns: {
    'habits': {
      id: 'habits',
      title: 'Habits',
      emoji: "⏰",
      itemIds: [],
      description: 'Daily tasks' //'item-1', 'item-2', 'item-3', 'item-4'] // maintains order
    },
    'today': {
      id: 'today',
      title: 'Today',
      emoji: "🗓",
      itemIds: [],
      description: 'Tasks to do today'
    },
    'yesterday': {
      id: 'yesterday',
      title: 'Yesterday',
      emoji: "✅",
      itemIds: [],
      description: 'Tasks completed yesterday'
    },
    'backlog': {
      id: 'backlog',
      title: 'Backlog',
      emoji: "📚",
      itemIds: [],
      description: "Future tasks", 
      type: 'backlog'
    }
  },
  history: [], // [["item-10","2020-10-13T07:30:50.711Z"],["item-9","2020-10-13T07:31:05.711Z"],["item-12","2020-10-13T07:31:05.711Z"],["item-13","2020-10-13T07:31:05.711Z"]],
  monthlyHabitsCount: {},
  monthlyHabitsSum: {},
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
  statistics: false,
  hover: false,
  backgroundImageIndex: 0,
  information: false,
  informationPage: 0,
  colors: { 
    '#18C186': false,
    '#fc8427': false,
    '#ED0F47': false,
    '#042C79': false,
    '#A02B5D': false,
    '#077353': false,
    'darkgrey': false,
    '#000': false,
    '#03fff7': false,
    '#fe01b1': false,
    '#98623c': false
  }
}

export default states


// for each checked habit - uncheck them
export default function checkTime() {
    let newDate = new Date();
    console.log('checkTime', newDate.getHours(), newDate.getMinutes(), newDate.getSeconds())
    this.queryLocalStorage()
    
    // check for previous date
    let oldDate;
    var hideOnWeekend = false;
    if(localStorage.getItem('date')){oldDate = new Date(localStorage.getItem('date'))} 
    if(localStorage.getItem('hideOnWeekend')){hideOnWeekend = new Date(localStorage.getItem('hideOnWeekend'))} 
    else {oldDate = new Date()} // otherwise create a newDate

    // if the days aren't the same
    if (newDate.getDate() !== oldDate.getDate()){

      // hide background on weekends
      this.setState({hideColumn: false})
      if (newDate.getDay() == 6 || newDate.getDay() == 0){
        if (hideOnWeekend){this.setState({hideColumn: true})}
      }

      this.handleChangeBackground()

      var todayItemIds = JSON.parse(JSON.stringify(this.state.columns['today'].itemIds));
      var yesterdayItemIds = JSON.parse(JSON.stringify(this.state.columns['yesterday'].itemIds));
      let history = JSON.parse(JSON.stringify(this.state.history));
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      // if the different date is < 48 hours past the previous date
      if (((newDate - oldDate)/86400000) < 2){
        // uncheck all the items in habits
        this.uncheckHabits()

        let newState = {...this.state}

        // Move "todays" to "yesterday"
        for (let itemIndex = 0; itemIndex < this.state.columns['today'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['today'].itemIds[itemIndex]

          if (this.state.items[itemId].checked === 'checked'){
            todayItemIds.splice(todayItemIds.indexOf(itemId), 1)
            yesterdayItemIds.push(itemId)
          }
        }

        // Move "yesterdays" to history and delete item
        for (let itemIndex = 0; itemIndex < this.state.columns['yesterday'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['yesterday'].itemIds[itemIndex]
          if (this.state.items[itemId].checked === 'checked'){
            let itemLocation = yesterdayItemIds.indexOf(itemId);
            history.push([this.state.items[yesterdayItemIds[itemLocation]].content, yesterday]);
            delete newState.items[itemId]
            yesterdayItemIds.splice(itemLocation, 1)
          }
        }

        newState.columns.today.itemIds = todayItemIds;
        newState.columns.yesterday.itemIds = yesterdayItemIds;
        newState.history = history;

        this.setState(newState, () => {
          localStorage.setItem('columns', JSON.stringify(this.state.columns))
          localStorage.setItem('history', JSON.stringify(this.state.history))
          localStorage.setItem('items', JSON.stringify(this.state.items))
        });
      }
      
      // if more than one day has passed
      else if (((newDate - oldDate)/86400000) > 2) {
        this.uncheckHabits()

        // delete all checked items from today
        for (let itemIndex = 0; itemIndex < this.state.columns['today'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['today'].itemIds[itemIndex]
          let checked = this.state.items[itemId].checked


          // if item is checked remove it from today
          if (checked === 'checked'){
            let itemLocation = todayItemIds.indexOf(itemId);
            history.push([this.state.items[todayItemIds[itemLocation]].content, history]);
            todayItemIds.splice(todayItemIds.indexOf(itemId), 1)
            delete this.state.items[itemId]
          }
        }

        for (let itemIndex = 0; itemIndex < this.state.columns['yesterday'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['yesterday'].itemIds[itemIndex]
          let checked = this.state.items[itemId].checked

          if (checked === 'checked'){
            let itemLocation = yesterdayItemIds.indexOf(itemId);
            history.push([this.state.items[yesterdayItemIds[itemLocation]].content, newDate]);
            yesterdayItemIds.splice(yesterdayItemIds.indexOf(itemId), 1)
            delete this.state.items[itemId]
          }
        }

        this.setState({
          ...this.state,
          columns: {
            ...this.state.columns,
            'today': {
              ...this.state.columns['today'],
              itemIds: todayItemIds
            },
            'yesterday': {
              ...this.state.columns['yesterday'],
              itemIds: yesterdayItemIds
            }
          },
          history: history
        }, () => {
          localStorage.setItem('columns', JSON.stringify(this.state.columns));
          localStorage.setItem('history', JSON.stringify(this.state.history))
        })
      }
    }

    localStorage.setItem('date', newDate)
    this.setState({date: newDate})
  }
// for each checked habit - uncheck them
export default function checkTime() {
  this.queryLocalStorage()

  // if hour < last hour 
    let todaysDate = new Date();

    let endOfHour = this.state.endOfDay.split(":")[0]
    let endOfMinute = this.state.endOfDay.split(":")[0]
    
    // check for previous date
    var prevDate = localStorage.getItem('date') == null 
      ? new Date()
      : new Date(localStorage.getItem('date')) 

    // if the days aren't the same
    if (todaysDate.getDate() !== prevDate.getDate()){
      this.handleChangeBackground()
      this.uncheckHabits()

      // make arrays not pointers 
      var newTodayItemIds = JSON.parse(JSON.stringify(this.state.columns['today'].itemIds));
      var newYesterdayItemIds = JSON.parse(JSON.stringify(this.state.columns['yesterday'].itemIds));
      let newHistory = JSON.parse(JSON.stringify(this.state.history));

      var yesterday = new Date(todaysDate - 86400000);
      
      // if the prev date is < 48 hours past the previous date (yesteday)
      if (((todaysDate - prevDate)/86400000) <= 2){

        // Move "todays" to "yesterday"
        for (let itemIndex = 0; itemIndex < this.state.columns['today'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['today'].itemIds[itemIndex]

          // splice item from Today push to Yesterday
          if (this.state.items[itemId].checked === 'checked'){
            newTodayItemIds.splice(newTodayItemIds.indexOf(itemId), 1)
            newYesterdayItemIds.push(itemId)
          }
        }

        let newState = {...this.state}

        // move Yesterday to History and delete item
        for (let itemIndex = 0; itemIndex < this.state.columns['yesterday'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['yesterday'].itemIds[itemIndex]
          if (this.state.items[itemId].checked === 'checked'){
            let itemLocation = newYesterdayItemIds.indexOf(itemId);
            newHistory.push([this.state.items[newYesterdayItemIds[itemLocation]].content, yesterday]);
            delete newState.items[itemId]
            newYesterdayItemIds.splice(itemLocation, 1)
          }
        }

        newState.columns.today.itemIds = newTodayItemIds;
        newState.columns.yesterday.itemIds = newYesterdayItemIds;
        newState.history = newHistory;

        this.setState(newState, () => {
          localStorage.setItem('columns', JSON.stringify(this.state.columns))
          localStorage.setItem('history', JSON.stringify(this.state.history))
          localStorage.setItem('items', JSON.stringify(this.state.items))
        });
      }
      
      // if more than one day has passed
      else if (((todaysDate - prevDate)/86400000) > 2) {
        
        const newState = {...this.state}

        // delete all checked items from Today
        for (let itemIndex = 0; itemIndex < this.state.columns['today'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['today'].itemIds[itemIndex]
          let checked = this.state.items[itemId].checked

          // if item is checked remove it from Today
          if (checked === 'checked'){
            let itemLocation = newTodayItemIds.indexOf(itemId);
            newHistory.push([this.state.items[newTodayItemIds[itemLocation]].content, yesterday]);
            newTodayItemIds.splice(newTodayItemIds.indexOf(itemId), 1)
            delete newState.items[itemId]
          }
        }

        // if item is checked remove it from Yesterday
        for (let itemIndex = 0; itemIndex < this.state.columns['yesterday'].itemIds.length; itemIndex++){
          let itemId = this.state.columns['yesterday'].itemIds[itemIndex]
          let checked = this.state.items[itemId].checked

          if (checked === 'checked'){
            let itemLocation = newYesterdayItemIds.indexOf(itemId);
            newHistory.push([this.state.items[newYesterdayItemIds[itemLocation]].content, yesterday]);
            newYesterdayItemIds.splice(newYesterdayItemIds.indexOf(itemId), 1)
            delete newState.items[itemId]
          }
        }

        newState.columns.today.itemIds = newTodayItemIds
        newState.columns.yesterday.itemIds = newYesterdayItemIds
        newState.history = newHistory

        this.setState(newState, () => {
          localStorage.setItem('columns', JSON.stringify(this.state.columns));
          localStorage.setItem('history', JSON.stringify(this.state.history))
        })
      }
    }

    localStorage.setItem('date', todaysDate)
    this.setState({date: todaysDate})
  }


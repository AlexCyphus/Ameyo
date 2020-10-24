export function uncheckHabits() {
    const newState = {...this.state}

    for (var itemId in this.state.columns['habits'].itemIds){

        // get all habits from column
        let habit = this.state.columns['habits'].itemIds[itemId]
        let item = this.state.items[habit]
        let itemName = item['content']
        var status = 0

        // if the habit is "checked"...
        if (item.checked === 'checked'){
            newState.items[habit].checked = 'unchecked';
            status = 1
        }

        let habitHistory = newState.monthlyHabitsCount[itemName]

        if(habitHistory){
            if (habitHistory.length > 29){
                newState.monthlyHabitsCount[itemName].pop()
            } 
            newState.monthlyHabitsCount[itemName].unshift(status)
        }

        else {
            newState.monthlyHabitsCount[itemName] = [status]
        }
    }

    // save items + habit history
    this.setState(newState, () => {
        localStorage.setItem('items', JSON.stringify(this.state.items))
        localStorage.setItem('monthlyHabitsCount', JSON.stringify(this.state.monthlyHabitsCount))
    })
}

export function addItem(e) {

    // dont let page refresh on submit
    e.preventDefault();
    var columnId = e.target.id;

    this.queryLocalStorage(() => {
        
        var value = this.state.inputs[columnId]; // the value of the input

        // find the first unused itemId
        let itemId;
        let itemsLen = Object.keys(this.state.items).length + 1
        const newState = {...this.state}
        
        // i think this is where the bug is coming from but idk why 
        for (var x = 1; x < itemsLen + 1; x++){
        let searchVal = "item-" + x;
        if (!this.state.items[searchVal]){itemId = "item-" + x}
        }

        // format date object
        const todaysDate = new Date()
        let dateArray = [todaysDate.getMonth() + 1, todaysDate.getDate()]
        let columnsItemIds = this.state.columns[columnId].itemIds

        columnsItemIds.unshift(itemId)

        newState.items[itemId] = {id: itemId, content: value, checked: "unchecked", date: dateArray}
        newState.columns[columnId].itemIds = columnsItemIds
        newState.inputs[columnId] = ''

        this.setState(newState, () => {
        localStorage.setItem('columns', JSON.stringify(this.state.columns))
        localStorage.setItem('items', JSON.stringify(this.state.items))
        }) 
    })
}

export function checkItem(e){
    const newState = {...this.state}

    // find the column its in 
    let column = ''
    let itemId = e.target.id

    for (var col in this.state.columns){
        if(this.state.columns[col].itemIds.includes(itemId)){
        column = col
        break
        }
    }

    if (this.state.items[itemId].checked === "unchecked"){
        if (column !== 'backlog'){
        newState.items[itemId].checked = "checked"
        let itemLocation = newState.columns[column].itemIds.indexOf(itemId)
        newState.columns[column].itemIds.splice(itemLocation, 1)
        newState.columns[column].itemIds.push(itemId);
        }
    }


    else {newState.items[itemId].checked = "unchecked"}

    this.setState(newState, () => {
        localStorage.setItem('items', JSON.stringify(this.state.items))
        localStorage.setItem('columns', JSON.stringify(this.state.columns))
    })
}
export function queryLocalStorage(_callback = false){
    const newState = {...this.state}

    if (JSON.parse(localStorage.getItem('items'))){newState.items = JSON.parse(localStorage.getItem('items'))}
    if (JSON.parse(localStorage.getItem('columns'))){newState.columns = JSON.parse(localStorage.getItem('columns'))}
    if (JSON.parse(localStorage.getItem('columnOrder'))){newState.columnOrder = JSON.parse(localStorage.getItem('columnOrder'))}
    if (JSON.parse(localStorage.getItem('monthlyHabitsCount'))){newState.monthlyHabitsCount = JSON.parse(localStorage.getItem('monthlyHabitsCount'))}
    if (JSON.parse(localStorage.getItem('history'))){newState.history = JSON.parse(localStorage.getItem('history'))}

    this.setState(newState, () => {
        if (_callback) {_callback()};
    })
}
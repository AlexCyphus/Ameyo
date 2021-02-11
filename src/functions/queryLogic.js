export function queryLocalStorage(_callback = false){
    const newState = {...this.state}

    if (JSON.parse(localStorage.getItem('items'))){newState.items = JSON.parse(localStorage.getItem('items'))}
    if (JSON.parse(localStorage.getItem('columns'))){newState.columns = JSON.parse(localStorage.getItem('columns'))}
    if (JSON.parse(localStorage.getItem('columnOrder'))){newState.columnOrder = JSON.parse(localStorage.getItem('columnOrder'))}
    if (JSON.parse(localStorage.getItem('monthlyHabitsCount'))){newState.monthlyHabitsCount = JSON.parse(localStorage.getItem('monthlyHabitsCount'))}
    if (JSON.parse(localStorage.getItem('history'))){newState.history = JSON.parse(localStorage.getItem('history'))}
    if (JSON.parse(localStorage.getItem('colors'))){newState.colors = JSON.parse(localStorage.getItem('colors'))}
    if (JSON.parse(localStorage.getItem('backgroundImageIndex'))){newState.backgroundImageIndex = JSON.parse(localStorage.getItem('backgroundImageIndex'))}
    if (JSON.parse(localStorage.getItem('endOfDay'))){newState.endOfDay = JSON.parse(localStorage.getItem('endOfDay'))}

    // if first time user
    if (JSON.parse(localStorage.getItem('showIntroduction') == null)){newState.information = true}

    // check for new feature 
    if (localStorage.getItem('newestFeature')){newState.newestFeature = localStorage.getItem('newestFeature')}

    this.setState(newState, () => {
        if (_callback) {_callback()};
    })
}


/* 

current user 
* as long as localstorage @ showNew != labels => render newScreen 
* when newScreen renders set localStorage @ showNew => 'labels'

new user 
* if information this.state.information === true => localStorage @ showNew = 'labels

*/


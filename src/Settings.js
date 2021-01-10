import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import {Switch, Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {handleChangeBackground, toggleAllowedBackgroundChanges} from './functions/imageLogic'

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const nth = (date) => {
    if (date > 3 && date < 21) return 'th';
    date = date % 10
    switch (date){
        case 1: return "st"
        case 2: return "nd"
        case 3: return "rd"
        default: return "th"
    }
}

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.toggleFeedback = this.toggleFeedback.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleAllowedBackgroundChanges = this.toggleAllowedBackgroundChanges.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this)
        this.deleteHabits = this.deleteHabits.bind(this)
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
            hideFeedback: JSON.parse(localStorage.getItem('hideFeedback')) ? JSON.parse(localStorage.getItem('hideFeedback')) : true, 
            preventChangeBackground: JSON.parse(localStorage.getItem('preventChangeBackground')) ? JSON.parse(localStorage.getItem('preventChangeBackground')) : false, 
        }
    }

    handleChangeBackground = handleChangeBackground;
    toggleAllowedBackgroundChanges = toggleAllowedBackgroundChanges;

    toggleFeedback() {
        var newFeedback = ''
        if (this.state.hideFeedback){newFeedback = false}
        else {newFeedback = true}
        this.setState({
            hideFeedback: newFeedback
        },
            localStorage.setItem('hideFeedback', JSON.stringify(newFeedback))
        )
    }

    handleChange(event){
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    deleteHistory(){
        if(window.confirm("Are you sure you want to delete your task history? This action can't be undone and your history statistics will be reset.")){
            localStorage.setItem('history', JSON.stringify([]))
            this.setState({history: []})
        }
    }

    deleteHabits(){
        if(window.confirm("Are you sure you want to delete your habits history? This action can't be undone and your habit statistics will be reset.")){
            localStorage.setItem('monthlyHabitsCount', JSON.stringify({}))
            this.setState({monthlyHabitsCount: {}})
        }
    }
    
    render(){
        let history = {...this.state.history}
        history = Object.values(history).reverse()
        return (
            <div className="fullscreen-popup d-flex">
                <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                <div className='d-flex justify-content-center w-100 white mh-80 m-auto'>
                    <div className={"align-middle p-0 d-none settings-outer d-md-block " + (this.state.hideFeedback ?  "col-md-5" : "col-md-3")}>
                        <div id="settings-outer">
                            <h4 className="mb-3 mt-0 text-center">Settings</h4>
                            <FormControlLabel
                                control={<Switch checked={this.state.preventChangeBackground} onChange={this.toggleAllowedBackgroundChanges} name="gilad" />}
                                label="Freeze on today's image"
                                inputprops={{ 'aria-label': 'primary checkbox' }}
                                className="mx-1"
                            />
                            <Button variant="contained" color="primary" onClick={() => this.handleChangeBackground("last")}>Last background image</Button>
                            <Button variant="contained" color="primary" onClick={() => this.handleChangeBackground("next")}>Next background image</Button>
                            <Button variant="contained" color="primary" onClick={() => this.props.toggleInformation()}>See information screen</Button>
                            <Button variant="contained" color="primary" onClick={this.toggleFeedback}>Give feedback</Button>
                            <Button variant="contained" color="primary" target="_blank" href="https://bit.ly/AmeyoRate">Rate Ameyo 5 stars</Button>
                            <div className="d-block" id="danger-zone">
                                <div className="text-center"><h5><span role="img" aria-label="warning">⚠️</span> Danger Zone <span role="img" aria-label="warning">⚠️</span></h5></div>
                                <div className="pt-1 pb-3 text-center"><p>You probably don't want to click these buttons</p></div>
                                <Button variant="contained" color="secondary" onClick={this.deleteHistory} className="mx-1">Clear task history</Button>
                                <Button variant="contained" color="secondary" onClick={this.deleteHabits} className="mx-1">Clear habit history</Button>
                                <Button href="https://bit.ly/AmeyoUninstall" variant="contained" color="secondary" className="mx-1">Uninstall Ameyo</Button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 d-flex chart-holder'>
                        <div className="w-100 history-container chart-title">
                            <div className='history'>
                                    {history.map((item, index) => {
                                        var date = new Date(item[1])
                                        date = new Date(date.getTime() - 24*60*60*1000)
                                        var ordinal = nth(date.getDate())
                                        return (
                                            <div className="row white history-row" key={index}>
                                                <div className="col-sm-8 history-item pr-2"><p>{item[0]}</p></div>
                                                <div className="col-sm-4 text-center m-auto pl-0 pr-0"><p>{weekday[date.getDay()]}, {months[date.getMonth()]} {date.getDate() + ordinal}</p></div>
                                            </div>
                                        )
                                        })
                                    }
                                </div>
                            <h2 className='text-center pt-3 pb-0 white chart-title mb-0'>History</h2>
                            <p className='text-center pt-1 white'>Total completed: {history.length}</p>
                        </div>
                    </div>
                    {!this.state.hideFeedback ? 
                     <div className="col-md-5 d-none d-lg-block" id='typeform'>
                        <ReactTypeformEmbed url="https://alexjcyphus.typeform.com/to/Ns596HzQ" />
                        <h2 className='text-center pt-3 white chart-title'><span className="font-italic clickable" onClick={this.toggleFeedback}>(Hide feedback?)</span></h2>
                    </div>
                    :
                    null}
                   
                    
                </div>
            </div>
        )
    }
}


//

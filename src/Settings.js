import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import {Switch, Button, TextField} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {handleChangeBackground, toggleAllowedBackgroundChanges} from './functions/imageLogic'
import DogecoinDonationMessage from './components/DogecoinDonationMessage'
import TimePicker from "./components/Timepicker/Timepicker.js"
import HistoryFeed from "./components/HistoryFeed/HistoryFeed.js"

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.toggleFeedback = this.toggleFeedback.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleAllowedBackgroundChanges = this.toggleAllowedBackgroundChanges.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this)
        this.deleteHabits = this.deleteHabits.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
            hideFeedback: JSON.parse(localStorage.getItem('hideFeedback')) ? JSON.parse(localStorage.getItem('hideFeedback')) : true, 
            preventChangeBackground: JSON.parse(localStorage.getItem('preventChangeBackground')) ? JSON.parse(localStorage.getItem('preventChangeBackground')) : false, 
            timePopup: false,
            donate: false
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

    handleChangeTime(e) {
        // if submitted
        if (e === 'submit') {
            let timeValue = document.getElementById('time-value').value
            this.props.changeEndOfDay(timeValue)
        }

        return this.setState({timePopup: !this.state.timePopup})
    }
    
    render(){
        let history = {...this.state.history}
        history = Object.values(history).reverse()
        const date = new Date()

        return (
            <div className="d-flex h-100">
                {this.state.timePopup && <TimePicker 
                    endOfDay={this.props.endOfDay}
                    handleChangeTime={this.handleChangeTime}
                />}
                <div className="fullscreen-popup d-flex">
                    <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                    <div className='d-flex justify-content-center w-100 white mh-80 m-auto'>
                        <div className={"align-middle p-0 d-none settings-outer d-md-block " + (this.state.hideFeedback ?  "col-md-5" : "col-md-3")}>
                            <div id="settings-outer">
                                <h4 className="mb-3 mt-0 text-center">Settings</h4>
                                <Button variant="contained" color="primary" onClick={this.toggleAllowedBackgroundChanges}>{this.state.preventChangeBackground ? '▶️ Resume random backgrounds' : "⏸ Pause on today's image"}</Button>
                                <Button variant="contained" color="primary" onClick={() => this.handleChangeBackground("last")}>Last background image</Button>
                                <Button variant="contained" color="primary" onClick={() => this.handleChangeBackground("next")}>Next background image</Button>
                                <Button variant="contained" color="primary" onClick={() => this.props.toggleInformation()}>See information screen</Button>
                                <Button variant="contained" color="primary" onClick={this.toggleFeedback}>Give feedback</Button>
                                <Button variant="contained" color="primary" target="_blank" href="https://bit.ly/AmeyoRate">Rate Ameyo 5 stars</Button>
                                <Button variant="contained" color="primary" onClick={this.handleChangeTime}>Change end-of-day time</Button>
                                <Button variant="contained" color="primary" onClick={() => this.setState({donate: !this.state.donate})}>Donate to Ameyo</Button>
                                {this.state.donate && <DogecoinDonationMessage/>}
                                <div className="d-block" id="danger-zone">
                                    <div className="text-center"><h5><span role="img" aria-label="warning">⚠️</span> Danger Zone <span role="img" aria-label="warning">⚠️</span></h5></div>
                                    <div className="pt-1 pb-3 text-center"><p>You probably don't want to click these buttons</p></div>
                                    <Button variant="contained" color="secondary" onClick={this.deleteHistory} className="mx-1">Clear task history</Button>
                                    <Button variant="contained" color="secondary" onClick={this.deleteHabits} className="mx-1">Clear habit history</Button>
                                    <Button href="https://bit.ly/AmeyoUninstall" variant="contained" color="secondary" className="mx-1">Uninstall Ameyo</Button>
                                </div>
                            </div>
                        </div>
                        <HistoryFeed history={history}/>
                        {!this.state.hideFeedback && <div className="col-md-5 d-none d-lg-block" id='typeform'>
                            <ReactTypeformEmbed url="https://alexjcyphus.typeform.com/to/Ns596HzQ" />
                            <h2 className='text-center pt-3 white chart-title'><span className="font-italic clickable" onClick={this.toggleFeedback}>(Hide feedback?)</span></h2>
                        </div>
                        }    
                    </div>
                </div>
            </div>
        )
    }
}


//

import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import {Switch, Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.toggleFeedback = this.toggleFeedback.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
            hideFeedback: JSON.parse(localStorage.getItem('hideFeedback')) ? JSON.parse(localStorage.getItem('hideFeedback')) : false, 
            gilad: true,
    jason: false,
    antoine: true,
        }
    }

    toggleFeedback() {
        var newFeedback = ''
        if (this.state.hideFeedback){var newFeedback = false}
        else {var newFeedback = true}
        this.setState({
            hideFeedback: newFeedback
        },
            localStorage.setItem('hideFeedback', JSON.stringify(newFeedback))
        )
    }

    handleChange(event){
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
      };

    render(){
        let history = {...this.state.history}
        history = Object.values(history).reverse()
        return (
            <div className={this.props.settingsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                <div className='d-flex justify-content-center w-100 white mh-80 m-auto'>
                    <div className={"text-center align-middle p-0 d-none d-md-block " + (this.state.hideFeedback ?  "col-md-5" : "col-md-3")}>
                        <FormGroup>
                            <div>Settings</div>
                            <FormControlLabel
                                control={<Switch checked={this.state.gilad} onChange={this.handleChange} name="gilad" />}
                                label="Freeze on todays image"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <FormControlLabel
                                control={<Switch checked={this.state.gilad} onChange={this.handleChange} name="gilad" />}
                                label="Hide columns on weekends"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Button variant="contained" color="primary">Skip the current background image</Button>
                            <Button variant="contained" color="primary">See information screen</Button>
                            <Button variant="contained" color="primary">Give feedback</Button>
                            <div>⚠️ Danger Zone ⚠️</div>
                            <div>You probably don't want to click these buttons</div>
                            <Button variant="contained" color="secondary">Clear task history</Button>
                            <Button variant="contained" color="secondary">Clear habit history</Button>
                            <Button variant="contained" color="secondary">Unistall Ameyo</Button>
                        </FormGroup>
                        <div className="bg-success mt-2 py-2 rounded">Settings updated successfully</div>
                        {/* <div className="text-left information">
                            <h4 className="pb-3 font-underline">ℹ️ Information</h4>
                            <p>The logic behind Ameyo is that everyday at midnight...</p>
                            <ul>
                                <li>All completed "Habits" will uncheck - ready for the next day</li>
                                <li>Completed "Today" tasks will move to yesterday to remind you where you left off</li>
                                <li>Completed "Yesterday" tasks will move to history to create a distraction free board</li>
                            </ul>
                            <p>There is no need to delete or move completed tasks as this will all be done automatically.</p>
                            <p>You will then be able to track your progress in the statistics tab.</p>
                            <p>Have feedback? Send me an email <a href="mailto:alexjcyphus@gmail.com">alexjcyphus@gmail.com</a></p>
                            {this.state.hideFeedback ? <h5 className="clickable pt-4 text-italic" onClick={this.toggleFeedback}>(🎤 Show feedback form?)</h5> : null}
                        </div> */}
                    </div>
                    <div className='col-md-4 d-flex chart-holder'>
                        <div className="w-100 history-container chart-title">
                            <div className='history'>
                                    {history.map((item, index) => {
                                            var date = new Date(item[1])
                                            return (
                                                <div className="row white history-row">
                                                    <div className="col history-item pr-2"><p>{item[0]}</p></div>
                                                    <div className="col-auto text-right pl-2"><p>{date.getDate() - 1}/{date.getMonth() + 1}/{date.getFullYear()}</p></div>
                                                </div>
                                            )
                                            })
                                    }
                                </div>
                            <h2 className='text-center pt-3 white chart-title'>History</h2>
                        </div>
                    </div>
                    {!this.state.hideFeedback ? 
                     <div className="col-md-5 d-none d-lg-block" id='typeform'>
                        <ReactTypeformEmbed url="https://alexjcyphus.typeform.com/to/Ns596HzQ" />
                        <h2 className='text-center pt-3 white chart-title'>Feedback <span className="font-italic clickable" onClick={this.toggleFeedback}>(hide?)</span></h2>
                    </div>
                    :
                    null}
                   
                    
                </div>
            </div>
        )
    }
}


//

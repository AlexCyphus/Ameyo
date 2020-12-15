import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import {Switch, Button} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {handleChangeBackground, toggleAllowedBackgroundChanges} from './functions/imageLogic'


export default class Information extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const Navigation = ({number}) => {
            return (
                <div className="info-navigation row justify-content-end text-right">
                    <div className="w-25 text-left"><p className="f-30 clickable" onClick={() => this.props.handleChangeInfoPage(false)}>LAST</p></div>
                    <div className="w-50 text-center"><p className="f-30">{number}/6</p></div>
                    {number == 6 
                    ?
                    <div className="w-25"><p className="f-30 clickable" onClick={this.props.toggleInformation}>BEGIN!</p></div> 
                    :
                    <div className="w-25"><p className="f-30 clickable" onClick={() => this.props.handleChangeInfoPage(true)}>NEXT</p></div>
                    }
                    
                </div>
            )
        }
        
        const Content = () => {

            if (this.props.page == 0){
                // welcome 
                return (
                    <div className="text-center">
                        <h1 className="pb-3">Welcome to Ameyo!</h1>
                        <h5>Before you begin, let me give you a quick tour.</h5>
                        <div className="white-black-button clickable">
                            <p onClick={() => this.props.handleChangeInfoPage(true)}>BEGIN</p>
                        </div>
                    </div>
                )
            }

            // 1/5
            else if (this.props.page == 1){ 
                return (
                    <>
                    <div className="d-flex align-items-center main-info-content">
                        <div>
                            <img src="./info1.jpg" className="two-info-images"></img>
                        </div>
                        <div className="text-left instructions">
                            <p><u>Ameyo is based around four columns...</u></p>
                            <p><strong>Habits:</strong> Tasks to be completed every day.</p>
                            <p><strong>Today:</strong> Tasks you want to finish that day.</p>
                            <p><strong>Backlog:</strong> Tasks for the future.</p>
                            <p><strong>Yesterday:</strong> Tasks you did yesterday.</p>
                        </div>
                    </div>
                    <Navigation number={1}/>
                </>   
                )
            }

            // 2/5
            else if (this.props.page == 2){
                return (
                    <>
                    <div className="d-flex align-items-center main-info-content">
                        <div>
                            <img src="./info1.jpg" className="two-info-images"></img>
                        </div>
                        <div className="text-left instructions">
                            <p><u>Every night at midnight...</u></p>
                            <ol>
                                <li><strong>Habits</strong> are unchecked ready for the next day.</li>
                                <li>Checked <strong>Today</strong> tasks are moved to <strong>Yesterday</strong>.</li>
                                <li>Checked <strong>Yesterday</strong> tasks are moved to the history and off the board.</li>
                                <li>A beautiful new background image will be shown.</li>
                            </ol>
                            <p className="pb-0">Click NEXT to see it in action.</p>
                        </div>
                    </div>
                    <Navigation number={2}/>
                    </>   
                )
            }

            // 3/5
            else if (this.props.page == 3){
                return (
                    <>
                    <div className="d-flex align-items-center main-info-content">
                        <div className="img-1">
                            <img src="./info1.jpg" className="two-info-images"></img>
                        </div>
                        <div className="arrow">➥</div>
                        <div className="img-2">
                            <img src="./info2.jpg" className="two-info-images"></img>
                        </div>
                    </div>
                    <Navigation number={3}/>
                    </>   
                )
            }

            // 4/5
            else if (this.props.page == 4){
                return (
                    <>
                    <div className="d-flex align-items-center main-info-content">
                        <div>
                            <img src="./info4.png" className="info-image"></img>
                        </div>
                        <div className="text-left instructions">
                            <p>You can then see your progress in the statistics tab and find out...</p>
                            <ul>
                                <li>How frequently you’re doing your daily habits.</li>
                                <li>Which habits you’re neglecting.</li>
                                <li>How many tickets you do on a certain day. </li>
                            </ul>
                        </div>
                    </div>
                    <Navigation number={4}/>
                    </>   
                )
            }     
            // 5/5
            else if (this.props.page == 5){
                return (
                    <>
                    <div className="d-flex align-items-center main-info-content">
                        <div>
                            <img src="./info5.jpg" className="info-image" id=""></img>
                        </div>
                        <div className="text-left instructions">
                            <p>Want to know what you did 138 days ago? Perhaps to prove an alibi? </p>
                            <p>You can find history along with useful options in the settings tab.</p>
                        </div>
                    </div>
                    <Navigation number={5}/>
                    </>   
                )
            }

            // 6/6
            else if (this.props.page == 6){
                // welcome 
                return (
                    <>
                    <div className="text-center">
                        <h1 className="pb-3">You're ready.</h1>
                        <h5>Now go forth and be the most productive version of yourself you can be!</h5>
                    </div>
                    <Navigation number={6}/>
                    </>
                )
            }
        }

        return (
            <div className={this.props.informationState === true ? "fullscreen-popup pt-0 d-flex" : "d-none"}>
                <div className='white m-auto'>
                    <Content/>
                </div>
            </div>
        )
    }
}


//

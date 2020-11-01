import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed';


export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.toggleFeedback = this.toggleFeedback.bind(this)
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
            hideFeedback: JSON.parse(localStorage.getItem('hideFeedback')) ? JSON.parse(localStorage.getItem('hideFeedback')) : false, 
        }
    }

    toggleFeedback() {
        console.log(this.state.hideFeedback)
        var newFeedback = ''
        if (this.state.hideFeedback){var newFeedback = false}
        else {var newFeedback = true}
        this.setState({
            hideFeedback: newFeedback
        },
            localStorage.setItem('hideFeedback', JSON.stringify(newFeedback))
        )
    }

    render(){
        return (
            <div className={this.props.settingsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                <div className='d-flex justify-content-center w-100 white mh-80 m-auto'>
                    <div className={"text-center align-middle d-flex " + (this.state.hideFeedback ?  "col-md-5" : "col-md-3")}>
                        <div className="m-auto">
                            <h2 className="text-center pb-3">More settings coming soon</h2>
                            {this.state.hideFeedback ? <h3 className="clickable font-italic chart-title text-center" onClick={this.toggleFeedback}>(Show Feedback Form?)</h3> : null}
                        </div>
                    </div>
                    <div className='col-md-4 d-flex chart-holder'>
                        <div className="w-100 history-container chart-title">
                            <div className='history'>
                                    {this.state.history.reverse().map((item, index) => {
                                            var date = new Date(item[1])
                                            return (
                                                <div className="row white history-row">
                                                    <div className="col history-item pr-2"><p>{item[0]}</p></div>
                                                    <div className="col-auto text-right pl-2"><p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p></div>
                                                </div>
                                            )
                                            })
                                    }
                                </div>
                            <h2 className='text-center pt-3 white chart-title'>History</h2>
                        </div>
                    </div>
                    {!this.state.hideFeedback ? 
                     <div className="col-md-5" id='typeform'>
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

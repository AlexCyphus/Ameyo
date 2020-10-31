import React from 'react'

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
        }
    }
    render(){
        return (
            <div className={this.props.settingsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                <div className='d-flex justify-content-center w-100 white mh-80 m-auto'>
                    <div className="col-md-8 m-auto text-center">More settings coming soon...</div>
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
                    
                </div>
            </div>
        )
    }
}


//

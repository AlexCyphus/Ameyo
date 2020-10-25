import React from 'react'
import HabitChart from './HabitChart'
import CompletedTicketsChart from './CompletedTicketsChart'

export default class Statistics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: JSON.parse(localStorage.getItem('history'))
        }
    }
    render(){
        
        return (
            <div>
                <div className={this.props.statisticsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                    <p className="close-popup" onClick={this.props.statisticsClose}>x</p>
                    <div className='d-flex m-auto'>
                        <div className='col-md-4 d-flex chart-holder'>
                            <div className='m-auto w-100'>
                                <HabitChart/>
                                <h2 className='text-center pt-3 white chart-title'>Habits (30 Days)</h2>
                            </div>
                        </div>
                        <div className='col-md-4 d-flex chart-holder'>
                            <div className='m-auto w-100'>
                                <CompletedTicketsChart history={this.state.history}/>
                                <h2 className='text-center pt-3 white chart-title'>Completed Tickets (30 days)</h2>
                            </div>
                        </div>
                        <div className='col-md-4 d-flex chart-holder'>
                            <div className="m-auto w-100 history-container chart-title">
                                <div className='history'>
                                        {this.state.history.map((item, index) => {
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
            </div>
        )
    }
}
import React from 'react'
import HabitChart from './HabitChart'
import CompletedTickets from './CompletedTickets'


var itemHistory = []

if (JSON.parse(localStorage.getItem('history'))){itemHistory = JSON.parse(localStorage.getItem('history'))}

export default class Statistics extends React.Component {
    render(){
        return (
            <div>
                <div className={this.props.statisticsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                    <p className="close-popup" onClick={this.props.statisticsClose}>x</p>
                    <div className='col-4 d-flex'>
                        <div className='m-auto w-100'>
                            <HabitChart/>
                            <h2 className='text-center pt-3 white chart-title'>Habits (30 Days)</h2>
                        </div>
                    </div>
                    <div className='col-4 d-flex'>
                        <div className='m-auto w-100'>
                            <CompletedTickets/>
                            <h2 className='text-center pt-3 white chart-title'>Completed Tickets (30 days)</h2>
                        </div>
                    </div>
                    <div className='col-4 d-flex'>
                        <div className="m-auto w-100 history-container chart-title">
                            <div className='history'>
                                    {itemHistory.map((item, index) => {
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
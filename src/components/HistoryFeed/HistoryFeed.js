import './HistoryFeed.scss'

// this doesnt work for some reason

const HistoryFeed = ({history, nth, weekday, months}) => {
    return (
        <div className='col-md-4 d-flex chart-holder'>
            <div className="w-100 chart-title">
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
    )
}

export default HistoryFeed
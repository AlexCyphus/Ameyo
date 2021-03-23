import './HistoryFeed.scss'
import {useState} from 'react'

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

const HistoryFeed = ({history}) => {
    const [expandedItem, updateExpandedItem] = useState(null)

    const expandSelection = (key) => {
        if (expandedItem == key){
            return updateExpandedItem(null)
        }
        
        return updateExpandedItem(key)
    }

    return (
        <div className='col-md-4 d-flex chart-holder'>
            <div className="w-100 chart-title">
                <div className='history'>
                        {history.map((item, index) => {
                            let date = null
                            let content = null
                            let description = null
                            let url = null

                            
                            // support older history arrays 
                            if (Array.isArray(item)){
                                date = new Date(item[1])   
                                content = item[0]
                            }

                            // new history object 
                            else {
                                console.log('not array')
                                date = new Date(item.date)
                                content = item.content
                                description = item.description
                                url = item.url
                            }
                            
                            date = new Date(date.getTime() - 24*60*60*1000)
                            let ordinal = nth(date.getDate())

                            let wasClicked = expandedItem == index
                            let shouldExpand = wasClicked && (description || url)

                            return (
                                <>
                                <div className={"row white history-row clickable " + (wasClicked && "bg-white text-black ") + (shouldExpand && "bb-black")} key={index} onClick={() => expandSelection(index)}>
                                    <div className="col-sm-8 history-item pr-2"><p>{content}</p></div>
                                    <div className="col-sm-4 text-center m-auto pl-0 pr-0"><p>{weekday[date.getDay()]}, {months[date.getMonth()]} {date.getDate() + ordinal}</p></div>
                                </div>
                                {shouldExpand &&
                                    <div className="row white history-row bg-white text-black" key={index}>
                                        {description && 
                                            <div className="col-sm-12 history-item pr-2">
                                                <p className="bold">Description:</p>
                                                <p>{description}</p>
                                            </div>
                                        }
                                        {url && 
                                            <div className="col-sm-12 history-item pr-2 pt-3">
                                                <p className="bold">URL:</p>
                                                <a>{url}</a>
                                            </div>
                                        }
                                    </div>
                                }
                                </>
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
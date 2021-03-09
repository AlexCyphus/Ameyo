import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useState} from 'react'
import '../../App.css';

const ContextMenu = ({x, y, itemId, labels, items, updateSpecificData, toggleContextMenu, updateAppState, contextMenuEditables}) => {
    const contextMenuOuterStyles = {
        top: y + 'px',
        left: x + 15 + 'px',
    }

    const rawData = items[itemId]
    const rawContent = rawData.content
    const currentTicketLabel = rawContent.split(" ")[0].includes(":") ? rawContent.split(":")[0] : "blank"
    const currentTicketTitle = currentTicketLabel != "blank" ? rawContent.split(":")[1].trim() : rawContent
    const currentTicketUrl = rawData.url ? rawData.url : ''

    // states for current ticket values
    // this doesnt work when changing inputs
    // needs to be done instate and added to callback
    const [ticketTitle, updateTicketTitle] = useState(currentTicketTitle);
    const [ticketUrl, updateTicketUrl] = useState(currentTicketUrl);
    const [ticketLabel, updateTicketLabel] = useState(currentTicketLabel);
    const [labelColor, updateLabelColor] = useState(labels[ticketLabel] ? labels[ticketLabel] : false)

    // state for showing or hiding input boxes

    // edit pencil component
    const EditPencil = ({type}) => {
        const newState = {
            ...contextMenuEditables,
            [type]: !contextMenuEditables[[type]]
        }

        return (
            <span className="editPencil" onClick={() => updateAppState("contextMenuEditables", newState)}>
                ✏️
            </span>
        )
    }

    const keyDownHandler = (e, type) => { 
        let value = e.target.value
        if (e.keyCode == 13) {
            e.preventDefault()
            if (value != "") {
                updateAppState('contextMenuEditables', {
                    ...contextMenuEditables,
                    [type]: false
                })

                // prevent labels from being overwritten
                if (type == 'content') {
                    value = ticketLabel + ": " + value
                }

                const storedDataKey = type == 'label' ? 'colors' : 'items'

                updateSpecificData(storedDataKey, type, value)
                toggleContextMenu()
            }
        }
    }

    // style contextBox correctly
    // function to close context menu 
    // if urls dont have http they need to 
    // if no label adds "blank" label

    return (
        
        <div className="contextMenu-outer" style={contextMenuOuterStyles}>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Title<EditPencil type="title"/></p>
                {contextMenuEditables.title
                    ? <form onKeyDown={(e) => keyDownHandler(e, "content")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketTitle(e.target.value)} value={ticketTitle}/></div>
                    </form>
                    : <p>{currentTicketTitle}</p>
                }            
            </div>


            <div className="contextMenu-section">
                <p className="contextMenu-title">URL<EditPencil type="URL"/></p>
                {contextMenuEditables.URL 
                    ? <form onKeyDown={(e) => keyDownHandler(e, "url")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketUrl(e.target.value)} value={ticketUrl}/></div>
                    </form>
                    : <a href={currentTicketUrl}>{currentTicketUrl ? currentTicketUrl : "blank"}</a>
                }
            </div>

            {/* <div className="contextMenu-section">
                <p className="contextMenu-title">Label <EditPencil type="label"/></p>
                {editStates.label
                    ? <form onKeyDown={(e) => keyDownHandler(e, "label")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketLabel(e.target.value)} value={ticketLabel}/></div>
                    </form>
                    : <p>{ticketLabel}</p>
                }
                <span>{labelColor}</span>
            </div> */}
        </div>
    )
}

export default ContextMenu
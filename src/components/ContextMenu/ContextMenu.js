import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useEffect, useState} from 'react'
import '../../App.css';

const ContextMenu = ({x, y, itemId, labels, items, updateSpecificData, toggleContextMenu, contextMenuEditables, updateEditStates}) => {
    const contextMenuOuterStyles = {
        top: y + 'px',
        left: x + 15 + 'px',
    }

    const rawData = items[itemId]
    const rawContent = rawData.content
    const currentTicketLabel = rawContent.split(" ")[0].includes(":") ? rawContent.split(":")[0] : "blank"
    const currentTicketTitle = currentTicketLabel != "blank" ? rawContent.split(":")[1].trim() : rawContent
    const currentTicketUrl = rawData.url ? rawData.url : ''

    const currentTicket = {
        title: currentTicketTitle,
        url: currentTicketUrl,
        label: currentTicketLabel
    }

    // WHY ISNT THIS WORKING...
    // just save the state in states and update via callbacks its dumb but W/E
    const ticketTitle = contextMenuEditables.title
    const ticketUrl = contextMenuEditables.url
    const ticketLabel = contextMenuEditables.label

    // edit pencil component
    const EditPencil = ({type}) => {
        const newState = {
            ...contextMenuEditables,
            [type]: contextMenuEditables[type] != false ? false : currentTicket[type]
        }

        return (
            <span className="editPencil" onClick={() => updateEditStates(newState)}>
                ✏️
            </span>
        )
    }

    const keyDownHandler = (e, type) => { 
        let value = e.target.value
        if (e.keyCode == 13) {
            e.preventDefault()
            if (value != "") {
                updateEditStates({
                    ...editStates,
                    [type]: false
                })

                // prevent labels from being overwritten
                if (type == 'content') {
                    value = ticketLabel + ": " + value
                }

                const storedDataKey = type == 'label' ? 'colors' : 'items'

                console.log(storedDataKey, type, value)
                updateSpecificData(storedDataKey, type, value)
                toggleContextMenu()
            }
        }
    }

    const textChangeHandler = (key, value) => {
        const newContextMenuEditables = JSON.parse(JSON.stringify(contextMenuEditables))
        newContextMenuEditables[key] = value
        console.log(value.value)
        updateAppState('contextMenuEditables', newContextMenuEditables)
    }

    // style contextBox correctly
    // make pencil clickable and not highlightable
    // function to close context menu 

    return (
        <div className="contextMenu-outer" style={contextMenuOuterStyles}>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Title<EditPencil type="title"/></p>
                {ticketTitle
                    ? <form onKeyDown={(e) => keyDownHandler(e, "content")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => textChangeHandler("title", e.target.value)} value={contextMenuEditables.title}/></div>
                    </form>
                    : <p>{ticketTitle}</p>
                }            
            </div>


            <div className="contextMenu-section">
                <p className="contextMenu-title">URL<EditPencil type="URL"/></p>
                {ticketUrl
                    ? <form onKeyDown={(e) => keyDownHandler(e, "url")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => textChangeHandler("url", e.target.value)} value={contextMenuEditables.url}/></div>
                    </form>
                    : <a href={ticketUrl}>{ticketUrl ? ticketUrl : "blank"}</a>
                }
            </div>

            <div className="contextMenu-section">
                <p className="contextMenu-title">Label <EditPencil type="label"/></p>
                {ticketLabel
                    ? <form onKeyDown={(e) => keyDownHandler(e, "label")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => textChangeHandler("label", e.target.value)} value={contextMenuEditables.label}/></div>
                    </form>
                    : <p>{ticketLabel}</p>
                }
                <span>{'blue'}</span>
            </div>
        </div>
    )
}

export default ContextMenu
import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useEffect, useState} from 'react'
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
    const httpRegex = new RegExp("^https?://")
    console.log('is it a url?', httpRegex.test(currentTicketUrl))

    const currentTicket = {
        title: currentTicketTitle,
        url: currentTicketUrl,
        label: currentTicketLabel
    }

    // WHY ISNT THIS WORKING...
    // just save the state in states and update via callbacks its dumb but W/E
    const ticketTitle = contextMenuEditables.title
    const ticketUrl = contextMenuEditables.url
    const isValidUrl = ticketUrl

    
    const ticketLabel = contextMenuEditables.label

    // edit pencil component
    const EditPencil = ({type}) => {
        const newState = {
            ...contextMenuEditables,
            [type]: contextMenuEditables[type] != false ? false : currentTicket[type]
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

                // prevent labels from being overwritten // still overwriting "false" but whatever
                if (type == 'content') {
                    value = ticketLabel !== false ? ticketLabel + ": " + value : value
                }

                const storedDataKey = type == 'label' ? 'colors' : 'items'

                updateSpecificData(storedDataKey, type, value)
                toggleContextMenu()
            }
        }
    }

    const textChangeHandler = (key, value) => {
        const newContextMenuEditables = JSON.parse(JSON.stringify(contextMenuEditables))
        newContextMenuEditables[key] = value
        updateAppState('contextMenuEditables', newContextMenuEditables)
    }

    // style contextBox correctly
    // function to close context menu 
    // if urls dont have http they need to 
    // if no label adds "blank" label

    return (
        
        <div className="contextMenu-outer" style={contextMenuOuterStyles}>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Title<EditPencil type="title"/></p>
                {ticketTitle !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "content")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => textChangeHandler("title", e.target.value)} value={contextMenuEditables.title}/></div>
                    </form>
                    : <p>{currentTicketTitle}</p>
                }            
            </div>


            <div className="contextMenu-section">
                <p className="contextMenu-title">URL<EditPencil type="url"/></p>
                {ticketUrl !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "url")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => textChangeHandler("url", e.target.value)} value={contextMenuEditables.url}/></div>
                    </form>
                    : httpRegex.test(currentTicketUrl) 
                        ? <a href={currentTicketUrl}>{currentTicketUrl ? currentTicketUrl : "blank"}</a>
                        : <p>{currentTicketUrl}</p>
                }
            </div>

            <div className="contextMenu-section">
                <p className="contextMenu-title">Label <EditPencil type="label"/></p>
                {ticketLabel !== false
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
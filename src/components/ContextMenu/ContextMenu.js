import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useEffect, useState} from 'react'
import '../../App.css';

const validUrl = str => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
}

const ContextMenu = ({x, y, itemId, labels, items, updateSpecificData, toggleContextMenu, updateAppState, contextMenuEditables}) => {
    const contextMenuOuterStyles = {
        top: y + 'px',
        left: x + 15 + 'px',
    }

    const rawData = items[itemId]
    const rawContent = rawData.content

    // currently splits at all :
    const currentTicket = {
        label: rawContent.split(" ")[0].includes(":") ? rawContent.split(":")[0] : "", 
        url: rawData.url ? rawData.url : '' , 
        description: rawData.description ? rawData.description : '' 
    }
    currentTicket.title = currentTicket.label != "" ? rawContent.split(":")[1].trim() : rawContent

    // edit pencil component
    const EditPencil = ({type}) => {

        const editPencilHandler = async () => {
            const newState = {
                ...contextMenuEditables,
                [type]: contextMenuEditables[type] !== false ? false : currentTicket[type]
            }

            // figure out maximum size of textarea
            const contextMenuOuter = document.getElementsByClassName('contextMenu-outer')[0]
            let previousWidth = contextMenuOuter.clientWidth
            let padding = document.defaultView.getComputedStyle(contextMenuOuter, "").getPropertyValue('padding').split("px")[0];

            await updateAppState("contextMenuEditables", newState)

            if (document.getElementsByClassName('openEditableTextArea').length > 0){
                const textAreaArray = Array.from(document.getElementsByClassName('openEditableTextArea'))
                for (let textarea of textAreaArray){
                    textarea.style.width = previousWidth - (padding * 2) + "px"
                }
            }
        }

        return <span className="editPencil" onClick={editPencilHandler}>✏️</span>
    }

    const keyDownHandler = (e, type) => { 
        let value = e.target.value
        // if enter key
        if (e.keyCode == 13) {
            e.preventDefault()

            if (value != "") {              

                if (type == 'url'){ value = !(value.startsWith("http://") || value.startsWith("https://")) ? "http://" + value : value }

                // prevent labels from being overwritten // still overwriting "false" but whatever
                if (type == 'content') { value = currentTicket.label != "" ? currentTicket.label + ": " + value : value }

                // update labels as content
                if (type == 'label') {
                    type = 'content'
                    value = value + ": " + currentTicket.title
                }
            }

            // needs to support label colors in future
            const storedDataKey = 'items'

            updateSpecificData(storedDataKey, type, value)

            updateAppState('contextMenuEditables', {
                ...contextMenuEditables,
                [type]: false
            })

            toggleContextMenu()
        }
    }

    const textChangeHandler = (key, value) => {
        const newContextMenuEditables = JSON.parse(JSON.stringify(contextMenuEditables))
        newContextMenuEditables[key] = value
        updateAppState('contextMenuEditables', newContextMenuEditables)
    }

    return (   
        <div className="contextMenu-outer" style={contextMenuOuterStyles}>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Title<EditPencil type="title"/></p>
                {contextMenuEditables.title !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "content")} autoComplete="off">
                        <div><textarea id="currentTicketTitleTextArea" className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler("title", e.target.value)} value={contextMenuEditables.title}/></div>
                    </form>
                    : <p id="currentTicketTitle">{currentTicket.title}</p>
                }            
            </div>
            <div className="contextMenu-section">
                <p className="contextMenu-title">URL<EditPencil type="url"/></p>
                {contextMenuEditables.url !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "url")} autoComplete="off">
                        <div><textarea className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler("url", e.target.value)} value={contextMenuEditables.url}/></div>
                    </form>
                    : validUrl(currentTicket.url) 
                        ? <a style={{overflowWrap: 'anywhere'}}href={currentTicket.url}>{currentTicket.url ? currentTicket.url : ""}</a>
                        : <p>{currentTicket.url}</p>
                }
            </div>
            <div className="contextMenu-section">
                {console.log(contextMenuEditables.description)}
                <p className="contextMenu-title">Description<EditPencil type="description"/></p>
                {contextMenuEditables.description !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "description")} autoComplete="off">
                        <div><textarea className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler("description", e.target.value)} value={contextMenuEditables.description}/></div>
                    </form>
                    :  <p>{currentTicket.description}</p>
                }
            </div>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Label <EditPencil type="label"/></p>
                {contextMenuEditables.label !== false
                    ? <form onKeyDown={(e) => keyDownHandler(e, "label")} autoComplete="off">
                        <div><textarea className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler("label", e.target.value)} value={contextMenuEditables.label}/></div>
                    </form>
                    : <p>{currentTicket.label}</p>
                }
            </div>
        </div>
    )
}

export default ContextMenu
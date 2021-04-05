import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useEffect, useState} from 'react'
import '../../App.css';

const optionalInputTypes = ['URL', 'Description', 'Label']

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
    currentTicket.title = currentTicket.label != "" 
        ? rawContent.substr(rawContent.indexOf(": ") + 2, rawContent.length)
        : rawContent

    // edit pencil component
    const setInputToEditable = async (type) => {
        const newState = {
            ...contextMenuEditables,
            [type]: contextMenuEditables[type] !== false ? false : currentTicket[type]
        }

        console.log(newState)

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
    
    const EditPencil = ({type}) => {
        return <span className="editPencil" onClick={() => setInputToEditable(type)}>✏️</span>
    }

    const keyDownHandler = (e, type) => { 
        let value = e.target.value
        // if enter key
        if (e.keyCode == 13) {
            // in the future some validation that label is one word
            e.preventDefault()

            if (type == 'url'){ 
                value = value == "" ? "" : !(value.startsWith("http://") || value.startsWith("https://")) ? "http://" + value : value 
            }

            if (type == 'content') { 
                value = currentTicket.label != "" ? currentTicket.label + ": " + value : value 
            }

            if (type == "label") {
                type = "content"
                value = value == "" ? currentTicket.title : value + ": " + currentTicket.title
            } 

            // update localStorage
            updateSpecificData('items', type, value)

            // update state
            updateAppState('contextMenuEditables', {
                ...contextMenuEditables,
                [type]: false
            })

            // close the context menu and reset values
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

            {optionalInputTypes.map(type => {
                let capitalizedType = type
                type = type.toLowerCase()
                return (currentTicket[type] !== "" || contextMenuEditables[type] !== false)
                    && <div className="contextMenu-section">
                            <p className="contextMenu-title">{type == 'url' ? 'URL' : capitalizedType}<EditPencil type={type}/></p>
                            {contextMenuEditables[type] !== false
                                ? <form onKeyDown={(e) => keyDownHandler(e, "url")} autoComplete="off">
                                    <div><textarea className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler(type, e.target.value)} value={contextMenuEditables[type]}/></div>
                                </form>
                                : type == "url" 
                                    ? <a style={{overflowWrap: 'anywhere'}}href={currentTicket[type]}>{currentTicket[type] ? currentTicket[type] : ""}</a>  
                                    : <p>{currentTicket[type]}</p>
                            }
                        </div>
                        }
            )}

            {optionalInputTypes.map(type => {
                let capitalizedType = type
                type = type.toLowerCase()
                return !(currentTicket[type] !== "" || contextMenuEditables[type] !== false)
                    && <p onClick={() => setInputToEditable(type)}>➕ {type == 'url' ? 'URL' : capitalizedType}</p>     
                }
            )}

        </div>
        

    )

    // return (   
    //     <div className="contextMenu-outer" style={contextMenuOuterStyles}>
    //         <div className="contextMenu-section">
    //             <p className="contextMenu-title">Title<EditPencil type="title"/></p>
    //             {contextMenuEditables.title !== false
    //                 ? <form onKeyDown={(e) => keyDownHandler(e, "content")} autoComplete="off">
    //                     <div><textarea id="currentTicketTitleTextArea" className="h-100 text-center openEditableTextArea" type="textArea" onChange={e => textChangeHandler("title", e.target.value)} value={contextMenuEditables.title}/></div>
    //                 </form>
    //                 : <p id="currentTicketTitle">{currentTicket.title}</p>
    //             }            
    //         </div>
    //         <ContextMenuSection type="url" key="url"/>
    //         <ContextMenuSection type="description"/>
    //         <ContextMenuSection type="label"/>
            
    //     </div>
    // )
}

export default ContextMenu
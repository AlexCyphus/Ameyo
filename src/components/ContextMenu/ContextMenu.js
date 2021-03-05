const ContextMenu = ({x, y}) => {
    const contextMenuOuterStyles = {
        top: y + 'px',
        left: x + 15 + 'px',
    }
    return (
        <>           
            <div className="contextMenu-outer" style={contextMenuOuterStyles}>
                <p>✏️ Edit ticket</p>
                <p>🗑 Delete ticket</p>
                <p>🏷 Change label</p>
            </div>
        </>
    )
}

export default ContextMenu
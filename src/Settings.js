import React from 'react'

export default class Settings extends React.Component {
    render(){
        return (
            <div className={this.props.settingsState === true ? "fullscreen-popup d-flex" : "d-none"}>
                <p className="close-popup" onClick={this.props.settingsClose}>x</p>
                <p className="m-auto coming-soon">{this.props.className}Settings coming soon...</p>
            </div>
        )
    }
}


//

import React from 'react'

export default class Settings extends React.Component {
    render(){
        console.log(this.props.settingsState)
    return (
        <div className={this.props.settingsState == true ? "fullscreen-popup d-flex" : "fullscreen-popup d-none"}>
            <p className="close-popup" onClick={this.props.settingsClose}>x</p>
            <p className="m-auto coming-soon">{this.props.className}coming soon...</p>
        </div>
    )
    }
}


//

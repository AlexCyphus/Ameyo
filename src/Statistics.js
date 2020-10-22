import React from 'react'

export default class Statistics extends React.Component {
    render(){
        return (
            <div className={this.props.statisticsState == true ? "fullscreen-popup d-flex" : "d-none"}>
                <p className="close-popup" onClick={this.props.statisticsClose}>x</p>
                <p className="m-auto coming-soon"></p>
            </div>
        )
    }
}


//

import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'

// incomplete data object for chart
// filled in by analyzeHistory()
var data = {
    labels: Array.from({length: 30}, (_, i) => i - 30),
    datasets: [
        {
            label: 'x',
            fill: true,
            backgroundColor: 'green',
            lineTension: 0.1,
            borderColor: 'green',                
            pointRadius: 0,
            data: []
        }
    ]
};

// settings for completed ticket chart
const chartConfig = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            ticks: {
                fontColor: "#fff",
                stepSize: 1
            }}],
        yAxes: [{
            ticks: {
                fontColor: "#fff",
                stepSize: 1,
                min: 0
            },
        }]
    },
    legend: {
        display: false
    }    
}

// incomplete arrays
var individualCounts = Array.from({length: 30}, (_, i) => 0)
var summatedTickets = []

class HabitChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.analyzeHistory(this.props.history)
        }
        this.analyzeHistory = this.analyzeHistory.bind(this)
        
    }    

    analyzeHistory = (historyArr) => {
        let thirtyDaysAgo = new Date().getTime() - 2592000000
        // filtering for only the ones in the last thirty days
        historyArr = historyArr.filter(item => new Date(item[1]) > thirtyDaysAgo);

        // pushing the daily counts to individual counts
        historyArr = historyArr.forEach(item => {
            let daysSince = Math.floor((new Date() - new Date(item[1])) / 1000 / 60 / 60 / 24) - 1
            individualCounts[daysSince] = individualCounts[daysSince] + 1
        })

        // summing the counts across the days (can + should probably be done in the last loop)
        var sum = 0
        individualCounts.reverse().forEach((item) => {
            sum += item
            summatedTickets.push(sum)
        })

        // make incomplete data object complete
        data.datasets[0].data = summatedTickets
    }
            
    render(){
        return (
            <div className='charts m-auto text-white'>
                <div className='habit-chart'>
                    <Line 
                        data={data} 
                        options={chartConfig}
                    />
                </div>
            </div>
        )
    }
}

export default HabitChart;
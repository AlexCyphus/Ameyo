import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'

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
            data: [1,2,3,4]
        }
    ]
};

const chartConfig = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{ticks: {fontColor: "#fff"}}],
        yAxes: [{
            ticks: {
                fontColor: "#fff",
                
            },
        }]
    },
    legend: {
        display: false,
        position: 'bottom',
        labels: {
            fontColor: "#fff"
        }
    }
    
}

var thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
var itemDate = new Date(itemDate)
var today = new Date()
var individualCounts = Array.from({length: 30}, (_, i) => 0)
var summatedTickets = []



class HabitChart extends Component {
    constructor(props){
        super(props);
        this.analyzeHistory = this.analyzeHistory.bind(this);
    }

    analyzeHistory = (historyArr) => {
        // check if less than 30 days old 
        historyArr = historyArr.filter(item => {return new Date(item[1]) > thirtyDaysAgo});
        historyArr = historyArr.filter(item => {
            let daysSince = Math.floor((new Date() - new Date(item[1])) / 1000 / 60 / 60 / 24)
            individualCounts[daysSince] = individualCounts[daysSince] + 1
        })
        var sum = 0
        individualCounts.map((item) => {
            sum += item
            summatedTickets.push(sum)
        })
        console.log('individual counts', individualCounts)
        console.log('is this it', data.datasets[0].data)
        data.datasets[0].data = summatedTickets
    }

    componentDidMount(){
        this.analyzeHistory(this.props.history)
        console.log(data)
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
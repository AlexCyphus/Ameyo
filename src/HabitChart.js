import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'

// incomplete data object
var data = {
    labels: Array.from({length: 30}, (_, i) => i - 30),
    datasets: []
};

// chart settings
const chartConfig = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{ticks: {fontColor: "#fff"}}],
        yAxes: [{
            ticks: {
                fontColor: "#fff",
                max: 30
            },
        }]
    },
    legend: {
        position: 'top',
        labels: {
            fontColor: "#fff",
            boxWidth: 10,
            fontSize: 12
        }
    }
    
}

class HabitChart extends Component {
    constructor(props){
        super(props);
        var habitsSum =  JSON.parse(localStorage.getItem('monthlyHabitsSum')) ? JSON.parse(localStorage.getItem('monthlyHabitsSum')) : {}
        this.state = {
            monthlyHabitsCount: JSON.parse(localStorage.getItem('monthlyHabitsCount')),
            monthlyHabitsSum: habitsSum
        };
        this.calculateSums = this.calculateSums.bind(this);
    }

    summateArr = (arr) => {
        var sumArr = Array.from({length: 30}, (_, i) => 0);
        var sum = 0;
        for (var x = arr.length - 1 ; x > -1; x--){
            if (arr[x] === 1){sum++}
            sumArr[x] = sum;
        }
        // console.log('og arr', arr)
        // console.log('reverse sum arr', sumArr.reverse())
        return sumArr.reverse()
    }

    calculateSums(){
        // prep habits data 

        var newState = {...this.state}

        for (var habit in newState.monthlyHabitsCount){
            console.log(habit, newState.monthlyHabitsCount[habit])
            var sumArr = this.summateArr(newState.monthlyHabitsCount[habit])
            newState.monthlyHabitsSum[habit.toString()] = sumArr;
        }

        this.setState(newState)
    }

    componentDidMount(){
        this.calculateSums()
        this.generateDatasets()
    }

    generateDatasets() {
        var colors = ['rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)', 'rgba(255,255,0,1)', 'rgba(0,255,255,1)', 'rgba(255,0,255,1)', 'rgba(192,192,192,1)', 'rgba(255,255,255,1)']
        var counter = 0
        for (var item in this.state.monthlyHabitsSum){
            let itemArr = this.state.monthlyHabitsSum[item]

            let dataset = {
                label: item,
                lineTension: 0.1,
                borderColor: colors[counter],                
                pointRadius: 0,
                data: itemArr,
                fill: true,
                backgroundColor: colors[counter]
            }
            data.datasets.push(dataset)
            if (counter >= colors.length - 1){
                counter = 0
            }
            else (counter++)
        }
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
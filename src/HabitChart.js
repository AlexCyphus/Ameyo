import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'

var colors = ['rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)', 'rgba(255,255,0,1)', 'rgba(0,255,255,1)', 'rgba(255,0,255,1)', 'rgba(192,192,192,1)', 'rgba(255,255,255,1)']

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
        this.state = {
            monthlyHabitsCount: JSON.parse(localStorage.getItem('monthlyHabitsCount')),
            monthlyHabitsSum: {},
            data: {labels: Array.from({length: 30}, (_, i) => i - 30),datasets: []}
        };
        this.calculateSums = this.calculateSums.bind(this);
    }

    // counts how many of the last 30 days the habit was completed
    summateArr = (arr) => {
        var sumArr = Array.from({length: 30}, (_, i) => 0);
        var sum = 0;
        for (var x = arr.length - 1 ; x > -1; x--){
            if (arr[x] === 1){sum++}
            sumArr[x] = sum;
        }
        return sumArr.reverse()
    }

    calculateSums(){
        // prep habits data 
        var newState = {...this.state}

        for (var habit in newState.monthlyHabitsCount){
            var sumArr = this.summateArr(newState.monthlyHabitsCount[habit])
            newState.monthlyHabitsSum[habit.toString()] = sumArr;
        }

        this.setState(newState)
    }

    componentDidMount(){
        if (Object.keys(this.state.monthlyHabitsSum).length === 0){
            this.calculateSums()
            this.generateDatasets()
        }
    }

    generateDatasets() {

        // sort keys by monthlyHabitsSum
        const monthlyHabitsSumCopy = this.state.monthlyHabitsSum = JSON.parse(JSON.stringify(this.state.monthlyHabitsSum))
        let orderedKeys = []

        for (var key in monthlyHabitsSumCopy) {
           orderedKeys.push([ key, monthlyHabitsSumCopy[key][29]]);
        }

        orderedKeys.sort((a, b) => a[1] - b[1])

        orderedKeys = orderedKeys.reduce((acc, val) => {
            console.log(acc)
            acc.push(val[0])
            return acc
        }, [])
        
        console.log(orderedKeys)

        // orderedKeys.reduce((acc, val, index) => {
        //     console.log(acc[index])
        //     return acc[index] = val[0]
        // }, new Array())
        
        var counter = 0
        for (var item of orderedKeys){
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

            // update data with up to date chart info
            let newData = Object.create(this.state.data)
            newData.datasets.push(dataset)
            this.setState({data: newData})

            // cycle through colors if too many habits
            if (counter >= colors.length - 1){counter = 0}
            else (counter++)
        }
    }

    render(){
        return (
            <div className='charts m-auto text-white'>
                <div className='habit-chart'>
                    <Line 
                        data={this.state.data} 
                        options={chartConfig}
                    />
                </div>
            </div>
        )
    }
}

export default HabitChart;
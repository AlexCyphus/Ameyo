import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'
import states from './states';

const data = {
    labels: Array.from({length: 30}, (_, i) => i - 30),
    datasets: [
      {
        label: 'My First dataset',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 0,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  };


  var chartConfig = {
    type: 'line',
    options: {
        elements: {
            point:{
                radius: 0
            }
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
        var sumArr = [];
        var sum = 0;
        for (var x = arr.length - 1 ; x > -1; x--){
            if (arr[x] == 1){sum++}
            sumArr.unshift(sum)
        }
        return sumArr
    }

    calculateSums(){
        // prep habits data 

        var newState = {...this.state}

        for (var habit in this.state.monthlyHabitsCount){
            var sumArr = this.summateArr(this.state.monthlyHabitsCount[habit])
            newState.monthlyHabitsSum[habit.toString()] = sumArr;
        }

        this.setState(newState)
    }

    componentDidMount(){
        this.calculateSums()
    }

    render(){
        return (
            <div className='chart m-auto text-white w-100'>
                <div className='w-100'>
                    <h2>Habits (30 Days)</h2>
                    <Line chartConfig data={data}/>
                </div>
            </div>
        )
    }
}

export default HabitChart;
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import APIManager from '../Module/APIManager'

const LineChart = (props) => {
    // const TotalTipsInMonth = props.tips.reduce((acc, tips) => acc + tips.amount, 0)
    const totalTipsByEachMonth = []

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', "September", "October", "November", "December"],
        dataSets: [
            {
                label: 'Tips by the Month',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: totalTipsByEachMonth
            }
        ]
    }
    return(
        <Line data={data} />
    )
}
export default class Total extends Component {

    state = {
        tips: []
    }

    componentDidMount() {
        APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((tips) => {
                const sortTips = tips.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d1 - d2
                })
                this.setState({
                    tips: sortTips
                })
            })
    }
    render() {
        return (
            <div>
                <h2>Tips Chart for the Year</h2>
                <LineChart tips={this.tips} />
            </div>
        );
    }
}


import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import APIManager from '../Module/APIManager'


export default class Total extends Component {
    
    state = {
        tips: [],
        data: {
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
                   data: []
               }
           ]
       },
       month: {},
    }

    // addingMonths=(year, month)=>{
    //     const amount = this.state.month
    //     amount.filter(months => {
    //         if(months[year][month]===[2019][12]){
    //             console.log("this worked")
    //         }
    //     })
    // }

    componentDidMount() {
        APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((tips) => {
                const sortTips = tips.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d1 - d2
                })
                let byYearAndByMonth = {};
                const monthDate = tips.filter(function(tips){
                const year = tips.date.substring(0,4)
                let month = tips.date.substring(5,7)

                if(typeof byYearAndByMonth[year] === "undefined"){
                    byYearAndByMonth[year] = {}
                }
                if(typeof byYearAndByMonth[year][month]==="undefined"){
                    byYearAndByMonth[year][month]=[]
                }
                byYearAndByMonth[year][month].push(tips)
                Object.keys(byYearAndByMonth).map(function(year) {
                    Object.keys(byYearAndByMonth[year]).map(function(month) {
                        console.log(month, byYearAndByMonth[year][month]);
               })
            })
             })
             console.log(byYearAndByMonth)
                this.setState({
                    tips: sortTips,
                    month:monthDate,
                })
            })
    }
    render() {
        return (
            <div>
                <h2>Tips Chart for the Year</h2>
                <Line data={this.state.data} />
            </div>
        );
    }
}


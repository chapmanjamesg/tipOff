import React, { Component } from 'react'
import APIManager from '../Module/APIManager'
import TipCard from './TipCard'


class TipList extends Component {

    state = {
        tips: [],
    }

    componentDidMount() {
        APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((tips) => {
                const sortTips = tips.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d2 - d1
                })
                this.setState({
                    tips: sortTips
                })
            })
    }

    deleteTip = id => {
        APIManager.delete("tips", id)
            .then(() => {
                APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
                    .then((newTips) => {
                        this.setState({
                            tips: newTips
                        })
                    })
            })
    }

    render() {
        return (
            <>
                <button 
                    className="fl w-100 b"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/tips/new")
                    }}>
                    Add New Tip
                    </button>
                <hr />
                <div className="tc">
                    <h2>Tip Tracker</h2>
                    {this.state.tips.map(tip =>
                        <TipCard
                            key={tip.id}
                            tip={tip}
                            deleteTip={this.deleteTip}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default TipList
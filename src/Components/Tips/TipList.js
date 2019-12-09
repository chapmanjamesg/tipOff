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
                this.setState({
                    tips: tips
                })
            })
    }

    deleteTip = id => {
        APIManager.delete("tips", id)
            .then(() => {
                APIManager.getAll("tips")
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
                <div
                    onClick={() => {
                        this.props.history.push("/tips/new")
                    }}>
                    Add New Tip
                    </div>
                <hr />
                <div>
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
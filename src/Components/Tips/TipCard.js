import React, { Component } from 'react';


class TipCard extends Component {

    render() {
        return (
            <div className="card pa3 fl w-50">
                <div className="fl ba bg-light-gray">
                    <p className="tr ma2"><span className="card-tipDate">{this.props.tip.date}</span></p>
                    <div className="green tl ml3 b">Amount: <span className="card-tipAmount green">${this.props.tip.amount}</span></div>
                    <div className="blue tl ml3 b">Hours:  <span className="card-tipHours blue">{this.props.tip.hours}</span></div>
                    <button 
                        className="br-pill grow b fl w-30 tc bg-white ml3 mb2 mr2 mt2"
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/tips/${this.props.tip.id}/edit`)}}>
                                Edit</button>
                    <button 
                        className="br-pill grow b fl w-50 tc bg-white mt2"
                        type="button"
                        onClick={() => 
                            this.props.deleteTip(this.props.tip.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default TipCard
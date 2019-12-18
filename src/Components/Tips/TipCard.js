import React, { Component } from 'react';


class TipCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h5>Date: <span className="card-tipDate">{this.props.tip.date}</span></h5>
                    <p>Amount: <span className="card-tipAmount">${this.props.tip.amount}</span></p>
                    <p>Hours:  <span className="card-tipHours">{this.props.tip.hours}</span></p>
                    <button 
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/tips/${this.props.tip.id}/edit`)}}>
                                Edit Tip</button>
                    <button 
                        type="button"
                        onClick={() => 
                            this.props.deleteTip(this.props.tip.id)}>Remove Tip</button>
                </div>
            </div>
        )
    }
}

export default TipCard
import React, { Component } from 'react';

class TipCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h2>Tip Tracker</h2>
                    <h3>Date: <span className="card-tipDate">{this.props.tips.date}</span></h3>
                    <p>Amount: <span className="card-tipAmount">${this.props.tips.amount}</span></p>
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
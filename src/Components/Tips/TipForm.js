import React, { Component } from 'react'
import APIManager from '../Module/APIManager'

class TipForm extends Component {

    state = {
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        date: "",
        amount: "",
        hours: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewTip = evt => {
        evt.preventDefault();
        if (this.state.tips === "") {
            window.alert("Please enter a tip!")
        } else {
            this.setState({ loadingStatus: true })
            const tip = {
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                date: this.state.date,
                amount: Number(this.state.amount),
                hours: Number(this.state.hours)
            }
            APIManager.post("tips", tip)
                .then(() =>
                    this.props.history.push("/tips"));
        }
    }

    updateExistingTip = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTip = {
            id: this.props.match.params.tipId,
            userId: JSON.parse(localStorage.getItem("credentials")).userId,
            amount: Number(this.state.amount),
            date: this.state.date,
            hours: this.state.hours
        };

        APIManager.put("tips", this.props.match.params.tipId, editedTip)
            .then(() => this.props.history.push("/tips"))
    };

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get("tips", this.props.match.params.tipId)
                .then(tip => {
                    this.setState({
                        amount: tip.tip,
                        loadingStatus: false,
                    })
                })
        }
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <label htmlFor="date">Date:
                        <input
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="date"
                                value={this.state.date}
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="amount">Amount:
                        <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="amount"
                                placeholder="Your Tipped Amount"
                                value={this.state.amount}
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="hours">Hours:
                        <input
                                type="number"
                                required
                                onChange={this.handleFieldChange}
                                id="hours"
                                placeholder="How Many Hours"
                                value={this.state.hours}
                            />
                        </label>
                    </fieldset>
                    <button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.props.isNew ? this.constructNewTip : this.updateExistingTip}
                    >Submit</button>
                </form>
            </>
        )
    }
}

export default TipForm
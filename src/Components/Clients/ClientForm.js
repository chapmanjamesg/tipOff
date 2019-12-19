import React, { Component } from 'react'
import APIManager from '../Module/APIManager'

class ClientForm extends Component {

    state = {
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        name: "",
        notes: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewClient = evt => {
        evt.preventDefault();
        if (this.state.client === "") {
            window.alert("Please enter a Client!")
        } else {
            this.setState({ loadingStatus: true })
            const client = {
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                name: this.state.name,
                notes: this.state.notes,
            }
            APIManager.post("clients", client)
                .then(() =>
                    this.props.history.push("/clients"));
        }
    }

    updateExistingClient = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedClient = {
            id: this.props.match.params.clientId,
            userId: JSON.parse(localStorage.getItem("credentials")).userId,
            name: this.state.name,
            notes: this.state.notes,
           
        };

        APIManager.put("clients", this.props.match.params.clientId, editedClient)
            .then(() => this.props.history.push("/clients"))
    };

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get("clients", this.props.match.params.clientId)
                .then(client => {
                    this.setState({
                        client: client.client,
                        loadingStatus: false,
                    })
                })
        }
    }

    render() {
        return (
            <>
                <form className="tc">
                    <h3 className="tc pt6">Clients</h3>
                    <fieldset>
                        <label className="pt4 pr2" htmlFor="name">Name:</label>
                        <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="name"
                                placeholder="The Client's Name"
                                value={this.state.name}
                            />
                    </fieldset>
                    <fieldset className="pt2">
                        <label className="pr2" htmlFor="notes">Notes:</label>
                        <textarea
                                type="textarea"
                                required
                                onChange={this.handleFieldChange}
                                id="notes"
                                placeholder="Notes About The Client"
                                value={this.state.notes}
                            />
                    </fieldset>
                    <button
                        className="br-pill"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.props.isNew ? this.constructNewClient : this.updateExistingClient}
                    >Submit</button>
                </form>
            </>
        )
    }
}

export default ClientForm
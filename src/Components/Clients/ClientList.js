import React, { Component } from 'react'
import APIManager from '../Module/APIManager'
import ClientCard from './ClientCard'


class ClientList extends Component {

    state = {
        clients: [],
    }

    componentDidMount() {
        APIManager.getAll(`clients?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((clients) => {
                this.setState({
                    clients: clients
                })
            })
    }

    deleteClient = id => {
        APIManager.delete("clients", id)
            .then(() => {
                APIManager.getAll(`clients?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
                    .then((newClients) => {
                        this.setState({
                            clients: newClients
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
                        this.props.history.push("/clients/new")
                    }}>
                    Add New Client
                    </button>
                <hr />
                <div className="tc">
                    <h2>Important Clients</h2>
                    {this.state.clients.map(client =>
                        <ClientCard
                            key={client.id}
                            client={client}
                            deleteClient={this.deleteClient}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ClientList
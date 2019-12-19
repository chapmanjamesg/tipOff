import React, { Component } from 'react'

class ClientCard extends Component {

    render() {
        return (
            <div className="card pa3">
                <div className="fl ba tc bg-light-gray">
                    <h5>Name: <span className="card-clientName">{this.props.client.name}</span></h5>
                    <p>Notes: <span className="card-clientNote">{this.props.client.notes}</span></p>
                    <button 
                        className="br-pill grow b fl w-50 tc bg-white"
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/clients/${this.props.client.id}/edit`)}}>
                                Edit Client</button>
                    <button 
                        className="br-pill grow b fl w-50 tc bg-white"
                        type="button"
                        onClick={() => 
                            this.props.deleteClient(this.props.client.id)}>Delete Client</button>
                </div>
            </div>
        )
    }
}

export default ClientCard
import React, { Component } from 'react'

class ClientCard extends Component {

    render() {
        return (
            <div className="card pa3">
                <div className="fl ba tc bg-light-gray">
                    <h5><span className="card-clientName">{this.props.client.name}</span></h5>
                    <p><span className="card-clientNote">{this.props.client.notes}</span></p>
                    <button 
                        className="br-pill grow b fl w-25 tc bg-white ml5 mb2 mr2 mt2"
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/clients/${this.props.client.id}/edit`)}}>
                                Edit</button>
                    <button 
                        className="br-pill grow b fl w-40 tc bg-white mt2"
                        type="button"
                        onClick={() => 
                            this.props.deleteClient(this.props.client.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default ClientCard
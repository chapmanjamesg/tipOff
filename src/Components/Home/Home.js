import React, { Component } from 'react';
import APIManager from '../Module/APIManager'
import TipCard from '../Tips/TipCard';
import NoteCard from '../Notes/NoteCard';

class Home extends Component {
    state = {
        tips: [],
        notes: [],
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    deleteNote = id => {
        APIManager.delete("notes", id)
            .then(() => {
                APIManager.getAll(`notes?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
                    .then((newNotes) => {
                        this.setState({
                            notes: newNotes
                        })
                    })
            })
    }

    deleteTip = id => {
        APIManager.delete("tips", id)
            .then(() => {
                APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
                    .then((newTips) => {
                        this.setState({
                            Tips: newTips
                        })
                    })
            })
    }

    componentDidMount() {
        APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}&_limit=3`)
            .then((tips) => {
                const sortTips = tips.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d2 - d1
                })
                this.setState({
                    tips: sortTips
                })
            })
        APIManager.getAll(`notes?userId=${JSON.parse(localStorage.getItem("credentials")).userId}&_limit=2`)
            .then((notes) => {
                const sortNotes = notes.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d2 - d1
                })
                this.setState({
                    notes: sortNotes
                })
            })
    }

    render() {
        return (
            <>
                <h2 className="tc">Recent Tips</h2>
                <div className="tc">
                    {this.state.tips.map(tip =>
                        <TipCard

                            key={tip.id}
                            tip={tip}
                            deleteTip={this.deleteTip}
                            {...this.props}
                        />
                    )}
                </div>
                <hr />
                <button
                    className="fl w-100"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/tips/new")
                    }}>
                    Add New Tip
                            </button>
                <br />
                <br />
                    <h2 className="tc">Recent Notes</h2>
                <div className="tc">
                    {this.state.notes.map(note =>
                        <NoteCard
                            key={note.id}
                            note={note}
                            deleteNote={this.deleteNote}
                            {...this.props}
                        />
                    )}
                </div>
                <hr />
                <button
                    className="fl w-100"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/notes/new")
                    }}>
                    Add New Note
                    </button>
            </>
        )
    }
}

export default Home
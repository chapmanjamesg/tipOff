import React, { Component } from 'react'
import APIManager from '../Module/APIManager'
import NoteCard from './NoteCard'


class NoteList extends Component {

    state = {
        notes: [],
    }

    componentDidMount() {
        APIManager.getAll(`notes?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((notes) => {
                const sortNotes = notes.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d1 - d2
                })
                this.setState({
                    notes: sortNotes
                })
            })
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

    render() {
        return (
            <>
                <button
                    className="fl w-100 b"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/notes/new")
                    }}>
                    Add New Note
                    </button>
                <hr />
                <h2 className="tc">Important Notes</h2>
                <div className="">
                    {this.state.notes.map(note =>
                        <NoteCard
                            key={note.id}
                            note={note}
                            deleteNote={this.deleteNote}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default NoteList
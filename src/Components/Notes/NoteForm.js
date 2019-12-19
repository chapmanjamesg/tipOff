import React, { Component } from 'react'
import APIManager from '../Module/APIManager'

class NoteForm extends Component {

    state = {
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        date: "",
        note: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewNote = evt => { 
        evt.preventDefault();
        if (this.state.notes === "") {
            window.alert("Please enter a note!")
        } else {
            this.setState({ loadingStatus: true })
            const note = {
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                date: this.state.date,
                note: this.state.note,
            }
            APIManager.post("notes", note)
                .then(() =>
                    this.props.history.push("/notes"));
        }

    }
    updateExistingNote = evt => {
        evt.preventDefault();
        this.setState({ loadingStatus: true })
        const editedNote = {
            id: this.props.match.params.noteId,
            userId: JSON.parse(localStorage.getItem("credentials")).userId,
            note: this.state.note,
            date: this.state.date,
        }
        APIManager.put("notes", this.props.match.params.noteId, editedNote)
            .then(() => this.props.history.push("/notes"))
    }

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get("notes", this.props.match.params.noteId)
                .then(note => {
                    this.setState({
                        note: note.note,
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
                        <label htmlFor="note">Note:
                        <textarea
                                type="textarea"
                                required
                                onChange={this.handleFieldChange}
                                id="note"
                                placeholder="Your Note"
                                value={this.state.note}
                            />
                        </label>
                    </fieldset>
                    <button
                        className="br-pill"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.props.isNew ? this.constructNewNote : this.updateExistingNote}
                    >Submit</button>
                </form>
            </>
        )
    }
}
export default NoteForm
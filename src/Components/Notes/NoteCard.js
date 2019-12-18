import React, { Component } from 'react'

class NoteCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h5>Date: <span className="card-noteDate">{this.props.note.date}</span></h5>
                    <p>Note: <span className="card-note">{this.props.note.note}</span></p>
                    <button 
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/notes/${this.props.note.id}/edit`)}}>
                                Edit Note</button>
                    <button 
                        type="button"
                        onClick={() => 
                            this.props.deleteNote(this.props.note.id)}>Delete Note</button>
                </div>
            </div>
        )
    }
}

export default NoteCard
import React, { Component } from 'react'

class NoteCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h2>Notes for the Day</h2>
                    <h3>Date: <span className="card-noteDate">{this.props.note.date}</span></h3>
                    <p>Note: <span className="card-note">{this.props.note.note}</span></p>
                    <button 
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/notes/${this.props.note.id}/edit`)}}>
                                Edit Tip</button>
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
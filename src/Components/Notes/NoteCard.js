import React, { Component } from 'react'

class NoteCard extends Component {

    render() {
        return (
            <div className="card pa3">
                <div className="fl ba tc bg-light-gray">
                    <p className="tr ma2"><span className="card-noteDate">{this.props.note.date}</span></p>
                    <p className="b"><span className="card-note">{this.props.note.note}</span></p>
                    <button 
                        className="br-pill grow b fl w-25 tc bg-white mr2 mb2 ml5"
                        type="button"
                        onClick={() => {
                            this.props.history.push(`/notes/${this.props.note.id}/edit`)}}>Edit</button>
                    <button 
                        className="br-pill grow b fl w-40 tc bg-white"
                        type="button"
                        onClick={() => 
                            this.props.deleteNote(this.props.note.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default NoteCard
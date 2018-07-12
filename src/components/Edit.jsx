import React, { Component }  from 'react'


class Edit extends Component{
    render() {
        return(
        <form id='editForm' onSubmit={this.props.handleSubmit}>
        <h3>Edit a snippet</h3>
            <label>
                <textarea rows="4" cols="50" name='snippet' type='text' placeholder={this.props.snippet} handleChange={this.props.handleChange}></textarea>
            </label>
            <input type='submit' onClick={this.props.editCheatsheet}/>
        </form>
        )
    }
}

export default Edit

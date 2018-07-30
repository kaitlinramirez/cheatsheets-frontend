import React, { Component }  from 'react'


class Edit extends Component{
    render() {
        return(
        <form id={this.props.editId} onSubmit={this.props.editCheatsheet}>
        <h3>Edit a snippet</h3>
            <label>
                <textarea rows="4" cols="50" name='snippet' type='text' placeholder={this.props.snippet} onChange={this.props.handleChange} ></textarea>
            </label>
            <input type='submit'/>
        </form>
        )
    }
}

export default Edit

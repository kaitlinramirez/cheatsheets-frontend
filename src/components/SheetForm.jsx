import React, { Component } from 'react'

class SheetForm extends Component {

  render(props) {
    return (
      <div id="form">
        <h3>Add a Cheatsheet</h3>
        <form className="sheetform" id="sheetform">
          <label htmlFor="title">Name</label>
          <input onChange={this.props.handleChange} value={this.props.name} type="text" name="name" />
          <label htmlFor="snippet">Snippet</label>
          <textarea rows="4" cols="50" onChange={this.props.handleChange} value={this.props.snippet} type="text" name="snippet" ></textarea>
          <label htmlFor="description">Description</label>
          <input onChange={this.props.handleChange} value={this.props.description} type="text" name="description" />
          <button onClick={this.props.addCheatsheet}>Submit</button>
        </form>
      </div>
    )
  }
}

export default SheetForm;

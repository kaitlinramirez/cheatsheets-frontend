import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header.jsx'
import SheetList from './components/SheetList.jsx'
import SheetForm from './components/SheetForm.jsx'
import Edit from './components/Edit'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      load: false,
      id:'',
      name: '',
      snippet: '',
      description: ''
    }
  }

  componentDidMount() {
    fetch('https://cheetsheets.herokuapp.com/sheets')
      .then(response => response.json())
      .then(sheets => {
        console.log(sheets)
        this.setState({
          data: sheets,
          load: true
        })
      })
      this.handleChange = this.handleChange.bind(this)
      this.addCheatsheet = this.addCheatsheet.bind(this)
      this.deleteCheatsheet = this.deleteCheatsheet.bind(this)
  }

  handleChange (event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

  addCheatsheet = (event) => {
      event.preventDefault()
      var newId = this.state.data.cheatsheets.length + 1
      fetch(('https://cheetsheets.herokuapp.com/sheets'), {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
          id: newId,
          name: this.state.name,
          snippet: this.state.snippet,
          description: this.state.description
        })
      })
    }

    deleteCheatsheet = (event) => {
      event.preventDefault()
      var editId = event.target.id
      console.log(editId)
      let deleteUrl = `https://cheetsheets.herokuapp.com/sheets/${editId}`
      fetch(deleteUrl, {
        method: "DELETE",
        headers: new Headers({"content-type": "application/json"})
      })
      .then(alert('deleted'))
    }

    editCheatsheet = (event) => {
      event.preventDefault()
      var editId = event.target.id
      console.log(editId)
      var PUTurl = `https://cheetsheets.herokuapp.com/sheets/${editId}`
      fetch(PUTurl, {
        method: "PUT",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
          snippet: this.state.snippet
        })
      })
      .then(response => response.json())
      .then(data => {
        alert('Thanks for the edit!')
      })
    }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              {this.state.load &&
              <div id="sheetBody">
                <Route exact path='/' component={() => <SheetList list={this.state.data} editCheatsheet={this.editCheatsheet} deleteCheatsheet={this.deleteCheatsheet} deleteId={this.state.deleteId}/>} />
                <Route exact path='/' render={() => <SheetForm handleChange={this.handleChange} addCheatsheet={this.addCheatsheet}/>} />
                <Route exact path='/Edit' render={() => <Edit handleChange={this.handleChange} snippet={this.state.snippet} editCheatsheet={this.editCheatsheet}/>} />
              </div>
              }
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

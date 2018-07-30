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
      sent: false,
      id:'',
      name: '',
      snippet: '',
      description: ''
    }
  }

  componentDidMount() {
    this.fetchData()
      this.handleChange = this.handleChange.bind(this)
      this.addCheatsheet = this.addCheatsheet.bind(this)
      this.deleteCheatsheet = this.deleteCheatsheet.bind(this)
      this.getEditId = this.getEditId.bind(this)
  }

  handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

  fetchData = () => {
    fetch('https://cheetsheets.herokuapp.com/sheets')
      .then(response => response.json())
      .then(sheets => {
        console.log(sheets)
        this.setState({
          data: sheets,
          load: true
        })
      })
  }

  addCheatsheet = (event) => {
      event.preventDefault()
      fetch(('https://cheetsheets.herokuapp.com/sheets'), {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
          name: this.state.name,
          snippet: this.state.snippet,
          description: this.state.description
        })
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.fetchData()
        console.log(response)
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
      .then(response => {
        this.fetchData()
      })
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
    }

    getEditId = (id) => {
      this.setState({
        editId: id
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
                <Route exact path='/' component={() => <SheetList list={this.state.data} editCheatsheet={this.editCheatsheet} deleteCheatsheet={this.deleteCheatsheet} getEditId={this.getEditId}/>} />
                <Route exact path='/' render={() => <SheetForm handleChange={this.handleChange} addCheatsheet={this.addCheatsheet}/>} />
                <Route exact path='/Edit' render={() => <Edit handleChange={this.handleChange} snippet={this.state.snippet} editCheatsheet={this.editCheatsheet} editId={this.state.editId}/>} />
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

import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    newToy: {
      name: "",
      image: "",
      likes: 0
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/toys`)
      .then(response => response.json())
      .then(json => this.setState({toys:json}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleChange = (e) => {
    this.setState({
      newToy: {...this.state.newToy, [e.target.name]: e.target.value}
    })
  }

  handleSubmit = (e) => {
    const newToy = this.state.newToy
    console.log(newToy)
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(newToy)
      })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
      })
      .then(response => response.json())
      this.componentDidMount()
  }

  handleLike = (id) => {
    let updatedToy = this.state.toys.find(toy => toy.id === id)
    updatedToy.likes+=1
    console.log("Inside the handleLike", updatedToy)
    fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedToy)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      this.setState({
        toys: this.state.toys.map(toy => toy.id === id ? updatedToy : toy )
      })
  }

  render(){
    console.log(this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm 
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            newToy={this.state.newToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
          handleLike={this.handleLike}
          handleDelete={this.handleDelete} 
          toys={this.state.toys}/>
      </>
    );
  }

}

export default App;

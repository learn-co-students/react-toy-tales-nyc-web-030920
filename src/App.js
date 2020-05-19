import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import data from './data'

const API = `http://localhost:3000/toys`

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

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  fetchToys = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({
      toys: data
    }))
  }

  componentDidMount() {
    this.fetchToys()
  }

  handleChange = event => {
    this.setState({
      newToy: {
        ...this.state.newToy, [event.target.name]: event.target.value    
      }
    })
  }

  handleSubmit = (event, toy) => {
    event.preventDefault()

    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(newToy => {
      let newToys = this.state.toys.map(toy => {
        if (toy.id === newToy.id) {
          return newToy
        } else {
          return toy
        }
      })
      this.setState({
        toys: newToys
      })
    })
    this.fetchToys()
  }

  handleDonation = id => {
    let dontatedToy = this.state.toys.find(toy => toy.id === id)

    fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dontatedToy)
    })
    .then(resp => resp.json())
    .then(this.fetchToys())
  }

  handleLike = id => {
    let likedToy = this.state.toys.find(toy => toy.id === id)

    fetch(`${API}/${id}`, {
      method: `PATCH`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likedToy.likes + 1
      })
    })
    .then(resp => resp.json())
    .then(likedToy => {
      let newToys = this.state.toys.map(toy => {
        if (toy.id === likedToy.id) {
          return likedToy
        } else {
          return toy
        }
      })
      this.setState({
        toys: newToys
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          newToy={this.state.newToy}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
        toys={this.state.toys}
        handleDonation={this.handleDonation}
        handleLike={this.handleLike}
        />
      </>
    );
  }
}

export default App;

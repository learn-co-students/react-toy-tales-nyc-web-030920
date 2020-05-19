import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
// import data from './data'

const API = `http://localhost:3000/toys`


class App extends React.Component{

  state = {
    display: false, // toggles form to add a toy to collection
    toys: [], // tracks all toys in database
    newToy: { 
      id: null,
      name: "",
      image: "",
      likes: 0
    } // tracks new toy added via form
  }

  // callback to toggle form
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  // helper method to send GET request for all toys
  fetchToys = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({
      toys: data
    }))
  }

  // once App component mounts, will call method to get all toys from database
  componentDidMount() {
    this.fetchToys()
  }

  // adds toy name and image url to state upon change in input field
  handleChange = event => {
    this.setState({
      newToy: {
        ...this.state.newToy, [event.target.name]: event.target.value    
      }
    })
  }

  // sends a POST request to add new toy upon submission of form
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
      let newToys = [...this.state.toys, newToy]

      this.setState({
        toys: newToys
      }) // adds new toy to database and updates state
    })
  }

  // sends a DELETE request to remove toy from database
  handleDonation = id => {
    let dontatedToy = this.state.toys.find(toy => toy.id === id)
    let newToys = [...this.state.toys.filter(toy => toy.id !== dontatedToy.id)]

    fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dontatedToy)
    })
    .then(resp => resp.json())
    .then(this.setState({
      toys: newToys
    }))
  }

  // sends a PATCH request to increase like property value
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
          return likedToy // want to return the the updated toy 
        } else {
          return toy
        }
      })
      this.setState({
        toys: newToys // update state with updated toys
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

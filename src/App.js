import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    id: null,
    name: '',
    image: '',
    likes: 0
  }

  componentDidMount() {
    fetch(' http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => this.setState({ toys: data}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {name, image, likes} = this.state
    let toyObj = {
      name: name,
      image: image,
      likes: likes
    }
    fetch(' http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
    .then(response => response.json())
    .then(newToy => this.setState({
      toys: [...this.state.toys, newToy],
      name: '',
      image: ''
    }))
  }

  handleDelete = (id) => {
    let badToy = this.state.toys.find(toy => toy.id === id)
    this.setState({
      toys: this.state.toys.filter(toy => toy !== badToy )
    })
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
  }

  addLikes = (id) => {
    console.log(id)
    let likedToy = this.state.toys.find(toy => toy.id === id)
    ++likedToy.likes
    this.setState({
      toys: this.state.toys.map(toy => toy.id === id ? likedToy: toy)
    })
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(likedToy)
    })
  }


  render(){
    console.log('App State', this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleFormChange={this.handleFormChange} currentState={this.state} handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        toys={this.state.toys} 
        handleDelete={this.handleDelete} 
        addLikes={this.addLikes}
        />
      </>
    );
  }

}

export default App;

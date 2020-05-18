import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import data from './data'
const toyUrl = 'http://localhost:3000/toys'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    name: '',
    image: ''
  }

  componentDidMount() {
    fetch(toyUrl)
    .then(res => res.json())
    .then(toys => this.setState({ toys }))
  }
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //1.make a post to data base
  //2.empty the state's name and image
  //3.add the new toy to state's toys for instant show
  submitNewToy = (event) => {
    event.preventDefault()
    fetch(toyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({name: this.state.name, image: this.state.image, likes: 0})})
      .then(res => res.json())
      .then(res => this.setState({
        toys: [...this.state.toys, res],
        name: '',
        image: '',
      }))
  }

  //Patch method to database
  //Find toy in state by id and add number of likes
  addLikes = (toyId) => {
    let currToy = this.state.toys.find(toy => toy.id === toyId)
    ++currToy.likes
    this.setState({
      toys: this.state.toys.map(toy => toy.id === toyId ? currToy : toy)
    })
    fetch(`${toyUrl}/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(currToy)
    })
  }
  
  //Delete method to database
  //Find toy in state by id and remove it
  deleteToy = (toyId) => {
    let currToy = this.state.toys.find(toy => toy.id === toyId)
    this.setState({
      toys: this.state.toys.filter(toy => toy.id !== toyId)
    })
    fetch(`${toyUrl}/${toyId}`, { method: 'DELETE' })
  }


  render(){
    console.log('app state: ', this.state)
    return (
      <>
        <Header/>
        { this.state.display 
        ? <ToyForm state={this.state} handleChange={this.addNewToy} handleSubmit={this.submitNewToy}/> 
        : null }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleLike={this.addLikes} handleDelete={this.deleteToy}/>
      </>
    );
  }

}

export default App;

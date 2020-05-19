import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data' . 
// i can make a const out here to use many times//// 

class App extends React.Component{

  state = {
    display: false,
    toys: [],
    id: null,
    name: '',
    image: '',
    likes: 0,
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(r => r.json())
      .then(toys => this.setState({ toys}))
  }
  

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let {name, image, likes} = this.state
    let newToy = {name, image, likes}
    
    fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy),
    })
    .then(r => r.json())
    .then( newToy => {
      this.setState({toys: [...this.state.toys, newToy], id: null, name: '', image: '', likes: 0 })
    })
  }

  handleDelete = (id) => {
    const options = {
      method: 'DELETE'
    }
    fetch(`http://localhost:3000/toys/${id}`, options)
      .then(r => r.json())
      .then(this.setState({
        toys: this.state.toys.filter((toy) => toy.id !== id)
      }))
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  handleClickLikes = (id, likes) => {

    // how to just patch the likes instead of the whole 
    let newLikes = {likes: likes + 1}

    let options = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newLikes)
    }

    fetch(`http://localhost:3000/toys/${id}`, options)
      .then(r => r.json())
      .then(updatedToy => {
        let newToys = this.state.toys.map((toy) => {
          return toy.id === id ? updatedToy : toy
        })
        this.setState({
            toys: newToys 
        })
      })
  }


  render(){
    let {id, name, image, likes, display} = this.state
    return (
      <>
        <Header/>
        { display
            ?
          <ToyForm 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} 
          id={id}
          name={name}
          image={image}
          likes={likes}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDelete={this.handleDelete} handleClickLikes={this.handleClickLikes} />
      </>
    );
  }

}

export default App;

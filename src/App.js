import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
// import data from './data'

const ENDPOINT = "http://localhost:3000/toys"
const header = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

class App extends React.Component{

  state = { display: false, toys: [], name: "", image: "", likes: 0}

  componentDidMount() {
    fetch(ENDPOINT)
    .then(response => response.json())
    .then(toy => this.setState({toys: toy}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  updateInput = (event) => {
    if(event.target.name === "name"){
      {this.setState({name: event.target.value})}
    }
    else if(event.target.name === "image"){
      {this.setState({image: event.target.value})}
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
    const newToy = {id: this.state.toys.length + 1, name: this.state.name, image: this.state.image, likes: 0}
    fetch(ENDPOINT, {
      method: "POST",
      headers: header,
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(updatedToy => this.setState({name: "", image: "", toys: [...this.state.toys, updatedToy]}))
  }

  deleteToy = (id) => {
    this.setState({toys: this.state.toys.filter(toy => toy.id !== id)})
    fetch(`${ENDPOINT}/${id}`, {method: "DELETE",})
  }

  likeToy = (id, likes) => {
    fetch(`${ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: header,
      body: JSON.stringify({likes: likes + 1})
    })
    .then(response => response.json())
    .then(updatedToy => {
      let newToys = this.state.toys.map(toy => {
        return toy.id === id ? updatedToy : toy
      })
      this.setState({toys: newToys})
    })
  }

  render(){
   const {display, name, image, toys} = this.state;
    return (
      <>
        <Header/>
        { display ? <ToyForm name={name} image={image} submitHandler={this.submitHandler} updateInput={this.updateInput}/> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={toys} deleteToy={this.deleteToy} likeToy={this.likeToy}/>
      </>
    );
  }
}

export default App;
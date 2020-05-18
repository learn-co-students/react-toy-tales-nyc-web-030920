import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'

let newData = data 
class App extends React.Component {

  state = {
    display: false,
    toys: [],
    name: '',
    img: ''
  }
  componentDidMount() {
    this.setState({
      toys: data
    })
  }
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  updateInput = (event) => {
    // if name = name ss for name else
    // if name = image ss for image
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value })
    } else if (event.target.name === 'image') {
      this.setState({ img: event.target.value });
    }
  }
  toggleSubmit = (event) => {
    event.preventDefault();
    let newToy = { id: this.state.toys.size + 1, name: this.state.name, image: this.state.img, likes: 0 }
    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  toggleDonate = (id) => {
    let newArray =this.state.toys.filter(toy => toy.id != id)
    this.setState({toys: newArray})
    // newData = this.state.toys
    }
  
  render() {
    return (
      <>
        <Header />
        {this.state.display
          ?
          <ToyForm name={this.state.name} image={this.state.img} updateInput={this.updateInput} toggleSubmit={this.toggleSubmit} />
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donate={this.toggleDonate}/>
      </>
    );
  }

}

export default App;

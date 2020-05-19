import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys:[],
    name:'',
    image:'',
   

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
  fetchToys=()=>{
    fetch(`http://localhost:3000/toys`)
    .then(resp=>resp.json())
    .then((data)=>{
      this.setState({toys:data})
    })
  }
componentDidMount(){
this.fetchToys()
}
handleChange=(event)=>{
  const{name,value}=event.target
  this.setState({[name]:value})
}
handleSubmit=(event)=>{
  event.preventDefault()
  const{name,image}=this.state
  fetch(`http://localhost:3000/toys`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name,image })
})
.then(this.setState({
  name:'',
  image:''
}))
  .then(this.fetchToys)
  
}
donateToy=(id)=>{
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
    })
    .then(this.fetchToys)

}

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy}/>
      </>
    );
  }

}

export default App;

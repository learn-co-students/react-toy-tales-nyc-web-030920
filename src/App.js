import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys:[],
    name:'',
    image:'',
    likes:0


  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }



handleChange=(e)=>{
  const{name,value}=e.target
  this.setState({[name]:value})
}

getToys=()=>{
  fetch(' http://localhost:3000/toys')
  .then((resp)=>resp.json())
  .then((data)=>this.setState({toys:data}))
}

componentDidMount(){
  this.getToys()
}

handleSubmit=(e)=>{
  e.preventDefault()
const{name,image,likes}=this.state
  fetch(' http://localhost:3000/toys',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name,
      image,
      likes
    })
  })
.then(this.getToys)
}




  render(){
   
    return (

      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm  {...this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer handleClicklikes={this.handleClicklikes} {...this.state} getToys={this.getToys}/>
      </>
    );
  }

}

export default App;

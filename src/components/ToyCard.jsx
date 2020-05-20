import React, { Component } from 'react';

class ToyCard extends Component {

  state={
    likes:this.props.likes
  }

  handleClicklikes=(e)=>{

    const{likes}=this.state
   


    const id = this.props.id
fetch(`http://localhost:3000/toys/${id}`,{
  method:'PATCH',
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  },
  body:JSON.stringify({likes})
})
.then(()=>{
this.setState({likes:this.state.likes +1})
  
})

.then(this.props.getToys)
   
  }

handleClickDonate=()=>{
  const id = this.props.id
  fetch(`http://localhost:3000/toys/${id}`,{
    method:'DELETE'
  })
  .then(this.props.getToys)
}


  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button className="like-btn" onClick={this.handleClicklikes}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleClickDonate}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

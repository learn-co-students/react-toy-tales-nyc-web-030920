import React, { Component } from 'react';

class ToyCard extends Component {
  state={
    like:this.props.toy.likes? this.props.toy.likes:0
  }
addLike=()=>{
  this.setState(prevState=>({
    like:prevState.like + 1
  }))
}
  render() {
    const{name,image,id}=this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{this.state.like} Likes </p>
        <button  onClick={this.addLike}className="like-btn">Like {'<3'}</button>
        <button onClick={()=>this.props.donateToy(id)}className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

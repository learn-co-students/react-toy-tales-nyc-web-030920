import React, { Component } from 'react';

class ToyCard extends Component {

  render() {

    const {id, name, image, likes, handleDelete, handleClickLikes} = this.props
    
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={() => handleClickLikes(id, likes)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => handleDelete(id)} className="del-btn">Donate to GoodWill</button>
        {/* do i need to invoke? and when do i know to do that?  okay here i needed to pass something in */}
      </div>
    );
  }

}

export default ToyCard;

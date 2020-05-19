import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    const {handleSubmit, handleChange, newToy} = this.props

     return (
      <div className="container">
        <form onSubmit={event => {handleSubmit(event, newToy)}}
          className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={handleChange} type="text" name="name" 
          value={newToy.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={handleChange} type="text" name="image" 
          value={newToy.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    console.log("ToyForm Props:", this.props)
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input value={this.props.name} onChange={this.props.handleChange} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input value={this.props.image} onChange={this.props.handleChange} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

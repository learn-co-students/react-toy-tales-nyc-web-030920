import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    console.log(this.props.state.name)
    console.log(this.props.state.image)

    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.props.handleSubmit}>
          <h3>Create a toy!</h3>
          <input onChange={this.props.handleChange}value={this.props.state.name}type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.props.handleChange}value={this.props.state.image}type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

import React, { Component } from 'react';

class ToyForm extends Component {
  


  render() {

    const {handleSubmit, handleChange, id, name, image} = this.props
    // test out putting handle Change just on the form 
  
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={handleSubmit}  >
          <h3>Create a toy!</h3>
          <input onChange={handleChange} value={name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={handleChange} value={image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
      // you put an onClick handler for fetching on submit

      /* <div className="container">
        <form className="add-toy-form" onSubmit={() => handleSubmit()} onChange={handleChange} >
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div> */

    );
  }

}

export default ToyForm;

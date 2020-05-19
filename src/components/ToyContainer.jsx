import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  return(

    <div id="toy-collection">
      {props.toys.map((toy, index) => <ToyCard key={index} {...toy} handleDelete={props.handleDelete} handleClickLikes={props.handleClickLikes} /> )}
    </div>
  );
}

export default ToyContainer;

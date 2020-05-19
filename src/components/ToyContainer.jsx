import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard handleLike={props.handleLike} handleDelete={props.handleDelete} key={toy.id} {...toy}/>)}
    </div>
  );
}

export default ToyContainer;

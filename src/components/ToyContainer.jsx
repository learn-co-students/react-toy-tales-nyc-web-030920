import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {props.toys.map(toy => <ToyCard key={toy.id} toy={toy} handleLike={props.handleLike} handleDelete={props.handleDelete}/>)}
    </div>
  );
}

export default ToyContainer;

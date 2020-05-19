import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy=>{ return <ToyCard key={toy.id}toy={toy} donateToy={props.donateToy}/>})/* Render the collection of ToyCards */}
    </div>
  );
}

export default ToyContainer;

import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = props => {

  const {toys, handleLike, handleDonation} = props

  const renderToys = () => {
    return toys.map(toy => <ToyCard key={toy.id} toy={toy} handleDonation={handleDonation} handleLike={handleLike}/>)
  }

  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;

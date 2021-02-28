import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component{
  render(){
    
    return(
      <div id="toy-collection">
       { this.props.toys.toys.map((toy)=>{ 
         return < ToyCard toyinfo={toy} toyLikes={this.props.sumLikes} donateToy={this.props.donateToy}/>
          })}
      </div>
    );
  }
}


export default ToyContainer;

import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    const {id, name, image, likes} = this.props.toyinfo
    return (
      <div key= {name} className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>        
        <button onClick = {() => this.props.toyLikes(id)} className="like">Like {'<3'}</button>
        <button onClick = {() => this.props.donateToy(id)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

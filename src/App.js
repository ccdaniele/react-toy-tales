import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{
constructor(){
  super()

  this.state = {
    display: false,
    toys: [],
    newToy: {name: "",
    image: ""
    }
  }
}
  componentDidMount(){

    fetch('http://localhost:3000/toys')
    .then(rsp => rsp.json())
    .then(data =>{
      this.setState({toys: data

      }

      )
    }) 


  }

  toyNewName = (event)=>{
    this.setState({
      name: event.target.value
    })
  }

  toyNewImage = (event)=>{
    this.setState({
      image: event.target.value
    })
  }

  addNewToy = (event)=>{
    event.preventDefault()
    const newToy = {
      name: event.target.children[1].value,
      image: event.target.children[3].value,
      likes: 0
    }
    
   const newObj = { method:'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(newToy)
   }

   event.target.reset()
    
    fetch('http://localhost:3000/toys',newObj)
    .then(rsp => rsp.json())
    .then(data =>{
    
      this.setState({
        toys: [...this.state.toys, data]
    })
    })

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleLike = (id) =>{
  
  
  let currentToy = this.state.toys.find(toy => {
    return toy.id === id
  })
  let updatedLike = currentToy.likes + 1

  const newObj = { method:'PATCH',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify({likes: updatedLike})
   }

    fetch(`http://localhost:3000/toys/${id}`,newObj)
    .then(rsp => rsp.json())
    .then(data =>{
      
      const updatedToys = this.state.toys.map(toy => {
        if(toy.id === id){
          toy.likes += 1
          return toy
        } else {
          return toy
        }
      })
      
      this.setState({
        toys: updatedToys
    })
    })

  }

  donateToy = (id) =>{

  
      fetch(`http://localhost:3000/toys/${id}`,{method: 'DELETE'})
      .then(rsp => rsp.json())
      .then(data =>{
        
       const updatedToys = this.state.toys.filter(toy => {
          if(toy.id !== id){
            return toy
          } 
        })

        this.setState({
          toys: updatedToys
        })
      })
  } 

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy} newName={this.toyNewName} newImage={this.toyNewImage}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys = {this.state} sumLikes={this.handleLike} donateToy={this.donateToy}/>
      </>
    );
  }

}

export default App;

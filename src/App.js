import React, { Component } from 'react';
import './App.css';
import imageArray from './components/images';

//
class App extends Component {
  constructor(){
    super()
    this.state={
      images: imageArray,
      message: "To Start, Please Select an Image!",
      score: 0,
      topScore: 0
    }
  }

  //================================================================================
topScore = () => {
  let scoreJam = this.state.score;
  let topscoreJam = this.state.topScore;
console.log('the score is at topScore section: ', scoreJam);
console.log('topscore at the top: ', topscoreJam)
  if ( scoreJam > topscoreJam) {
      this.setState({topScore: scoreJam})
  }
  // console.log('Top Score is: ', this.topScore);
}

//================================================================================
//randomize the order of images
 imageRandomizer = () => {
  for(let i = 0; i < imageArray.length; i++) {
      let j = i + Math.floor(Math.random() * (imageArray.length - i));
          let newImageArray = imageArray[j];
          imageArray[j] = imageArray[i];
          imageArray[i] = newImageArray;
  }
}

//================================================================================
 imageHandler = (id) => {
  let imgChoice = this
  //after click loop through imageArray and change the click state, increase score 
  for (let i = 0; i < imageArray.length; i++) {
      if (id===imageArray[i].id) {
          if (imageArray[i].clicked === false) {
              imageArray[i].clicked = true;
              //let scoreNew = this.state.score;
              this.setState({
                  message: "You Guessed Correctly!!!",
                  score: ++this.state.score 
              })
              this.topScore();
              setTimeout(() => {
                  imgChoice.setState({
                      message: 'Please Select Another Image!'
                  })
              },1500)
          }
          //or let the palyer know he lost!
          else{
              this.setState({
                  message: 'You Have Guessed incorrectly!',
                  score: 0
              })
              // reset the clicked state to false to start the game
              imageArray.map(image => image.clicked = false);
          }
      }
  }
  //rearrange the image grid
  this.imageRandomizer();
}
//================================================================================


  render() { 
    //create iage grid and make it clickable
        let showImages = this.state.images.map((image, index) =>
          <div className="image-run">
            <a key={index} onClick={() => this.imageHandler(image.id)}>
            <img src = {image.url} alt="" className ="img-one"></img>
            </a>
          </div>
        )

    //============================== show everything ====================================
    return (
      <div className="App">
        <header className="header">
          <div className="spacer"></div>
          <div><p className="title">Memory Game</p> </div>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="message"> 
             {this.state.message}
          </div>
          <div>
            <span className = "score"> Score: </span> <span className = "top-score">{this.state.score}</span>
            <span className = "score-line"> | </span> 
            <span className = "score">Top Score: </span> <span className = "top-score">{this.state.topScore} </span>
          </div>
        </header>
        <div className="img-grid"> {showImages} </div>
      </div>
    );
  }
}
  

export default App;

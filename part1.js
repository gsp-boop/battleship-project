
var rs = require('readline-sync');
function battleShipGame(){

const xCoordinates = [1, 2, 3];

let newArr = [];
const shipMap = new Map();

for(let i = 1; i < xCoordinates.length + 1; i++){
  newArr.push(['a', i].join(''));
  newArr.push(['b', i].join(''));
  newArr.push(['c', i].join(''));
}

const shipPos = newArr.splice(Math.floor(Math.random() * newArr.length), 1);
const shipPos2 = newArr.splice(Math.floor(Math.random() * newArr.length), 1);


// // ship positioning
shipMap.set(...shipPos, 8 )
.set(...shipPos2, 9 );

// //rest of the grid
newArr.map((item, i) => { shipMap.set( item, i +1) });

// // User input---- looking for ship to sink
let history = [];
let userSet = new Map();


function hitCheck (userInpt){
  const shipArr = [];
  history.push(userInpt)

  
  for(const [ship, i ] of shipMap){
    if(i > 7){
      shipArr.push(ship)
    }
  }
  
  if(userSet.size > 0){
    if(userSet.has(userInpt)){
      const sameCoor = rs.question('You have already picked this location. Miss! ---')
      hitCheck(sameCoor)
    } 
  }
  userSet.set(userInpt)

  if(shipArr.includes(userInpt)){
    shipMap.delete(userInpt);
       console.log(`Hit. There are ${shipMap.size -7} ships left`);
  } else {
       console.log(`Miss. There are ${shipMap.size -7} ships left`); 
  }

  if (shipMap.size <= 7) {
    console.log('You\'ve sunk all my battle ships');

    const playAgain = rs.keyInYN('Would you like to play again?');
    if(playAgain){
      battleShipGame()
    }
    else{
     return console.log('Thanks for playing!')

    }
  }

}

//Game starts here
const pressToStart = rs.keyIn('Press any Key to start --- ');

let oldInputs = [];

function gameSteps(){
  while(shipMap.size > 7){

    const userGuess = rs.question('Enter a location to strike --- ');
    hitCheck(userGuess)
    oldInputs.push(userGuess)
  }
  
}
gameSteps()
}


battleShipGame();


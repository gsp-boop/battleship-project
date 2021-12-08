// Felt like a huge learning curve but here's what I got. Thank you for spending the time looking at this. Appreciate any input!


var rs = require('readline-sync');
function battleShipGame(){

  const x = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const y = [1,2,3,4,5,6,7,8,9,10];
  const coor = [];
  const shipMap = new Map();



  for(let i = 0; i < x.length; i++){
    for(let j = 0; j < y.length; j++){
      coor.push([x[i], y[j]].join(''))
    }
  }

////////////////////////////
//randomShipGenerator function


  function randoGen(){

      //five ship generator
    function fiveShip(){
      const r = Math.floor(Math.random() * coor.length);
      const r2 = Math.floor(Math.random() * coor.length/2);
     
      //going across 
      const fiveAcross = () => {
       const shipAcross = coor.slice(r, r+5)
       for(let i = 0; i < shipAcross.length; i++){
         if(shipAcross.length < 5 || shipAcross[0][0] !== shipAcross[i][0]){
           return fiveShip()
         }
        } 
        return shipAcross
       }
      
      // going down
      const fiveDown =() => {
        let down = [];
        for(let i = 0; i <= 40; i+=10){
          down.push(...coor.slice(r2 + i, r2 + i + 1))
        }
      return down  
      }
      const randoCoors = [fiveDown, fiveAcross]
      return randoCoors[Math.floor(Math.random() * randoCoors.length)]()
    }
    
  ////////////////////////////////////////////////////////////////////
  //four ship
    function fourShip(){
      const r = Math.floor(Math.random() * coor.length);
      const r2 = Math.floor(Math.random() * coor.length - 40);
    
      //going across 
      const fourAcross = () => {
      const shipAcross = coor.slice(r, r+4)
      for(let i = 0; i < shipAcross.length; i++){
        if(shipAcross.length < 4 || shipAcross[0][0] !== shipAcross[i][0]){
          return fourShip()
        }
        } 
        return shipAcross
      }
      
      // going down
      const fourDown =() => {
        let down = [];
        for(let i = 0; i <= 30; i+=10){
          down.push(...coor.slice(r2 + i, r2 + i + 1))
        }
      return down  
      }
      const randoCoors = [fourDown, fourAcross]
      return randoCoors[Math.floor(Math.random() * randoCoors.length)]()
    }
    ///////////////////////////////////////////////////////////
  //three ship
    function threeShip(){
      const r = Math.floor(Math.random() * coor.length);
      const r2 = Math.floor(Math.random() * coor.length - 30);
    
      //going across 
      const threeAcross = () => {
      const shipAcross = coor.slice(r, r+2)
      for(let i = 0; i < shipAcross.length; i++){
        if(shipAcross.length < 3 || shipAcross[0][0] !== shipAcross[i][0]){
          return threeShip()
        }
        } 
        return shipAcross
      }
      
      // going down
      const threeDown =() => {
        let down = [];
        for(let i = 0; i <= 20; i+=10){
          down.push(...coor.slice(r2 + i, r2 + i + 1))
        }
      return down  
      }
      const randoCoors = [threeDown, threeAcross]
      return randoCoors[Math.floor(Math.random() * randoCoors.length)]()
      }
  
      /////////////////////////////////////////////////////////
  //twoShip
    function twoShip(){
      const r = Math.floor(Math.random() * coor.length);
      const r2 = Math.floor(Math.random() * coor.length - 20);
    
      //going across 
      const twoAcross = () => {
      const shipAcross = coor.slice(r, r+1)
      for(let i = 0; i < shipAcross.length; i++){
        if(shipAcross.length < 2 || shipAcross[0][0] !== shipAcross[i][0]){
          return twoShip()
        }
        } 
        return shipAcross
      }
      
      // going down
      const twoDown =() => {
        let down = [];
        for(let i = 0; i <= 10; i+=10){
          down.push(...coor.slice(r2 + i, r2 + i + 1))
        }
      return down  
      }
      const randoCoors = [twoDown, twoAcross]
      return randoCoors[Math.floor(Math.random() * randoCoors.length)]()
    }
  
  
    const shipPos2 =  twoShip();
    const shipPos32 = threeShip();
    const shipPos3 = threeShip();
    const shipPos4 = fourShip();
    const shipPos5 = fiveShip();
  
    let allCoors = [...shipPos2, ...shipPos32, ...shipPos3, ...shipPos4, ...shipPos5];
    
    let p = coor.filter((item) => !allCoors.includes(item))
    
    if(p.length > 83){
      return randoGen()
    }
    return [p, shipPos2, shipPos3, shipPos32, shipPos4, shipPos5]
  }


  //grid and ship generator  
  
  let wholeArr = randoGen();

  let [empty, ...ships] = wholeArr;
  let [two, three, three2, four, five] = ships
  
  const mappingShips = [...two, ...three, ...three2, ...four, ...five];
  
  empty.map((item, i) => shipMap.set( item, i+1))
  mappingShips.map((item, i) => shipMap.set(item, empty.length + 1 + i))
  
  // // User input---- looking for ship to sink
  let history = [];
  let userSet = new Map(); 
  
  //this set is for keeping count of the ships that are still in play
  const shipCounterSet = new Set();
        shipCounterSet.add('Ship2')
        shipCounterSet.add('Ship3')
        shipCounterSet.add('Ship32')
        shipCounterSet.add('Ship4')
        shipCounterSet.add('Ship5');

  function hitCheck (userInpt){

    const shipArr = [];
    history.push(userInpt)

    //bulding array that holds all ship coordinates

    for(const [ship, i ] of shipMap){
      if(i > 83){
       shipArr.push(ship) 
      }
    }
    
    //checking for multiple inputs from the user
    if(userSet.size > 0){
      if(userSet.has(userInpt)){
        const sameCoor = rs.question('You have already picked this location. Miss! ---')
        hitCheck(sameCoor)
      } 
    }
    userSet.set(userInpt)


    //this is a hit check, matches user input with the coors of the ship and deletes place holder ships
    

    //two battle ship checker
     if(userInpt === two[0] || userInpt === two[1]){
      shipMap.delete(userInpt)
      console.log(`2Hit!`);
      if (!shipMap.has(two[0]) && !shipMap.has(two[1])) {
      shipCounterSet.delete('Ship2');
      console.log(`2Hit. You sunk my battleship. There are ${shipCounterSet.size} left`)
    }       
  } 

    //three battle ship checker

    if(userInpt === three[0] || userInpt === three[1] || userInpt === three[2]){
      shipMap.delete(userInpt)
      console.log(`3Hit!`);
    if (!shipMap.has(three[0]) && !shipMap.has(three[1]) && !shipMap.has(three[2])) {
      shipCounterSet.delete('Ship3');
      console.log(`3Hit. You sunk my battleship. There are ${shipCounterSet.size} left`)
    }
  } 

    //three2 battle ship checker
    if(userInpt === three2[0] || userInpt === three2[1] || userInpt === three2[2]){
      shipMap.delete(userInpt)
      console.log(`32Hit!`);
    if (!shipMap.has(three2[0]) && !shipMap.has(three2[1]) && !shipMap.has(three2[2])) {
      shipCounterSet.delete('Ship32');
      console.log(`32Hit. You sunk my battleship. There are ${shipCounterSet.size} left`)
    }    
  } 
    
    
    //four ship checker

    if(userInpt === four[0] || userInpt === four[1] || userInpt === four[2] || userInpt === four[3]){
      shipMap.delete(userInpt)
      console.log(`4Hit!`);
    if (!shipMap.has(four[0]) && !shipMap.has(four[1]) && !shipMap.has(four[2]) && !shipMap.has(four[3])) {
      shipCounterSet.delete('Ship4');
      console.log(`4Hit. You sunk my battleship. There are ${shipCounterSet.size} left`)
    }    
  } 

    //five battle ship checker 
    if(userInpt === five[0] || userInpt === five[1] || userInpt === five[2] || userInpt === five[3] || userInpt === five[4]){
      shipMap.delete(userInpt)
      console.log(`5Hit!`);
    if (!shipMap.has(five[0]) && !shipMap.has(five[1]) && !shipMap.has(five[2]) && !shipMap.has(five[3]) && !shipMap.has(five[4])) {
      shipCounterSet.delete('Ship5');
      console.log(`5Hit. You sunk my battleship. There are ${shipCounterSet.size} left`)
    }    
  } 

    if (shipCounterSet.size === 0) {
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
    while(shipCounterSet.size > 0){

      const userGuess = rs.question('Enter a location to strike --- ');
      hitCheck(userGuess)
      oldInputs.push(userGuess)
    }
    
  }
  gameSteps()
}


battleShipGame();



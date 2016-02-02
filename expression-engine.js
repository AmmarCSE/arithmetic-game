function getRandomOperand(min, max) {
  //set defaults customized for our game
  min = min || 1;
  max = max || 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function getRandomOperator(){
  var operators = ['+', '-', '*', '/'];
  return getRandomArrayItem(operators);
}

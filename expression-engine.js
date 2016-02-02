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
Array.prototype.juxtapose = function (seperatorFunction) {
    for(var i = this.length - 1; i > 0; i--){
        this.splice(i, 0,seperatorFunction());
    }
    return this;
}
expressionArray = expressionArray.juxtapose(getRandomOperator);

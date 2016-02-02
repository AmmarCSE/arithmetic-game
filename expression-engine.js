#!/usr/bin/env node

var level = 5;

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

function insertRandomParanthesis(expressionArray) {
    //give %50 chance of inserting paranthesis
    if(1 || getRandomOperand() > 50){
        //determine how many operands to include within the parenthesis
        var minOperands = 2;
        var maxOperands = level - 1;
        var includedOperands = getRandomOperand(minOperands, maxOperands);
        
        //have to initialize array with even numbers for valid start indices
        var startIndexArray = Array.apply(null, {length: level - 1}).map(function(item, index){ return index*2});
        var randomStartIndex = getRandomArrayItem(startIndexArray);
 
        var endingIndexJump = randomStartIndex + ((includedOperands-1)*2)+1;

        console.log(includedOperands);
        //check for and fix ending index surpassing array end
        while(endingIndexJump > expressionArray.length){
            //shift both down
            randomStartIndex -= 2;
            endingIndexJump -= 2;
        }

        expressionArray.splice(endingIndexJump, 0, ')');
        expressionArray.splice(randomStartIndex, 0, '(');
    }

    return expressionArray;
}

Array.prototype.juxtapose = function (seperatorFunction) {
    for(var i = this.length - 1; i > 0; i--){
        this.splice(i, 0,seperatorFunction());
    }
    return this;
}

var expressionArray = Array.apply(null, {length:level}).map(getRandomOperand);

function getRandomOperator(){
  var operators = ['+', '-', '*', '/'];
  return getRandomArrayItem(operators);
}

function prettyPrintExpression(expression){
    expression = expression.replace(/(\*|\+|-|\/)/g, ' $1 ');
    return expression;
}
expressionArray = expressionArray.juxtapose(getRandomOperator);
insertRandomParanthesis(expressionArray);

var expression = expressionArray.join('');
expression = prettyPrintExpression(expression);
console.log(expression);

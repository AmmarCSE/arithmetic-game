#!/usr/bin/env node

checkForLevel(process.argv.join(' '));
var readline = require('readline');
var expressionEngine = require('./expression-engine.js');

var readlineInterface = readline.createInterface(process.stdin, process.stdout);
var expression = expressionEngine.generateExpression();
readlineInterface.setPrompt(formatExpressionForQuestion(expression));
readlineInterface.prompt();
readlineInterface.on('line', function(line) {
    if (['quit', 'q'].indexOf(line) > -1) readlineInterface.close();
    readlineInterface.setPrompt(expressionEngine.generateExpression());
    readlineInterface.prompt();
}).on('close',function(){
    process.exit(0);
});

function formatExpressionForQuestion(expression){
    return expression + ' = ?';
}

function checkForLevel(input){
    var matches = /--level (\d{1})/.exec(input);
    var level = matches[1];
    if(level >0 && matches[1] < 6){
        expressionEngine.setLevel(level);
    }
}

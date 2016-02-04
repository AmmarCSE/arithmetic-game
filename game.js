#!/usr/bin/env node

var readline = require('readline');
var readlineInterface = readline.createInterface(process.stdin, process.stdout);

var expressionEngine = require('./expression-engine.js');

checkForLevel(process.argv.join(' '));

var expression = expressionEngine.generateExpression();

readlineInterface.setPrompt(formatExpressionForQuestion(expression));
readlineInterface.prompt();

readlineInterface.on('line', function(line) {
    //give a chance for user to quit(besides Ctrl+c)
    if (['quit', 'q'].indexOf(line) > -1) {
        readlineInterface.close();
    }

    //check if user wants to change level mid-game
    if (!checkForLevel(line)) {
        var answer = expressionEngine.evaluateExpression(expression);
        var message = 'Incorrect, the answer is ' + answer;
        if (answer == line) {
            message = 'Correct!';
        }

        console.log(message);
    }

    expression = expressionEngine.generateExpression();
    readlineInterface.setPrompt(formatExpressionForQuestion(expression));

    readlineInterface.prompt();
}).on('close', function() {
    process.exit(0);
});

//de-couple question format so expression engine can be used for more than just the game
function formatExpressionForQuestion(expression) {
    return expression + ' = ?';
}

function checkForLevel(input) {
    var levelChanged = false;

    //try to match --level anywhere in the string
    var matches = /--level (\d{1})/.exec(input);
    if (matches) {
        var level = matches[1];

        //set level only if valid int found
        //otherwise, inside the module, it will default to 3
        if (level > 0 && matches[1] < 6) {
            expressionEngine.setLevel(level);
            levelChanged = true;
        }
    }

    return levelChanged;
}

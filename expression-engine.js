module.exports = (function() {
    //default the game level to 3
    var expressionLevel = 3;
    var operators = ['+', '-', '*', '/'];

/*------------------------methods to work with expression array, some methods double as general utility methods-----------------*/
    //insert item in every other slot
    Array.prototype.juxtapose = function(seperatorFunction) {
        for (var i = this.length - 1; i > 0; i--) {
            this.splice(i, 0, seperatorFunction());
        }
        return this;
    }

    function getRandomArrayItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomOperator() {
        return getRandomArrayItem(operators);
    }

    function getRandomOperand(min, max) {
        //set defaults customized for our game
        min = min || 1;
        max = max || 100;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function insertRandomParanthesis(expressionArray) {
        //give %50 chance of inserting paranthesis
        if (1 || getRandomOperand() > 50) {
            //determine how many operands to include within the parenthesis
            var minOperands = 2;
            var maxOperands = expressionLevel - 1;
            var includedOperands = getRandomOperand(minOperands, maxOperands);

            //have to initialize array with even numbers for valid start indices
            var startIndexArray = Array.apply(null, {
                length: expressionLevel - 1
            }).map(function(item, index) {
                return index * 2
            });
            var randomStartIndex = getRandomArrayItem(startIndexArray);

            var endingIndexJump = randomStartIndex + ((includedOperands - 1) * 2) + 1;

            //check for and fix ending index surpassing array end
            while (endingIndexJump > expressionArray.length) {
                //shift both down
                randomStartIndex -= 2;
                endingIndexJump -= 2;
            }

            expressionArray.splice(endingIndexJump, 0, ')');
            expressionArray.splice(randomStartIndex, 0, '(');
        }

        return expressionArray;
    }

/*------------------------methods to calculate expression-----------------*/
    function computeExpression(expressionArray) {
        //execute by arithmetic order of operations
        expressionArray = reduceOperator(expressionArray, '/');
        expressionArray = reduceOperator(expressionArray, '*');
        expressionArray = reduceOperator(expressionArray, '-');
        expressionArray = reduceOperator(expressionArray, '+');

        //after the four stages, the reduced array contains only one item
        return expressionArray.pop();
    }

    function reduceOperator(expressionArray, operator) {
        var operatorType = operators.indexOf(operator);

        var operatorIndex = -1;
        while ((operatorIndex = expressionArray.indexOf(operator)) > -1) {
            //make sure to coerce from string to int
            var operandOne = +expressionArray[operatorIndex - 1],
                operandTwo = +expressionArray[operatorIndex + 1],
                result;

            switch (operatorType) {
                case 0:
                    result = operandOne + operandTwo;
                    break;
                case 1:
                    result = operandOne - operandTwo;
                    break;
                case 2:
                    result = operandOne * operandTwo;
                    break;
                case 3:
                    result = operandOne / operandTwo;
                    break;
            }

            //replace the two operands and operator in the array with the result
            expressionArray.splice(operatorIndex - 1, 3, result);

        }

        return expressionArray;
    }

/*------------------------miscellaneous methods-----------------*/
    function prettyPrintExpression(expression) {
        //for now, just put spaces around operators
        expression = expression.replace(/(\*|\+|-|\/)/g, ' $1 ');
        return expression;
    }


/*------------------------general api methods-----------------*/
    function setLevel(level) {
        expressionLevel = level;
    }

    function generateExpression() {
        //first, get array of the operands
        var expressionArray = Array.apply(null, {
            length: expressionLevel
        }).map(getRandomOperand);

        //now, insert operators using callback
        expressionArray = expressionArray.juxtapose(getRandomOperator);

        //finally, try 'seeding' parenthesis
        insertRandomParanthesis(expressionArray);

        //we're good to go! polish eexpression
        var expression = expressionArray.join('');
        expression = prettyPrintExpression(expression);

        return expression;
    }

    function evaluateExpression(expression) {
        //first, reduce whats inside parenthesis
        expression = expression.replace(/(\(.+\))/g, function(match, contents, offset, s) {
            //strip out parenthesis
            match = match.replace(/\(|\)/g, '');

            var subExpressionArray = match.split(' ');
            return computeExpression(subExpressionArray);
        });

        var expressionArray = expression.split(' ');
        result = computeExpression(expressionArray);

        return result;
    }

    return {
        generateExpression: generateExpression,
        evaluateExpression: evaluateExpression,
        setLevel: setLevel
    };
})();

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let regexp = /\([^\(\)]+?\)/;
    let spaces = /\s+/g;
    if (!regexp.test(expr)) {
        expr = expr.replace(spaces, '');
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == '*') {
                expr = multiplication(expr);
                i = 0;
            }
    
            if (expr[i] == '/') {
                expr = division(expr);
                i = 0;
            }
        }

        for (let i = 0; i < expr.length; i++) {
            if (expr[i] == '+') {
                expr = addition(expr);
                i = 0;
            }
            if (expr[i] == '-' && i !== 0 || expr[i] == '-' && i !== 1 && expr[0] == '(' || expr[i] == '-' && i !== 1 && expr[0] == '/' || expr[i] == '-' && i !== 1 && expr[0] == '*' || expr[i] == '-' && i !== 1 && expr[0] == '+') {
                expr = subtraction(expr);
                i = 0;
            }
        }
        
        return +expr;
    } else {
        let subStr = expr.match(regexp)[0].slice(1, -1).replace(spaces, '');

        for (let i = 0; i < subStr.length; i++) {
            if (subStr[i] == '*') {
                subStr = multiplication(subStr);
                i = 0;
            }
            if (subStr[i] == '/') {
                subStr = division(subStr);
                i = 0;
            }
        }
        for (let i = 0; i < subStr.length; i++) {
            if (subStr[i] == '+') {
                subStr = addition(subStr);
                i = 0;
            }
    
            if (subStr[i] == '-' && i !== 0 || subStr[i] == '-' && i !== 1 && subStr[0] == '(' || subStr[i] == '-' && i !== 1 && subStr[0] == '/' || subStr[i] == '-' && i !== 1 && subStr[0] == '*' || subStr[i] == '-' && i !== 1 && subStr[0] == '+') {
                subStr = subtraction(subStr);
                i = 0;
            }
        }
        
    
        expr = expr.replace(regexp, subStr);
        return expressionCalculator(expr);   
    }
}

function addition(str) {
   
        let firstI = str.indexOf('+') - 1;
        let firstArg = '';
        while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
            firstArg = str[firstI] + firstArg;
            firstI--;
        }

        let secondI = str.indexOf('+') + 1;
        let secondArg = '';
        while (!isNaN(+(secondArg + str[secondI]))) {
            secondArg += str[secondI];
            secondI++;
        }

        let part = str.slice(firstI+1, secondI);
        let result = '' + (+firstArg + +secondArg);
        str = str.replace(part, result);
        // return addition(str);
    // }
    return str;
}
function subtraction(str) {
  
        if (str[1] == '-' && str[0] == '(' || str[1] == '-' && str[0] == '/' || str[1] == '-' && str[0] == '*' || str[1] == '-' && str[0] == '+' ) {
            let firstI = str.indexOf('-', 2) - 1;
            let firstArg = '';
            while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
                firstArg = str[firstI] + firstArg;
                firstI--;
            }

            let secondI = str.indexOf('-', 2) + 1;
            let secondArg = '';
            while (!isNaN(+(secondArg + str[secondI]))) {
                secondArg += str[secondI];
                secondI++;
            }

            let part = str.slice(firstI+1, secondI);
            let result = '' + (+firstArg - +secondArg);
            str = str.replace(part, result);
            return str;
        } else {    
            let firstI = str.indexOf('-', 1) - 1;
            let firstArg = '';
            while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
                firstArg = str[firstI] + firstArg;
                firstI--;
            }

            let secondI = str.indexOf('-', 1) + 1;
            let secondArg = '';
            while (!isNaN(+(secondArg + str[secondI]))) {
                secondArg += str[secondI];
                secondI++;
            }

            let part = str.slice(firstI+1, secondI);
            let result = '' + (+firstArg - +secondArg);
            str = str.replace(part, result);
            return str;
        //     return subtraction(str);
        // }
            
        }

        
}
function multiplication(str) {
    // if (!str.includes('*')) {
    //     return str;
    // } else {
        let firstI = str.indexOf('*') - 1;
        let firstArg = '';
        while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
            firstArg = str[firstI] + firstArg;
            firstI--;
        }

        let secondI = str.indexOf('*') + 1;
        let secondArg = '';
        while (!isNaN(+(secondArg + str[secondI]))) {
            secondArg += str[secondI];
            secondI++;
        }

        let part = str.slice(firstI+1, secondI);
        let result = '' + (+firstArg * +secondArg);
        str = str.replace(part, result);
    //     return multiplication(str);
    // }
    return str;
}
function division(str) {
    // if (!str.includes('/')) {
    //     return str;
    // } else {
        let firstI = str.indexOf('/') - 1;
        let firstArg = '';
        while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
            firstArg = str[firstI] + firstArg;
            firstI--;
        }

        let secondI = str.indexOf('/') + 1;
        let secondArg = '';
        while (!isNaN(+(secondArg + str[secondI]))) {
            secondArg += str[secondI];
            secondI++;
        }

        let part = str.slice(firstI+1, secondI);
        if (secondArg == '0') {
            throw new Error('TypeError: Division by zero.');
        }
        let result = '' + (+firstArg / +secondArg);
        str = str.replace(part, result);
    //     return division(str);
    // }
    return str;
}

// else if (str[str.indexOf('-', 1) - 1] == '/' || str[str.indexOf('-', 1) - 1] == '+' || str[str.indexOf('-', 1) - 1] == '*') {
//     let firstI = str.indexOf('-', str.indexOf('-', 1)) - 1;
//     let firstArg = '';
//     while (!isNaN(+(str[firstI] + firstArg)) && str[firstI] !== '+') {
//         firstArg = str[firstI] + firstArg;
//         firstI--;
//     }

//     let secondI = str.indexOf('-', 1) + 1;
//     let secondArg = '';
//     while (!isNaN(+(secondArg + str[secondI]))) {
//         secondArg += str[secondI];
//         secondI++;
//     }

//     let part = str.slice(firstI+1, secondI);
//     let result = '' + (+firstArg - +secondArg);
//     str = str.replace(part, result);
//     return str;
// } 





module.exports = {
    expressionCalculator
}
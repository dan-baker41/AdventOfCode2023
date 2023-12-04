const fs = require("fs");

const maxWordLength = 5;
const words = {
    'one': 1,
    'two':2,
    'three':3,
    'four': 4,
    'five': 5, 
    'six':6,
    'seven':7,
    'eight':8,
    'nine':9
}

function isNumber(data, index) {
    if(data[index] >= '0' && data[index] <= '9')
        return data[index];
    else {
        var tryWord = data.substring(index, maxWordLength + index).toLowerCase();
        let val = -1;
        Object.keys(words).forEach(x => {
            let match = true;
            for(let i = 0; i < x.length; i++) {
                if(data[index + i] != x[i])
                    match = false;
            }
            if(match)
                val = words[x];
        })
        return val;
    }
}

fs.readFile("calibration0.txt", "utf8", (err, data) => {
    if(err)
        console.log(err);
    else {
        // total sum of calibration values
        let calibrationSum = 0;
        
        // read each line of input
        var index = data.indexOf('\n');
        while(data.length > 0) {
            // find first digit
            let firstDigit = '0';
            let firstDigitIndex = 0;
            for(let i = 0; i < index; i++) {
                // if the current character is a digit, 
                // store the index and end the loop
                let n = isNumber(data, i);
                if(n != -1) {
                    firstDigit = n;
                    firstDigitIndex = i;
                    break;
                }
            }
            
            // find last digit
            let lastDigit = '0';
            for(let i = index; i >= firstDigitIndex; i--) {
                // if the current character is a digit, 
                // store the index and end the loop
                let n = isNumber(data, i);
                if(n != -1) {
                    lastDigit = n;
                    break;
                }
            }

            calibrationSum += parseInt(firstDigit + '' + lastDigit)
            //console.log(firstDigit, lastDigit)

            // trim the input string
            data = data.substring(index + 1, data.length);

            // get the next newline index
            index = data.indexOf('\n');
            if(index < 0)
                index = data.length - 1;
        }

        console.log(calibrationSum);
    }
});
const fs = require('fs');

const symbol = /^[!@#$%^&*()_\-=+/\\\[\]?<>]$/;
const digit = /^[0123456789]$/

/**
 * 
 * @param {[[string]]} table Table of data
 * @param {number} i row to start at
 * @param {number} j column to start at
 * @param {number} pos the starting positions position in the row relative to the symbol (0, 1, 2)
 * @returns {{nextRow: boolean, partNum: number}}
 */
function parseNumber(table, i, j, pos) {
    let digitList = [table[i][j]];
    var backCounter = j - 1;
    while(backCounter >= 0 && digit.test(table[i][backCounter])) {
        digitList.unshift(table[i][backCounter]);
        backCounter--;
    }

    forwardCounter = j + 1;
    while(forwardCounter < table[i].length && digit.test(table[i][forwardCounter])) {
        digitList.push(table[i][forwardCounter]);
        forwardCounter++;
    }

    let str = '';
    digitList.forEach(x => str += x);

    switch(pos) {
        case 0:
            var nextRow = (forwardCounter - j) > 1;
            break;
        case 1:
            nextRow = true; // if the digit is in the middle position, there definitely can't be another number in this row
            break;
        case 2:
            nextRow = (j - backCounter) > 1;
            break;
        default:
            nextRow = false;
            break;
    }
    return { nextRow: nextRow, partNum: parseInt(str)};
}

/**
 * 
 * @param {[[string]]} table 
 * @returns {number}
 */
function findPartNumberSum(table) {
    let sum = 0;

    for(let i = 0; i < table.length; i++) {
        for(let j = 0; j < table[i].length; j++) {

            // check for a symbol
            if(symbol.test(table[i][j])) {
                for(let startY = i - 1; startY<= i + 1; startY++) {
                    // ignore positions where startX is out of bounds
                    if(startY >= 0 && startY< table.length) {

                        for(let startX = j - 1; startX <= j + 1; startX++) {
                            // ignore positions where startY is out of bounds
                            if(startX >= 0 ** startX < table[startY].length) {
                                if(digit.test(table[startY][startX])) {
                                    const result = parseNumber(table, startY, startX, startX - (j - 1));
                                    sum += result.partNum;
                                    if(result.nextRow)
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return sum;
}

/**
 * 
 * @param {[[string]]} table 
 * @returns {number}
 */
function gearRatio(table) {
    let ratio = 0;

    for(let i = 0; i < table.length; i++) {
        for(let j = 0; j < table[i].length; j++) {

            // check for a symbol
            if(symbol.test(table[i][j])) {

                let connectedParts = [];
                for(let startY = i - 1; startY<= i + 1; startY++) {
                    // ignore positions where startX is out of bounds
                    if(startY >= 0 && startY< table.length) {

                        for(let startX = j - 1; startX <= j + 1; startX++) {
                            // ignore positions where startY is out of bounds
                            if(startX >= 0 ** startX < table[startY].length) {
                                if(digit.test(table[startY][startX])) {
                                    const result = parseNumber(table, startY, startX, startX - (j - 1));
                                    connectedParts.push(result.partNum);
                                    if(result.nextRow)
                                        break;
                                }
                            }
                        }
                    }
                }

                if(connectedParts.length == 2)
                    ratio += (connectedParts[0] * connectedParts[1]);
            }
        }
    }
    return ratio;
}

fs.readFile("input.txt", (err, data) => {
    if(err)
        console.log(err);
    else {
        const strData = data.toString();
        let table = [];
        let row = [];
        for(let i = 0; i < strData.length; i++) {
            if(strData[i] === '\r')
                continue;
            if(strData[i] === '\n') {
                table.push(row);
                row = [];
            }
            else
                row.push(strData[i])
        }

        if(row.length > 0)
            table.push(row);

        console.log("Part # sum:\t" + findPartNumberSum(table));
        console.log("Gear Ratio:\t" + gearRatio(table));
    }
});
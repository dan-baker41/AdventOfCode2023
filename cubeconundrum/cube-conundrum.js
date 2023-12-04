// game config settings to specify how many of each color cube there is
const config = {
    'red': 12,
    'green': 13,
    'blue': 14
}

/**
 * Checks if the game is valie
 * @param {string} game Information about the game.
 * @returns {number} Game number if it is valid, zero if not.
 */
function checkGameValid(game) {
    if(!game || game == '')
        return 0;

    const split = game.split(/[:;, ]/).filter(x => x !== '')

    for(var i = 3; i < split.length; i+=2) {
        if(config[split[i]] < parseInt(split[i - 1]))
            return 0;
    }
    return parseInt(split[1]);
}

/**
 * Calculates the minimum power for a cube game
 * @param {string} game Information about the cube game 
 * @returns {number} the minimum power for the cube game
 */
function checkMinPower(game) {
    if(!game || game == '')
        return 0;

    const split = game.split(/[:;, ]/).filter(x => x !== '')
    const min = {
        'red': 0,
        'blue': 0,
        'green': 0
    }

    for(var i = 3; i < split.length; i+=2) {
        let val = parseInt(split[i - 1]);
        if(min[split[i]] < val)
            min[split[i]] = val;
    }
    return min['red'] * min['blue'] * min['green'];
}

const fs = require('fs');

fs.readFile("input.txt", (err, data) => {
    if(err) 
        console.log(err);
    else {
        const games = data.toString().split('\r\n');

        let valid = 0;
        let power = 0;
        games.forEach(x => {
            valid += checkGameValid(x);
            power += checkMinPower(x);
        });

        console.log("Possible:\t" + valid);
        console.log("Power:\t\t" + power);
    }
})

/*var stdin = process.openStdin();

// get input from stdin
stdin.addListener("data", function(d) {
    console.log(d.toString(), "\n--------------\n");
    
    const games = d.toString().split('\r\n');

    let valid = 0;
    games.forEach(x => valid += checkGameValid(x));

    console.log(valid);
});*/
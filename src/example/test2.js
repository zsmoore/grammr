import { Tokenizer } from 'lexr';

const grammar = {

    S       :   [ [ 'a', 'b', 'c'],
                  [ 'E', 'b', 'd'] ],


    E       :   [ ['a'],
                  ['e']],
};

const tokens = {
    a   :   /a/,
    e   :   /e/,
    c   :   /c/,
    d   :   /d/,
};

let input = 'ebd';
let tok = new Tokenizer("");
tok.addTokenSet(tokens);
let output = tok.tokenize(input);

// push to add
// pop to remove
let topmost = [];

// unshift to add
// pop to remove
let pathQueue = [];

let states = {
    ACCEPTING   : "accepting"
};




function glrParse(inputTokens) {

    let start = [];

    //reset 
    topmost = [[]];
    pathQueue = [];

    for (let i = 0; i < inputTokens.length; i++) {
        doReductions(inputTokens[i]);
        doShifts(inputTokens[i]);
    }

    let output = [];
    for (i = 0; i < topmost.length; i++) {
        if (topmost[i].state === states.ACCEPTING) {
            output.push(topmost[i]);
        }
    }
    return topmost;
}






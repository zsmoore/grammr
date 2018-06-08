import { Tokenizer } from 'lexr';
const grammar = {

    S       :   [ [ 'a', 'b', 'c'],
                  [ 'E', 'b', 'd'] ],


    E       :   [ ['a'],
                  ['X']],

    X       :   [ ['e']],
};

const tokens = {
    a   :   /a/,
    b   :   /b/,
    e   :   /e/,
    c   :   /c/,
    d   :   /d/,
};


const grammar2 = {

    E   :   [ [ 'E', '+', 'E'],
              [ 'E', '-', 'E'],
              [ '(', 'E', ')'],
              [ 'a' ],
              [ 'b' ],
              [ 'c' ],]
};

const tokens2 = {

    a   : /a/,
    b   : /b/,
    c   : /c/,
    '('   : /\(/,
    ')'   : /\)/,
    '+'   : /\+/,
    '-'   : /-/,
};

let input = 'ebd';
let tok = new Tokenizer("");
tok.addTokenSet(tokens);
let output = tok.tokenize(input);

let input2 = 'a+b+c-a+(a+b)';
let tok2 = new Tokenizer("");
tok2.addTokenSet(tokens2);
let output2 = tok2.tokenize(input2);


function checkCollisions(tokens, grammar) {
    for (let key in tokens) {
        if (key in grammar) {
            throw "Collision";
        }
    }
}

function findTok(parser, currProd, currGram, tok) {
    
    let poss = parser.grammar[currProd];
    for (let i = 0; i < poss.length; i++) {
        let rule = poss[i];
        if (rule[currGram.length] === tok) {
            currGram.push(tok);
            return currGram;
        } 
    }
    
    for (let i = 0; i < poss.length; i++) {
        let rule = poss[i];
        if (rule[currGram.length] in parser.grammar) {
            let out = findTok(parser, rule[currGram.length], [], tok);
            if (out !== null) {
                return currGram.concat(out);
            }
        }
    }
    

    return null;
}

function parse(parser, inputTokens) {
    
    let prod = parser.start;
    let currGram = [];
    while(inputTokens.length !== 0) {
        let tok = inputTokens.shift();
        
        currGram = findTok(parser, prod, currGram, tok.token);
    }
    return currGram;
}


class Parser {

    constructor(tokens, grammar, start) {
        checkCollisions(tokens, grammar);

        this.tokens = tokens;
        this.grammar = grammar;
        this.start = start
    }
    
    parse(inputTokens) {
        return parse(this, inputTokens);
    }
};


let par = new Parser(tokens, grammar, 'S');
console.log(par.parse(output));
console.log(output2);

let par2 = new Parser(tokens2, grammar2, 'E');
console.log(par2.parse(output2));

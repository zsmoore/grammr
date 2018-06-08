import { Tokenizer } from 'lexr';
import { UnexpectedRuleItem } from "../exceptions/exception.js";

const grammar = {

    E       :   [ [ 'E', 'PLUS', 'T' ],
                  [ 'T'              ] ],


    T       :   [ [ 'ZERO' ] ],
};

const tokens = {
    ZERO    : /0/,
    PLUS    : /+/,
};


let input = '000000000000';
let tok = new Tokenizer("");
tok.addTokenSet(tokens);
let output = tok.tokenize(input);

let gramOut = [];
while (output) {
    let matchNum = 0;
    let grammPat = "";
    let buffer = [];
    for (let gram in grammar) {
        let rule = grammar[gram];
        for (let i = 0; i < rule.length; i++) {            
            let subRule = rule[i];
            for (let j = 0; j < subRule.length; j++) {
                if (subRule[j] in tokens) {
                    if (subRule[j] !== output[j]) {
                        break;
                    }

                    buffer.push(subRule[j]);
                    matchNum += 1;
                } else if (subRule[j] in grammar) {
                    
                } else {
                    throw new UnexpectedRuleItem(subRule[j]);
                }
            }
        }
    }
}

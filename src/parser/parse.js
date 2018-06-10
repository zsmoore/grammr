import {parseBNF} from 'grammr2json';
import {languages} from '../grammar/languages/languageEnum.js';

class NonTerm {

    constructor(rules) {
        this.parentTree = undefined;
        this.rules = rules;
        this.epsilon = this.checkEpsilon();
    }

    setTree(tree) {
        this.parentTree = tree;
    }

    isRuleEpsilon (rule) {
        return rule.length === 1 && rule[0] === '';
    }

    checkEpsilon() {
       for(let i = 0; i < this.rules.length; i++) {
           if (this.isRuleEpsilon(this.rules[i])) return true;
       }
        return false;    
    }
    
    
    parseSelf(tokenList) {
        
        for(let i = 0; i < this.rules.length; i++) {        
            let rule = this.rules[i];
            if (this.isRuleEpsilon(rule)) continue;
            let tokenCopy = tokenList.slice();
            let parsed = true;
            for(let j = 0; j < rule.length; j++) {
                let sym = rule[j];            
                if (this.parentTree.hasTerm(sym)) {
                    if (tokenCopy.length == 0) {
                        parsed = false;
                        break;
                    }

                    let token = tokenCopy.shift();
                    if (token !== sym) {
                        parsed = false;
                        break;
                    }
                } else {
                    let parseReturn = this.parentTree.getNonTerm(sym).parseSelf(tokenCopy);
                    if (parseReturn === null) {
                        parsed = false;
                        break;
                    } else {
                        tokenCopy = parseReturn;
                    }
                }
            }
            if (parsed) return tokenCopy;
        }
        if (this.epsilon) return tokenList;
        return null;
    }
}

class GrammarTree {

    constructor(grammar, startSymbol) {
        this.grammar = grammar;
        this.startSymbol = startSymbol;
        this.nonTerminals = this.makeNodes();
        Object.values(this.nonTerminals).map(node => node.setTree(this));
    }

    makeNodes() {
        let nodes = {};
        Object.keys(this.grammar).forEach(nonTerm => {
          let node = new NonTerm(this.grammar[nonTerm]);  
          nodes[nonTerm] = node;
        })
        return nodes;
    }

    getNonTerm(symbol) {
        return this.nonTerminals[symbol];
    }

    parseTokens(tokenList) {        
        let start = this.nonTerminals[this.startSymbol];
        let result = start.parseSelf(tokenList);
        return result !== null && result.length === 0;
    }

    hasTerm(terminal) {
        return !Object.keys(this.nonTerminals).includes(terminal);
    }
}

let start = 'S';
let tokens = ['a'];
let a = new GrammarTree(languages.UnevenAB, start);
//console.log(a.parseTokens(tokens));



const testing = `<postalcode>           ::= <forwardsortationarea> <localdeliveryunit>

<forwardsortationarea> ::= <provarea> <loctype> <letter>

<localdeliveryunit>    ::= <digit> <letter> <digit>

<provarea>             ::= A | B | C | E | G | H | J | K | L | M | N | 
                           P | R | S | T | V | X | Y

<loctype>              ::= <rural> | <urban>

<rural>                ::= 0

<urban>                ::= 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

<letter>               ::= A | B | C | E | G | H | J | K | L | M | N | 
                           P | R | S | T | V | W | X | Y | Z

<digit>                ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`;

let start2 = 'postalcode';
let input = `  K1N6N5
M5W2E4
X0A1A1`;

input = input.trim().split('\n').map(line => line.trim().split(''));
//console.log(input);
//let transformedGram = parseBNF(testing, true);
//let b = new GrammarTree(transformedGram, start2);
//Object.values(b.nonTerminals).map(node => console.log(node.rules));
//console.log(Object.keys(b.nonTerminals));
//input = input.map(sentence => b.parseTokens(sentence));
//input.map(console.log);


module.exports = GrammarTree;
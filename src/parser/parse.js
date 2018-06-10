
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

    constructor(grammar, startSymbol, terminals) {
        this.grammar = grammar;
        this.startSymbol = startSymbol;
        this.terminals = terminals;
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
        return this.terminals.includes(terminal);
    }
}

let start = 'S';
let terminals = ['a', 'b'];
let tokens = ['a'];
let a = new GrammarTree(UNEVEN_AB, start, terminals);
console.log(a.parseTokens(tokens));

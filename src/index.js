const Parser = require('./parser/parse.js');
module.exports.Parser = Parser;

import {Tokenizer} from 'lexr';
import {languages, startSymbols} from './grammar/languages/languageEnum.js';


let gram = languages.Json;
let s = startSymbols.Json;

let tok = new Tokenizer("Json");
tok.ignoreWhiteSpace();
tok.ignoreNewLine();
let input = `{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}`;

let tokens = tok.tokenize(input);
let onlyNames = tokens.map(obj => obj.token);

let parse = new Parser(gram, s);
console.log(parse.parseTokens(onlyNames));
import { languages } from "./languages/languageEnum.js";
import { languageNotFoundException } from "../exceptions/exception.js";
import { Tokenizer } from 'lexr';

class Parser {

    constructor(language) {
        if (language == "") {
            this.grammar = {};
            this.tokens = {};
            this.language = "Custom";
        } else if (!(language in languages)) {
            throw new languageNotFoundException(language); 
        } else {
            let tok = new Tokenizer(language);
            this.tokens = tok.tokens.keys();
            this.grammar = languages[language];
            this.language = language;
            this.strict = true;
        }
    }


}

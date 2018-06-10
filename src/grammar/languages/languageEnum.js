import { unevenAB } from './simpleGrammar/simpleGrammars'
import {json, start} from './json/json.js';

export const languages = {
    
    UnevenAB        : unevenAB,
    Json            : json,

};

export const startSymbols = {
    Json            :start,
}

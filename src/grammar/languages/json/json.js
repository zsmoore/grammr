import {parseInformalBNF} from 'grammr2json';

const rawJsonGrammar = `object ::= L_BRACE R_BRACE
| L_BRACE members R_BRACE

members ::= pair
| pair COMMA members

pair ::= string COLON value

array ::= L_BRACKET R_BRACKET
| L_BRACKET elements R_BRACKET

elements ::= value
| value COMMA elements

value ::= string
| number
| object
| array
| TRUE
| FALSE
| NULL

string ::= DOUBLE_QUOTE DOUBLE_QUOTE
| DOUBLE_QUOTE chars DOUBLE_QUOTE

chars ::=  CHAR
| CHAR chars

number ::= int
| int frac
| int exp
| int frac exp

int ::= DIGIT
| DIGIT1To9 digits
| NEGATIVE DIGIT
| NEGATIVE DIGIT1To9 digits

frac ::= DOT digits

exp ::= E digits

digits ::= DIGIT
| DIGIT digits`;

export const json = parseInformalBNF(rawJsonGrammar, true);
export const start = 'object';
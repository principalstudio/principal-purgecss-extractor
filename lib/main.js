"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_lexer_1 = __importDefault(require("pug-lexer"));
const bem_1 = require("./bem");
const parse_1 = require("./parse");
const principalExtractor = (content) => {
    const tokens = pug_lexer_1.default(content);
    let selectors = new Set();
    for (const token of tokens) {
        switch (token.type) {
            case 'call':
            case 'mixin':
                bem_1.bem(token).forEach(result => selectors.add(result));
                break;
            case 'tag':
            case 'id':
            case 'class':
                selectors.add(token.val);
                break;
            case 'attribute':
                if (token.name === 'class' || token.name === 'id') {
                    const valueParsed = parse_1.parseArgs(token.val).flat();
                    if (Array.isArray(valueParsed)) {
                        valueParsed.forEach(v => selectors.add(v));
                    }
                }
                break;
            default:
                break;
        }
    }
    return [...selectors];
};
exports.default = principalExtractor;

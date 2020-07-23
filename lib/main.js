"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const pug_lexer_1 = __importDefault(require("pug-lexer"));
const bem_1 = require("./bem");
const principalExtractor = (content) => {
    const tokens = pug_lexer_1.default(content);
    let selectors = [];
    for (const token of tokens) {
        switch (token.type) {
            case 'call':
                selectors = selectors.concat(bem_1.bem(token));
                break;
            case 'tag':
            case 'id':
            case 'class':
                selectors.push(token.val);
                break;
            case 'attribute':
                if (token.name === 'class' || token.name === 'id') {
                    selectors.push(token.mustEscape ? token.val.replace(/"/g, '') : token.val);
                }
                break;
            default:
                break;
        }
    }
    return selectors;
};
exports.default = principalExtractor;

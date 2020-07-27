"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const acorn_1 = require("acorn");
const util_1 = require("util");
exports.parseArgs = (str) => {
    let args = [];
    const strParsed = acorn_1.parse('[' + str + ']');
    if (strParsed.body.length === 1 && strParsed.body[0].expression) {
        const data = recursiveParse(strParsed.body[0].expression);
        args = util_1.isArray(data) ? data : [];
    }
    return args;
};
function recursiveParse(node) {
    if (node.type === 'Literal') {
        if (node.value) {
            return node.value;
        }
    }
    else if (node.type === 'ArrayExpression') {
        const array = [];
        if (node.elements) {
            node.elements.forEach(node => {
                const data = recursiveParse(node);
                if (data)
                    array.push(data);
            });
        }
        return array;
    }
    else if (node.type === 'ObjectExpression') {
        const object = {};
        if (node.properties) {
            node.properties.forEach(node => {
                Object.assign(object, recursiveParse(node));
            });
        }
        return object;
    }
    else if (node.type === 'Property') {
        if (node.value && node.key) {
            const object = {};
            const data = recursiveParse(node.key);
            const key = typeof data === 'string' ? data : null;
            const value = typeof node.value !== 'string' ? recursiveParse(node.value) : null;
            if (key && typeof key === 'string' && value)
                object[key] = value;
            return object;
        }
    }
    else if (node.type === 'ConditionalExpression') {
        if (node.consequent && node.alternate) {
            const consequentData = recursiveParse(node.consequent);
            const alternateData = recursiveParse(node.alternate);
            const array = [];
            if (typeof consequentData === 'string') {
                array.push(consequentData);
            }
            if (typeof alternateData === 'string') {
                array.push(alternateData);
            }
            return array;
        }
    }
    return null;
}

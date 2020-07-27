// Test parse result
// Run with node test/test.js

const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, 'index.pug'));
const lex = require('pug-lexer');
const tokens = lex(data.toString());
const acorn = require('acorn');

function parse(str) {
  let args = [];
  const strParsed = acorn.parse('[' + str + ']');

  if (strParsed.body.length === 1 && strParsed.body[0].expression) {
    args = recursiveParse(strParsed.body[0].expression);
  }

  return args;
}

function recursiveParse(node) {
  if (node.type === 'Literal') {
    return node.value;
  } else if (node.type === 'ArrayExpression') {
    const array = [];
    node.elements.forEach(node => {
      const data = recursiveParse(node);
      if (data)
        array.push(data);
    });
    return array;
  } else if (node.type === 'ObjectExpression') {
    const object = {};
    node.properties.forEach(node => {
      Object.assign(object, recursiveParse(node));
    });
    return object;
  } else if (node.type === 'Property') {
    const object = {};
    const key = recursiveParse(node.key);
    const value = recursiveParse(node.value);

    if (key && value) object[key] = value;

    return object;
  } else if (node.type === 'ConditionalExpression') {
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

  return null;
}

for (const token of tokens) {
  if (token.val === 'b' || token.val === 'e') console.log(parse(token.args));
}
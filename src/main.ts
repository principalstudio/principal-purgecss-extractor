// @ts-ignore
import lex from 'pug-lexer';
import {bem} from './bem';

const principalExtractor = (content: string): string[] => {
  const tokens = lex(content);
  let selectors: string[] = [];
  for (const token of tokens) {
    switch (token.type) {
      case 'call':
        selectors = selectors.concat(bem(token));
        break;
      case 'tag':
      case 'id':
      case 'class':
        selectors.push(token.val);
        break;
      case 'attribute':
        if (token.name === 'class' || token.name === 'id') {
          selectors.push(
            token.mustEscape ? token.val.replace(/"/g, '') : token.val,
          );
        }
        break;
      default:
        break;
    }
  }
  return selectors;
};

export default principalExtractor;

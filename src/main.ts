import lex from 'pug-lexer';
import {bem} from './bem';
import {parseArgs} from './parse';

const principalExtractor = (content: string): string[] => {
  const tokens = lex(content);
  let selectors: Set<string> = new Set();
  for (const token of tokens) {
    switch (token.type) {
      case 'call':
      case 'mixin':
        bem(token).forEach(result => selectors.add(result));
        break;
      case 'tag':
      case 'id':
      case 'class':
        selectors.add(token.val);
        break;
      case 'attribute':
        if (token.name === 'class' || token.name === 'id') {
          const valueParsed = parseArgs(token.val).flat();
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

export default principalExtractor;

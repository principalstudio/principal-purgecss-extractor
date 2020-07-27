import {parseArgs} from './parse';

export const bem = (token: any): any[] => {
  const args = parseArgs(token.args) as any[];

  if (token.val === 'b') {
    return block(args);
  } else if (token.val === 'e') {
    return element(args);
  }

  return [];
};

const block = (args: any[]) => {
  const result: string[] = [];
  const blocks = [args[0]].flat();
  const tags = args[1] ? [args[1]].flat() : ['div'];
  const m = args[2] || null;
  const bp = typeof m === 'object' && !Array.isArray(m) ? m : args[3] || null;

  tags.forEach(t => {
    result.push(t);
  });

  blocks.forEach(b => {
    result.push(b);

    if (m && m.length > 0) {
      if (Array.isArray(m)) {
        m.flat().forEach(val => {
          result.push(b + '--' + val);
        });
      } else {
        result.push(b + '--' + m);
      }
    }

    if (bp) {
      for (const key in bp) {
        if (Object.prototype.hasOwnProperty.call(bp, key)) {
          const val = bp[key];
          result.push(b + '@' + key + '--' + val);
        }
      }
    }
  });

  return result;
};

const element = (args: any[]) => {
  const result: string[] = [];
  const blocks = [args[0]].flat();
  const elements = [args[1]].flat();
  const tags = args[2] ? [args[2]].flat() : ['div'];
  const m = args[3] || [];
  const bp = typeof m === 'object' && !Array.isArray(m) ? m : args[4] || null;

  tags.forEach(t => {
    result.push(t);
  });

  blocks.forEach(b => {
    elements.forEach(e => {
      result.push(b + '__' + e);

      if (m && m.length > 0) {
        if (Array.isArray(m)) {
          m.forEach(val => {
            result.push(b + '__' + e + '--' + val);
          });
        } else {
          result.push(b + '__' + e + '--' + m);
        }
      }

      if (bp) {
        for (const key in bp) {
          if (Object.prototype.hasOwnProperty.call(bp, key)) {
            const val = bp[key];
            result.push(b + '__' + e + '@' + key + '--' + val);
          }
        }
      }
    });
  });

  return result;
};

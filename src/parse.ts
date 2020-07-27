import {parse} from 'acorn';
import {isArray} from 'util';

interface nodeExtended extends acorn.Node {
  key?: nodeExtended;
  value?: nodeExtended | string;
  elements?: nodeExtended[];
  body?: any;
  properties?: nodeExtended[];
  consequent?: nodeExtended;
  alternate?: nodeExtended;
}

export const parseArgs = (str: string) => {
  let args = [];
  const strParsed = parse('[' + str + ']') as nodeExtended;

  if (strParsed.body.length === 1 && strParsed.body[0].expression) {
    const data = recursiveParse(strParsed.body[0].expression);
    args = isArray(data) ? data : [];
  }

  return args;
};

function recursiveParse(
  node: nodeExtended,
): string | any[] | Record<string, any> | null {
  if (node.type === 'Literal') {
    if (node.value) {
      return node.value;
    }
  } else if (node.type === 'ArrayExpression') {
    const array: any[] = [];
    if (node.elements) {
      node.elements.forEach(node => {
        const data = recursiveParse(node);
        if (data) array.push(data);
      });
    }
    return array;
  } else if (node.type === 'ObjectExpression') {
    const object = {};
    if (node.properties) {
      node.properties.forEach(node => {
        Object.assign(object, recursiveParse(node));
      });
    }
    return object;
  } else if (node.type === 'Property') {
    if (node.value && node.key) {
      const object: Record<string, any> = {};
      const data = recursiveParse(node.key);
      const key: string | null = typeof data === 'string' ? data : null;
      const value: string | any[] | Record<string, any> | null =
        typeof node.value !== 'string' ? recursiveParse(node.value) : null;

      if (key && typeof key === 'string' && value) object[key] = value;

      return object;
    }
  } else if (node.type === 'ConditionalExpression') {
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

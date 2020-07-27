import principalExtractor from './../src/main';
import fs from 'fs';
import path from 'path';

const expected = [
  'header',
  'header--home',
  'header--test',
  'header--test2',
  'h1',
  'p',
  'header__title',
  'header__title--big',
  'div',
  'pill',
  'main',
  'hello-world',
  'gold',
  'grid',
  'grid--map',
  'class-attr-array',
  'grid__area',
  'grid__area--map',
  'grid__area@grid-big--test',
  'footer',
  'nav',
  'footer__menu',
  'ul',
  'list',
  'list--footer',
  'class-attr',
  'li',
  'list__item',
  'footer__copyrights',
];

describe('principalPurgeCSSExtractor', () => {
  it('find right class/id/bem', async () => {
    const data = fs.readFileSync(path.resolve(__dirname, 'index.pug'));
    const extract = principalExtractor(data.toString());
    expect(extract).toStrictEqual(expected);
  });
});

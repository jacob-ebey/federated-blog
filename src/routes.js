const isNode = (typeof process !== 'undefined') && (process.release.name === 'node');

const React = isNode ? undefined : require('react');
const HomePage = isNode ? undefined : React.lazy(() => import('./pages/home'));
const navItems = isNode ? undefined : require('./nav-items').default;
const BlogPost = isNode ? undefined : React.lazy(() => import('federated_library_boilerplate/ArticlePage'));

let keys = [];
let webpackRequireContext;

if (isNode) {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(path.join(__dirname, './pages'));

  
  for (const file of files) {
    if (file.includes('.md')) {
      keys.push(path.basename(file, '.md'));
    }
  }
} else {
  // @ts-ignore
  webpackRequireContext = require.context('!markdown-with-front-matter-loader!./pages', false, /.md$/);
  keys = webpackRequireContext.keys();
}

const blogs = keys.reduce(
  (memo, fileName) => ({
    ...memo,
    [(fileName.match(/.\/([^.]+).*/) && fileName.match(/.\/([^.]+).*/)[1]) || fileName]: !isNode ? webpackRequireContext(fileName) : undefined
  }),
  {}
);

const routes = [
  {
    path: '/',
    component: () => React.createElement(HomePage, { blogs }),
  },
  ...Object.keys(blogs).map(key => ({
    path: `/blog/${key}`,
    component: () => React.createElement(BlogPost, {
      title: blogs[key].title,
      secondaryTitle: blogs[key].secondaryTitle,
      menuItems: navItems.menuItems,
      secondaryMenuItems: navItems.secondaryMenuItems,
    }, React.createElement('article', { dangerouslySetInnerHTML: { __html: blogs[key].__content }})),
  })),
];

module.exports = routes;

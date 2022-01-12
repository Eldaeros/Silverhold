/**
 * @file Builds the blog pages from the .md files
 */

const matter = require('gray-matter');
const stringifyObject = require('stringify-object');

module.exports = async function (src) {
    const callback = this.async();
    const { content, data } = matter(src);

    const code = `import Blog from '../../pages/blog';
export const frontMatter = ${stringifyObject(data)};
export default ({ children }) => <Blog meta={frontMatter}>{children}</Blog>;

${content}`;
    return callback(null, code);
};

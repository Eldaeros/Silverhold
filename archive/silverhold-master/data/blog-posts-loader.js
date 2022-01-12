/**
 * @file Loads and returns blog posts, including meta data.
 */

const fs = require('fs');
const path = require('path');
const DIR = path.join(process.cwd(), './pages/blog/');
const files = fs.readdirSync(DIR).filter((file) => file.endsWith('.md'));
const matter = require('gray-matter');

module.exports = files.map((file) => {
    const name = path.join(DIR, file);
    const contents = fs.readFileSync(name, 'utf8');
    const { content, data } = matter(contents);
    const metadata = data;
    return {
        ...metadata,
        path: '/blog/' + file.replace(/\.mdx?$/, '')
    };
});

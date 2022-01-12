/**
 * @file Pre-evaluate blog page contents on the server,
 * before they're served to the client, so that we can display previews of
 * the blog content.
 */

import preval from 'babel-plugin-preval/macro';
const posts = preval`module.exports = require('./blog-posts-loader.js');`;

export interface Post {
    layout: string;
    title: string;
    path: string;
    summary?: string;
    banner?: string;
    published?: boolean;
    publishedAt?: string;
}

export default posts as Array<Post>;

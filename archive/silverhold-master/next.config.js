const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
});
const path = require('path');

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx|\.md/,
            use: [path.join(__dirname, './data/mdx-fm-loader')]
        });

        return config;
    }
});

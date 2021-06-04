const BlogConfig = require('./blog.config').default;

const postcssPathReplaceOptionMap = {
    production: {
        matched: '/docs',
        publicPath: BlogConfig.assetBase,
        mode: 'replace',
    },
};

module.exports = ({ env }) => ({
    plugins: [
        require('postcss-import')({
            plugins: [
                require('stylelint'),
            ],
        }),
        require('postcss-custom-media'),
        require('postcss-color-mod-function'),
        require('postcss-mixins'),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
            },
        }),
        require('postcss-path-replace')(postcssPathReplaceOptionMap[env] ?? {}),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
        require('postcss-reporter'),
    ],
});

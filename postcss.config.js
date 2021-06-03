module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
            },
        }),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};

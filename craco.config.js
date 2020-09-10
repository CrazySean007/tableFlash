const CracoLessPlugin = require('craco-less');
const {fixBabelImports} = require('customize-cra');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: fixBabelImports,
            options: {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        },
    ],
};
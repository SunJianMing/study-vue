const VueServerRenderer = require('vue-server-renderer/server-plugin')
const VueClientRenderer = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const merge = require('lodash.merge')
const WEBPACK_NODE = process.env.WEBPACK_TAEGET === 'node'
const target = WEBPACK_NODE ? 'server' : 'client'

module.exports = {
    css:{
        extract:false
    },
    outputDir:path.resolve(__dirname,'./dist/'+target),
    configureWebpack:()=>({
        entry:'./src/entry-'+target+'.js',
        target:WEBPACK_NODE?"node":"web",
        node:WEBPACK_NODE?undefined:false,
        devtool:"source-map",
        output:{
            libraryTarget:WEBPACK_NODE?"commonjs2":undefined
        },
        externals:WEBPACK_NODE ? nodeExternals({
            allowlist:/\.css$/
        }):undefined,
        plugins:[WEBPACK_NODE?new VueServerRenderer() : new VueClientRenderer()]
    }),
    chainWebpack:config=>{
        if(WEBPACK_NODE){
            config.optimization.delete('splitChunks')
        }
        config.module.rule('vue').use('vue-loader').tap(options=>{
            merge(options,{optimizeSSR:false})
        })
    }

}

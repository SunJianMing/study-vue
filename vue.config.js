const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')

const WEBPACK_TARGET = process.env.WEBPACK_TARGET === 'node'
const target = WEBPACK_TARGET ? 'server' : 'client'

module.exports = {
    css:{
        extract:false
    },
    outputDir:path.join(__dirname,'./dist/'+target),
    configureWebpack:config=>({
        entry:path.join(__dirname,`./src/entry-${target}.js`),
        target:WEBPACK_TARGET?'node':'web',
        devtool:'source-map',
        output:{
            libraryTarget:WEBPACK_TARGET?'commonjs2':undefined
        },
        node:WEBPACK_TARGET?undefined:false,
        externals: WEBPACK_TARGET
        ? nodeExternals({
            allowlist:/\.css$/
        })
        : undefined,
        plugins:[WEBPACK_TARGET ? new VueSSRServerPlugin():new VueSSRClientPlugin()]
    }),
    chainWebpack:config=>{
        if(WEBPACK_TARGET){
            config.optimization.delete('splitChunks')
        }
    }
}
const express = require('express')
const {createBundleRenderer} = require('vue-server-renderer')
const resolve = dir => require('path').resolve(__dirname,dir)
const fs = require('fs')
const app = new express()

app.use(express.static(resolve('../dist/client'),{index:false}))

const isDev = process.env.NODE_ENV === 'development'
let renderer;
function createRenderer(){
    let bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
    const renderer  = createBundleRenderer(bundle,{
        runInNewContext: false,
        template:fs.readFileSync(resolve('../public/index.html'),'utf-8'),
        clientManifest:require(resolve('../dist/client/vue-ssr-client-manifest.json'))
    })
    return renderer
}

if(isDev){
    const child = require('child_process')
    const browser = require('browser-sync').create()
    const chokidar = require("chokidar")
    const watcher = chokidar.watch('src/**/*.*')
    watcher.on('change',path=>{
        console.log(path,'发生变化，正在重新编译。。。')
        child.exec('npm run build',(error,stdout)=>{
            if(error){
                console.log(error.message)
                return
            }
            console.log(stdout)
            console.log('编译完成')
            browser.reload()
        })
    })
    browser.init({proxy:'http://localhost:3000'})
}


// const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
// const renderer = createBundleRenderer(bundle,{
//     runInNewContext:false,
//     template:fs.readFileSync(resolve('../public/index.html'),'utf-8'),
//     clientManifest:require(resolve('../dist/client/vue-ssr-client-manifest.json'))
// })

app.get('*',async (req,res)=>{
    if(isDev || renderer){
        renderer = createRenderer()
    }
    const html = await renderer.renderToString({url:req.url})
    res.send(html)
}).listen(3000,()=>{
    console.log('start 3000')
})
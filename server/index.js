const express = require('express')
const path = require('path')
const fs = require('fs')
const {createBundleRenderer} = require('vue-server-renderer')
const app = express()

app.use(express.static(path.resolve(__dirname,'../dist/client'),{index:false}))
const isDev = process.env.NODE_ENV === 'development'
let renderer;
function createRender(){
    let bundle = path.resolve(__dirname,'../dist/server/vue-ssr-server-bundle.json')
    let renderer = createBundleRenderer(bundle,{
        runInNewContext:false,
        template:fs.readFileSync(path.resolve(__dirname,'../public/index.html'),'utf-8'),
        clientManifest:require(path.resolve(__dirname,'../dist/client/vue-ssr-client-manifest.json'))
    })
    return renderer 
}

if(isDev){
    const child = require('child_process')
    const browser = require('browser-sync').create()
    const chokidar = require('chokidar')
    const watcher = chokidar.watch('src/**/*.*')
    watcher.on('change',path=>{
        console.log(path,'已改变，正在重新构建')
        child.exec('npm run build',(error,stdout)=>{
            if(error){
                console.error("Error",error.stdin);
                return
            }
            console.log(stdout)
            console.log('构建完成')
            browser.reload()
        })

    })
    browser.init({proxy:'http://localhost:3000'})
}

app.get('*',async (req,res)=>{
    if(isDev || !renderer){
        renderer = createRender()
    }
    const html = await renderer.renderToString({
        url:req.url
    })
   
    res.send(html)
})
app.listen(3000)
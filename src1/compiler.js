class Compiler {
    constructor(vm,el){
        this.$vm = vm
        this.$el = document.querySelector(el)
        
        this.compiler(this.$el)
    }
    compiler(el){
        const children = el.childNodes
        // const children1 = el.childNodes

        // console.log(children,children1)
        Array.from(children).forEach(node=>{
            if(this.isElement(node)){
                let attrs = node.attributes
                Array.from(attrs).forEach(attr=>{
                    let attrName = attr.name
                    let arrtValue = attr.value
                    if(this.isDir(attrName)){
                        let dir = attrName.slice(2)
                       
                        this[dir] && this[dir](node,arrtValue)
                    }
                })
                // console.log('结点')
            }
            if(this.isText(node)){
                this.compilerText(node)
            }
            if(node.childNodes){
                this.compiler(node)
            }
        })
    }
    isElement(node){
        return node.nodeType == 1
    }
    isText(node){
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    compilerText(node){
        this.update(node,RegExp.$1,'text')
        // node.textContent = this.$vm[RegExp.$1]
    }

    isDir(attrName){
        return attrName.indexOf('m-') === 0
    }

    text(node,exp){
        this.update(node,exp,'text')
       
    }

    html(node,exp){
        node.innerHTML = this.$vm[exp]
    }
    update(node,exp,dir){
        let fn = this[dir+'Update']
        fn && fn(node,this.$vm[exp])
        new Watcher(this.$vm,exp,function(val){
            fn && fn(node,val)
        })
    }
    textUpdate(node,val){
        node.textContent = val
    }
}


class Compiler {
    constructor(vm,el) {
       this.$vm = vm
       this.$el = document.querySelector(el)
       this.compilation(this.$el)
    }
    compilation(node){
        const childNodes = node.childNodes
        Array.prototype.forEach.call(childNodes,node=>{
            if(this.isElement(node)){
                let attrs = node.attributes;
                [].forEach.call(attrs,attr=>{
                    let {name:attrName,value:exp} = attr
                    if(this.isDir(attrName)){
                        let dir = attrName.slice(2)
                        this[dir] && this[dir](node,exp)
                    }
                    if(this.isClick(attrName)){
                        let dir = attrName.slice(1)
                        this.addEventListener(node,dir,exp)
                    }
                })
            }
            if(this.isProel(node)){
                this.compileText(node)
            }
            if(node.childNodes){
                this.compilation(node)
            }
        })
    }
    isElement(node){
        return node.nodeType === 1
    }
    isProel(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    isDir(attrName){
        return attrName.indexOf('m-') === 0
    }
    isClick(attrName){
        return attrName.indexOf('@') === 0
    }


    compileText(node){
        this.update(node,RegExp.$1,'text')
    }
    text(node,exp){
        this.update(node,exp,'text')
    }
    html(node,exp){
        this.update(node,exp,'html')
    }
    update(node,exp,dir){
        const fn = this[dir+'Update']
        fn && fn(node,this.$vm[exp])
        new Watcher(this.$vm,exp,function(val){
            fn && fn(node,val)
        })

    }
    textUpdate(node,val){
        node.textContent = val
    }
    htmlUpdate(node,val){
        node.innerHTML = val
    }

    //事件
    addEventListener(node,event,exp){
        node.addEventListener(event,this.$vm.$options.methods[exp].bind(this.$vm))
    }
}
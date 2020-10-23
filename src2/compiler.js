class Compiler {
    constructor(vm,el){
        this.$vm = vm
        this.$el = document.querySelector(el)
        this.compiation(this.$el)
    }
    compiation(node){
        const childNodes = node.childNodes
        // console.log(childNodes)
        Array.from(childNodes).forEach(node=>{
            if(this.isElement(node)){
                const  attrs = node.attributes
                Array.from(attrs).forEach(attr=>{
                    let attrName = attr.name
                    let exp = attr.value
                    if(this.isDir(attrName)){
                        let dir = attrName.slice(2)
                        this[dir] && this[dir](node,exp)
                    }
                })
            }
            if(this.isInprol(node)){
                this.compileText(node)
            }
            if(node.childNodes){
                this.compiation(node)
            }
        })
    }
    isElement(node){
        return node.nodeType === 1
    }
    isInprol(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    isDir(attrName){
        return attrName.indexOf('m-') === 0
    }

    html(node,exp){
        this.update(node,exp,'html')
    }

    //文本更新 {{}}
    text(node,exp){
        this.update(node,exp,'text')
    }
    compileText(node){
        this.update(node,RegExp.$1,'text')
    }
    //更新器
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


}
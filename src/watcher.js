class Dep {
    constructor(){
        this.deps = []
    }
    addDep(watcher){
        this.deps.push(watcher)
    }
    notify(){
        this.deps.forEach(w=>w.update())
    }
}

class Watcher {
    constructor(vm,exp,updater){
        this.vm = vm
        this.exp = exp
        this.updater = updater

        Dep.target = this
        this.vm[this.exp]
        Dep.target = null
    }

    update(){
        this.updater.call(this.vm,this.vm[this.exp])
    }
}
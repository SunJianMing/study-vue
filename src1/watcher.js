class Dep {
    constructor(){
        this.dependcies = []
    }
    addDep(watcher){
        this.dependcies.push(watcher)
    }
    notify(){
        this.dependcies.forEach(watcher=>watcher.update())
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

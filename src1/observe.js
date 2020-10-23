function observe(obj){
    if(typeof obj !== 'object' || obj == null){
        return
    }
    new Observer(obj)
}
function defineReactive(obj,key,val){
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj,key,{
        get(){
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal){
            if(val !== newVal){
                val = newVal
                dep.notify()
            }
        }
    })
}


function proxy(vm,prop){
    Object.keys(vm[prop]).forEach(key=>{
        Object.defineProperty(vm,key,{
            get(){
                return vm[prop][key]
            },
            set(newVal){
                    vm[prop][key] = newVal
            }
        })
    })
}
class Observer {
    constructor(value){
        this.$value = value
        this.fial(value)
    }
    fial(value){
        Object.keys(value).forEach(key=>{
            defineReactive(value,key,value[key])
        })
    }
}
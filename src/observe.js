function observe(obj){
    if(typeof obj !== 'object' || obj == null){
        return
    }
    new Observe(obj)
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
                observe(newVal)
                val = newVal
                dep.notify()
            }
        }
    })
}
class Observe {
    constructor(value){
        this.fail(value)
    }
    fail(obj){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key])
        })
    }
}

const obj = {foo:'foo',far:{a:1}}

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
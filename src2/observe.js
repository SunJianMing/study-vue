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



function defineReactive(obj,key,val){
    new Object(val)
    const dep = new Dep()
    Object.defineProperty(obj,key,{
        get(){
            Dep.target && dep.addDep(Dep.target)
            // console.log('get',key,val)
            return val
        },
        set(newVal){
            if(val !== newVal){
                new Object(newVal)
                val = newVal

                dep.notify()
            }
        }
    })
}
class Observe {
    constructor(obj){

        this.fail(obj)
    }
    fail(obj){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key])
        })
    }
}
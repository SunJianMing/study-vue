function observe(obj){
    if(typeof obj !== 'object' || obj == null) {
        return;
    }
    Object.keys(obj).forEach(key=>{
        defineReactive(obj,key,obj[key])
    })
}
function defineReactive(obj,key,val){
    observe(val)
    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key,val)
            return val
        },
        set(newVal){
            if(newVal !== val){
                console.log('set',key,newVal)
                observe(newVal)
                val = newVal
            }

        }
    })
}
function set(obj,key,val){
    defineReactive(obj,key,val)
}
const obj = {foo:"foo",baz:{a:1}}
observe(obj)

obj.foo
obj.foo = 'f00000'
obj.baz.a = 10
set(obj,'bbb','bbb')
obj.bbb
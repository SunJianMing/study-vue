let Vue
class Store {
    constructor(options){
       
       
        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappGetters = options.getters
        Vue.util.defineReactive(this,'state',options.state)
        let store = this
        const computed = {}
        this.getters = {}
        Object.keys(this._wrappGetters).forEach(key=>{
            
            let fn = store._wrappGetters[key]
            
            computed[key] = function(){
              return  fn(store.state)
            }
            
            Object.defineProperty(store.getters,key,{
                get(){
                    return computed[key]()
                }
            })
        })
        // console.log(computed['doubleCount']())
       
        let {commit,dispatch} = store 
        this.commit = function(type,payload){
            commit.call(store,type,payload)
        }
        this.dispatch = function(type,payload){
            dispatch.call(store,type,payload)
        }
    }
    commit(type,payload){
        this._mutations[type](this.state,payload)
    }
    dispatch(type,payload){
        this._actions[type](this,payload)
    }
    
}
function install(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}
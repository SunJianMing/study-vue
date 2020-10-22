import routerLink from './router-link.js'
import routerView from './router-view.js'
let Vue;
class VueRouter {
    constructor(options){
        this.$options = options
        this.current = location.hash.slice(1) || '/'
        Vue.util.defineReactive(this,'matched',[])
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))

        this.match()
    }
    onHashChange(){
      
        this.current = location.hash.slice(1)
        this.matched = []
        this.match()
    }
    match(routes){
        routes = routes || this.$options.routes
        for (const route of routes) {
            if(route.path === '/' && this.current === '/'){
                this.matched.push(route)
                return
            }
            if(route.path !== '/' && this.current.indexOf(route.path) > -1){
                this.matched.push(route)
                if(route.children){
                    this.match(route.children)
                }
                return
            }
        }
    }
}
VueRouter.install = function(_Vue){
    Vue = _Vue
   
    Vue.mixin({
        beforeCreate(){
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component('router-link',routerLink)
    Vue.component('router-view',routerView)
}

export default VueRouter
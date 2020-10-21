

import Vue from 'vue'
export default function create(component,props){
//    const vm =  new Vue({
//         render(h){
//             return h(component,{props})
//         }
//     })
//     vm.$mount()
//     document.body.appendChild(vm.$el)
//     const comp = vm.$children[0]
//     comp.remove = function(){
//         document.body.removeChild(vm.$el)
//         comp.$destroy()
//     }
//     return comp


// extend方法创建
    const Comp = Vue.extend(component)
    const comp = new Comp({propsData:props})
    comp.$mount()
    document.body.appendChild(comp.$el)
    comp.remove = function (){
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    return comp
}
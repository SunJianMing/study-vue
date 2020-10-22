// export default {
//     render(h){
//         this.$vnode.data.routerView = true

//         let parent = this.$parent
//         let depth = 0
//         while(parent){
//             let dataView = parent.$vnode && parent.$vnode.data
//             if(dataView){
//                 if(dataView.routerView){
//                     depth++
//                 }
//             }
//             parent = parent.$parent
//         }


//         let compnent = null
//         let route = this.$router.matched[depth]
//         console.log(route)
//         if(route){
//             compnent = route.component
//         }
//         return h(compnent)
//     }
// }

export default {
    functional:true,
    render(_,{props,children,parent,data}){
      //标记当前router-view
      data.routerView = true
      // 保存路由实例对象
      const route = parent.$router
      
      const h = parent.$createElement;
      let depth = 0 //深度
      
      while(parent){
        const viewData = parent.$vnode ? parent.$vnode.data : {}
        if(viewData.routerView){
          depth++
        }
        parent = parent.$parent
      }
      
      
      const matched = route.matched[depth]
      const component = matched ? matched.component : null
      return h(component,data,children)
    }
  }
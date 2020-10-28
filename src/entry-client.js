import {createApp} from './main'
let {app,router,store} = createApp()
store.replaceState(window.__INITIAL_STATE__)
router.onReady(()=>{
    app.$mount('#app')
})
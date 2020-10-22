import Vue from 'vue'
import Vuex from '../mvuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count:1
    },
    mutations:{
        add(state){
            state.count += 1
        }
    },
    actions:{
        asyAdd({commit}){
            setTimeout(()=>{
                commit('add')
            },1000)
        }
    },
    getters:{
        doubleCount(state){
            return state.count * 2
        }
    }
})

export default store
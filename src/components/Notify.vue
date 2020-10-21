<!--
 * @Author: sjm
 * @Date: 2020-10-21 14:24:02
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-21 14:45:02
 * @FilePath: /v1/src/components/Notify.vue
-->
<template>
    <div class='notify' v-if='isShow'>
        <div class="title">{{title}}</div>
        <div class="content">{{content}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:''
            },
            content:{
                type:String,
                default:''
            },
            duration:{
                type:Number,
                default:2000
            }
        },
        data(){
            return {
                isShow:false
            }
        },
        methods: {
            show() {
                this.isShow = true
                setTimeout(()=>{
                    this.hide()

                },this.duration)
            },
            hide(){
                this.isShow = false
                this.remove()
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
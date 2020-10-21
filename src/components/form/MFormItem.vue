<!--
 * @Author: sjm
 * @Date: 2020-10-21 10:28:57
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-21 11:15:18
 * @FilePath: /v1/src/components/form/MFormItem.vue
-->
<template>
    <div>
        <label>{{label}}</label>
        <slot></slot>
        <p v-if='error'>{{error}}</p>
    </div>
</template>

<script>
    import emitter from '../../mixins/emitter'
    import Schema from 'async-validator'
    export default {
        componentName:"FormItem",
        props:['prop','label'],
        inject:['app'],
        mixins:[emitter],
        data(){
            return {
                error:""
            }
        },
        mounted(){
            this.$on('validate',()=>{
                this.validate()
            })
            if(this.prop){
                 this.dispatch('MForm','addFiled',[this])
            }
           
        },
        destroyed(){
            this.file = []
        },
        methods:{
            validate(){
                let rules = this.app.rules[this.prop]
                let value = this.app.model[this.prop]

                let validator = new Schema({[this.prop]:rules})
                return new Promise((resolve,reject)=>{
                    validator.validate({[this.prop]:value},(errors)=>{
                    if(errors){
                        this.error = errors[0].message
                        reject()
                    }else{
                        this.error = ''
                        resolve()
                    }
                })
                })
                
            }
        }
    }
</script>

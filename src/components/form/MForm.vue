<!--
 * @Author: sjm
 * @Date: 2020-10-21 10:30:59
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-21 11:12:44
 * @FilePath: /v1/src/components/form/MForm.vue
-->
<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        componentName:"MForm",
        props:['model','rules'],
        data(){
            return {
                filed:[]
            }
        },
        provide(){
            return {
                app:this
            }
        },
        created(){
            this.$on('addFiled',filed=>{
              
                this.filed.push(filed)
            })
        },
        methods: {
            validate(cb) {
                
                let staks = this.filed
                            .map(item=>item.validate())
                Promise.all(staks).then((d)=>{
                    console.log(d)
                    cb(true)
                }).catch(()=>{
                    cb(false)
                })
            }
        },
    }
</script>
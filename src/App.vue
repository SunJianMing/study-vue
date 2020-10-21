<template>
    <div id='app'>
        <m-form :model='model' :rules='rules' ref='login'>
            <m-form-item prop='username' label='用户名'>
                <m-input v-model='model.username' placeholder='请输入用户名'></m-input>
            </m-form-item>
             <m-form-item prop='password' label='密码'>
                <m-input type='password' v-model='model.password' placeholder='请输入密码'></m-input>
            </m-form-item>
             <m-form-item >
               <button @click='onSubmit'> 登录</button>
            </m-form-item>
        </m-form>
        <nodeTest></nodeTest>
    </div>
</template>

<script>
    import MInput from './components/form/Minput.vue'
    import MFormItem from './components/form/MFormItem.vue'
    import MForm from './components/form/MForm.vue'
    import Notify from './components/Notify'

    import nodeTest from './components/recursion/NodeTest'
    export default {
        data() {
            return {
              model:{
                username:"",
                password:""
              },
              rules:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}]
              }
            }
        },
        components : {
            MInput,
            MFormItem,
            MForm,
            nodeTest
        },
        methods:{
          onSubmit(){
            this.$refs.login.validate(valid=>{
              if(valid){
                console.log('success')
              }else{
                // console.log('fail')
                this.$create(Notify,{
                  title:"？？？",
                  content:'xxxxxxx'
                }).show()
              }
            })
          }
        }
    }
</script>
<style>
    /* #app {
        display: flex;
        justify-content: center;

    } */

</style>
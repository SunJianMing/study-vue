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
<<<<<<< HEAD
        <nodeTest></nodeTest>
=======
>>>>>>> a1af10abe18bb99683da8aad60b1408983865b5f
    </div>
</template>

<script>
    import MInput from './components/form/Minput.vue'
    import MFormItem from './components/form/MFormItem.vue'
    import MForm from './components/form/MForm.vue'
    import Notify from './components/Notify'
<<<<<<< HEAD

    import nodeTest from './components/recursion/NodeTest'
=======
>>>>>>> a1af10abe18bb99683da8aad60b1408983865b5f
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
<<<<<<< HEAD
            MForm,
            nodeTest
=======
            MForm
>>>>>>> a1af10abe18bb99683da8aad60b1408983865b5f
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
<<<<<<< HEAD
    /* #app {
        display: flex;
        justify-content: center;

    } */
=======
    #app {
        display: flex;
        justify-content: center;

    }
>>>>>>> a1af10abe18bb99683da8aad60b1408983865b5f

</style>
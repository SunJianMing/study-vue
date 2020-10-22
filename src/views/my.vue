<!--
 * @Author: sjm
 * @Date: 2020-10-21 23:20:21
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-22 15:55:49
 * @FilePath: /v1/src/views/my.vue
-->
<template>
    <div>
        <p @click='$store.commit("add")'>{{$store.state.count}}</p>
        {{$store.getters.doubleCount}}
        <button @click='$store.dispatch("asyAdd")'>asyAdd</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>
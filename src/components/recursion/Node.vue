<!--
 * @Author: sjm
 * @Date: 2020-10-21 15:11:28
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-21 15:37:37
 * @FilePath: /v1/src/components/recursion/Node.vue
-->
<template>
    <div>
        <h3 :style='{textIndent:indent+"em"}'>{{data.name}}</h3>
        <Node v-for='n in data.children' :key='n.name' :data='n' :level='level+1'></Node>
    </div>
</template>

<script>
    export default {
         name:"Node",
         props:{
             data:{
                 type:Object,
                 require:true
             },
             level:{
                 type:Number,
                 default:0
             }
         },
         computed: {
             indent() {
                 return this.level * 2 
             }
         },
    }
</script>

<style  scoped>

</style>
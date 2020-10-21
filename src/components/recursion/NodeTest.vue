<!--
 * @Author: sjm
 * @Date: 2020-10-21 15:27:17
 * @LastEditors: sjm
 * @LastEditTime: 2020-10-21 15:29:35
 * @FilePath: /v1/src/components/recursion/NodeTest.vue
-->
<template>
    <div>
        <Node :data='folder'></Node>
    </div>
</template>

<script>
import Node from './Node'
    export default {
        data() {
            return {
                folder: {
                    name:'vue-study',
                    children:[{
                        name:'src',
                        children:[{
                            name:'main.js'
                        },{
                            name:'package.json'
                        }]
                    }]
                }
            }
        },
        components: {
            Node,
        },
    }
</script>

<style lang="scss" scoped>

</style>
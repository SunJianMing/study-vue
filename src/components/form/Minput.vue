<template>
    <input type="text" :value='value' @input='onInput' v-bind='$attrs'>
</template>

<script>
    import emitter from '../../mixins/emitter'
    export default {
        mixins:[emitter],
        props:{
            value:{
                type: String,
                default: ''
            }
        },
        methods: {
            onInput(e) {
                this.$emit('input',e.target.value)
                this.dispatch('FormItem','validate')
            }
        },

    }
</script>

class MVue {
    constructor(options){
        this.$data = options.data
        //数据响应式
        observe(this.$data)
        //代理
        proxy(this,'$data')


        //模版编译器
        new Compiler(this,options.el)
    }
}
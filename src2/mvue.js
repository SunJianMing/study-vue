class MVue {
    constructor(options){
        this.$optins = options
        this.$data = options.data
        
        //数据响应式
        new Observe(this.$data)
        proxy(this,'$data')

        //模版编译器
        new Compiler(this,options.el)
    }
}
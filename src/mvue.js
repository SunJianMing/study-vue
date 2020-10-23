class MVue {
    constructor(options){
        this.$options = options
        this.$data = options.data
        this._methods = options.methods
        observe(this.$data)
        proxy(this,'$data')
        proxy(this,'_methods')

        new Compiler(this,options.el)
    }
}
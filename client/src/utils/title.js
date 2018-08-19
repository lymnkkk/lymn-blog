function getTitle(vm){
    const { title }=vm.$options
    if(title){
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

const serverTitleMixin={
    created(){
        const title=getTitle(this)
        if(title){
            //通过this.$ssrContext来直接访问组件中的服务器渲染上下文(SSR context)
            this.$ssrContext.title=`${title} | Lymn's Blog`
        }
    }
}

const clientTitleMixin={
    mounted(){
        const title=getTitle(this)
        if(title){
            document.title=`${title} | Lymn's Blog`
        }
    }
}

export default process.env.NODE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin
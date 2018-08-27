'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// const isDev=process.env.NODE_ENV!=='production'
const isProd = process.env.NODE_ENV === 'production'
const dev={
  api:'http://localhost:3000/api'
}

const prod={
	api:'http://lymnkkk.cn/api'
}
// const info=isProd ? prod : dev;
// const info=dev
const info=isProd?prod:dev
console.log('api:'+info.api)
export default Object.assign(info,{
  links:{
    github:'https://github.com/lymnkkk',
    email:'843214245@qq.com'
  },
  titleTemplate:" | Lymn's Blog"
})

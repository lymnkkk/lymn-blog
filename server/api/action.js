import Article from '../models/article.js';
import marked from 'marked';


export default model=>{
    return{
        find:async(ctx)=>{
            try{
                const query = ctx.request.query;
                let coditions = query ? query : {};
                // console.log('query:'+query)
                let results =await model.findAll(coditions);
                ctx.body = results;

                /*
                for(let res of results){
                    console.log(JSON.stringify(res));
                }
                */

               console.log('results:'+results);

            }catch(e){
                console.log('find error :'+e);
                
            }
        },
        create:async(ctx)=>{
            try{
                const body=ctx.request.body;
                markdownParse(body);
                const results=await model.create(body);
                ctx.body=results;
                console.log('create results:'+results);
            }catch(e){
                console.log('create error :'+e);
            }
            
        },
        findById:async(ctx)=>{
            try{
                const id=ctx.params.id;
                const result=await model.findById(id);
                if(result){
                    ctx.body=result;
                }
                console.log('id:'+id);
            }catch(e){
                console.log('findById error: '+e);
            }
        },
        updateById:async(ctx)=>{
            try{
                const update_id=ctx.params.id;
                const body=ctx.request.body;
                markdownParse(body);
                const result=await model.update(body,{where:{id:update_id}});
                if(result){
                    ctx.status=204;
                }
                console.log(body);
            }catch(e){
                console.log('update error:'+e);
            }
        },
        deleteById:async(ctx)=>{
            try{
                const delete_id=ctx.params.id;
                const result=await model.destroy({where:{id:delete_id}});
                if(result){
                    ctx.status=204;
                }
            }catch(e){
                console.log('delete error:'+e);
            }
        }
    }
}

function markdownParse(body){
    body.excerptMarkdown=marked(body.excerpt);
    marked.setOptions({
        highlight:function(code){
            return require('highlight.js').highlightAuto(code).value;
        }
    })
    body.contentMarkdown=marked(body.content);
}
import redis from '../db/redis';
import config from '../config/config-redis';
import Token from '../auth';
const admin=config.admin;

export default{
    login:async ctx =>{
        try{
            let error = "";
            if(ctx.request.body.name === admin.name){
                if(ctx.request.body.password === admin.passwd){
                    const token = Token.createToken({ data: admin.name })
                    redis.set(token , admin.name)
                    redis.expire(token , Math.floor( Date.now()/1000 ) + config.expiresIn);
                    console.log('aa');
                    return ctx.body={
                        status:'success',
                        token:token,
                        user:admin.name
                    }
                }else{
                    error='invalid password!';
                }
            }else{
                error="User doesn't exist";
            }

            if(error){
                return ctx.body={
                    status:'fail',
                    message:error
                }
            }
        }catch(e){
            console.log('login error'+e);
        }
    },
    logout:async ctx=>{
        const token = ctx.request.headers['authorization'] || null;
       

        for(let item of ctx.request.headers){
            console.log(item)
        }
        if(!token){
            return ctx.body={
                status:'fail',
                message:'token not found'
            }
        }

        const result=Token.verifyToken(token);

        if(!result){
            return ctx.body={
                status:'fail',
                message:'token verify failed'
            }
        }

        await redis.del(token);
        return ctx.body={
            status:'success',
            message:'token deleted'
        }
    },
    permission:async(ctx,next)=>{
        try{
            
            const token = ctx.request.headers['authorization'] || null;
            // const token=ctx.request.body.token;
            
            /*
            for(let item in ctx.request.headers){
                console.log(item+':'+ctx.request.headers[item]);
            }
            */
            if(!token){
                return ctx.body={
                    status:'fail',
                    message:'token not fail'
                }
            }
            
            const result=Token.verifyToken(token);
            
            if(!result){
                return ctx.body={
                    status:'fail',
                    message:'token verify failed',
                    
                }
            }
            
            const reply = await redis.getAsync(token);
            if(!reply){
                return ctx.body={
                    status:'fail',
                    message:'token invalid'
                }
            }
            /*
            return ctx.body={
                status:reply
            }
            */
            return next();
            
        }catch(e){
            console.log('permission error:'+e);
            return ctx.body={
                status:'fail',
                message:'token verify failed'
            }
        }
    }
}
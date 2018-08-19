
import jwt from 'jsonwebtoken'
import config from '../config/config-redis'

export default {
  createToken (userinfo) {
    return jwt.sign(userinfo, config.authSecret, { expiresIn: config.expiresIn })
  },
  verifyToken (token) {
    if (!token) return false
    try{
      return jwt.verify(token, config.authSecret)
    }catch(err){
      //log.error(err)
      console.log('veriftToken error:'+err);
      return false
    }
  }
}
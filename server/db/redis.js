import redis from 'redis'
import bluebird from 'bluebird'
//import log from '../utils/log'
import { redisConfig } from '../config/config-redis'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient(redisConfig);
//let client = redis.createClient('6379', '127.0.0.1');

client.on("error", function (err) {
    //log.error("Redis Error " + err);
    console.log('Redis Error' + err);
});

client.on('connect', function () {
    //log.info('Redis is ready');
    console.log('Redis is ready');
});

export default client
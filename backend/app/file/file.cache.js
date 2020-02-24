const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

function filesCache(req, res, next) {
    const key = "files";
    client.get(key, (err, data) => {
        if (err) throw err;
        if (data !== null){
            res.send(data);
        } else {
            next();
        }
    }); 
}

module.exports = {
    filesCache: filesCache,
    client: client
}
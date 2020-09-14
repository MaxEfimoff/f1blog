// const mongoose = require('mongoose');
// const redis = require('redis');
// const util = require('util');

// const redisUrl = 'redis://127.0.0.1:6379';
// const client = redis.createClient(redisUrl);
// client.hget = util.promisify(client.hget);
// const exec = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.cache = function (options = {}) {
//   this.useCache = true;
//   this.hashKey = JSON.stringify(options.key || '');

//   console.log('HASH KEY', this.hashKey);
//   return this;
// };

// mongoose.Query.prototype.exec = async function () {
//   // Key for redis
//   const key = {
//     ...this.getQuery(),
//     ...{
//       collection: this.mongooseCollection.name,
//     },
//   };

//   const stringifiedKey = JSON.stringify(key);

//   console.log('KEY1', stringifiedKey);

//   if (this.hashKey == undefined) {
//     this.hashKey = '131351';
//   }

//   // Redis cash value
//   const cacheValue = await client.hget(this.hashKey, stringifiedKey);

//   if (cacheValue) {
//     const doc = JSON.parse(cacheValue);
//     console.log('CASHED VALUE!!!');

//     return Array.isArray(doc)
//       ? doc.map((d) => new this.model(d))
//       : new this.model(doc);
//   }

//   const result = await exec.apply(this, arguments);

//   console.log('RESULT', result);

//   client.hset(this.hashKey, stringifiedKey, JSON.stringify(result), 'EX', 10);

//   return result;
// };

// module.exports = {
//   clearHash(hashKey) {
//     client.del(JSON.stringify(hashKey));
//   },
// };

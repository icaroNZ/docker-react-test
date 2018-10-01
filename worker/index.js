const keys = require('./keys.js');
const redis = require('redis');

console.log('create Redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  console.log(index);
  if (index < 2) return 1;
  const result = fib(index - 1) + fib(index - 2);
  console.log('result: ' + result);
  return result;
}

sub.on('message', (_channel, message) => {
  console.log('on message', _channel, message);
  const value = fib(parseInt(message));
  console.log('on message - value', value);
  redisClient.hset('values', message, value);
});

sub.subscribe('insert');

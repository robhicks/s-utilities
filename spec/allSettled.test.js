import allSettled from '../src/allSettled.js';
Promise.allSettled = allSettled;

describe('Promise.allSettled', function(){
  it('should exist', function(){
    expect(typeof Promise).toEqual('function');
    expect(typeof Promise.allSettled).toEqual('function');
  });
  it('should return fulfilled for 2 promises', function(){
    const promise1 = Promise.resolve('yeah1');
    const promise2 = Promise.resolve('yeah2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).toEqual(true);
      expect(results[0].state).toEqual('fulfilled');
      expect(results[0].value).toEqual('yeah1');
      expect(results[1].state).toEqual('fulfilled');
      expect(results[1].value).toEqual('yeah2');
    });

  });

  it('should fulfill the first promise and reject the second', function(){
    const promise1 = Promise.resolve('yeah1');
    const promise2 = Promise.reject('boo');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).toEqual(true);
      expect(results[0].state).toEqual('fulfilled');
      expect(results[0].value).toEqual('yeah1');
      expect(results[1].state).toEqual('rejected');
      expect(results[1].reason).toEqual('boo');
    });
  });

  it('should reject the first promise and fulfill the second', function(){
    const promise1 = Promise.reject('boo1');
    const promise2 = Promise.resolve('yeah2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).toEqual(true);
      expect(results[0].state).toEqual('rejected');
      expect(results[0].reason).toEqual('boo1');
      expect(results[1].state).toEqual('fulfilled');
      expect(results[1].value).toEqual('yeah2');
    });
  });

  it('should reject two promises', function(){
    const promise1 = Promise.reject('boo1');
    const promise2 = Promise.reject('boo2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).toEqual(true);
      expect(results[0].state).toEqual('rejected');
      expect(results[0].reason).toEqual('boo1');
      expect(results[1].state).toEqual('rejected');
      expect(results[1].reason).toEqual('boo2');
    });
  });

  it('should handle a large number of promises', function(){
    let promise = Promise.resolve('yeah1');
    let promises = [];

    for (let i = 0; i < 10000; i++) {
      promises.push(promise);
    }

    return Promise.allSettled(promises).then((results) => {
      expect(Array.isArray(results)).toEqual(true);
      expect(results.length).toEqual(10000);
      results.forEach((result) => {
        expect(result.state).toEqual('fulfilled');
        expect(result.value).toEqual('yeah1');
      });
    });
  });


});

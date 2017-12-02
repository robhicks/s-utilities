import '../src/Promise.allSettled.js';

describe('Promise.allSettled', function(){
  it('should return fulfilled for 2 promises', function(){
    const promise1 = Promise.resolve('yeah1');
    const promise2 = Promise.resolve('yeah2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).to.be.equal(true);
      expect(results[0].state).to.be.equal('fulfilled');
      expect(results[0].value).to.be.equal('yeah1');
      expect(results[1].state).to.be.equal('fulfilled');
      expect(results[1].value).to.be.equal('yeah2');
    });

  });

  it('should fulfill the first promise and reject the second', function(){
    const promise1 = Promise.resolve('yeah1');
    const promise2 = Promise.reject('boo');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).to.be.equal(true);
      expect(results[0].state).to.be.equal('fulfilled');
      expect(results[0].value).to.be.equal('yeah1');
      expect(results[1].state).to.be.equal('rejected');
      expect(results[1].reason).to.be.equal('boo');
    });
  });

  it('should reject the first promise and fulfill the second', function(){
    const promise1 = Promise.reject('boo1');
    const promise2 = Promise.resolve('yeah2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).to.be.equal(true);
      expect(results[0].state).to.be.equal('rejected');
      expect(results[0].reason).to.be.equal('boo1');
      expect(results[1].state).to.be.equal('fulfilled');
      expect(results[1].value).to.be.equal('yeah2');
    });
  });

  it('should reject two promises', function(){
    const promise1 = Promise.reject('boo1');
    const promise2 = Promise.reject('boo2');
    return Promise.allSettled([promise1, promise2]).then((results) => {
      expect(Array.isArray(results)).to.be.equal(true);
      expect(results[0].state).to.be.equal('rejected');
      expect(results[0].reason).to.be.equal('boo1');
      expect(results[1].state).to.be.equal('rejected');
      expect(results[1].reason).to.be.equal('boo2');
    });
  });

  it('should handle a large number of promises', function(){
    let promise = Promise.resolve('yeah1');
    let promises = [];

    for (let i = 0; i < 10000; i++) {
      promises.push(promise);
    }

    return Promise.allSettled(promises).then((results) => {
      expect(Array.isArray(results)).to.be.equal(true);
      expect(results.length).to.be.equal(10000);
      results.forEach((result) => {
        expect(result.state).to.be.equal('fulfilled');
        expect(result.value).to.be.equal('yeah1');
      });
    });
  });


});

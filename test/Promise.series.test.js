import '../src/Promise.series.mjs';

describe('Promise.series', function(){

  it('should run tasks in series and return the results in order', () => {
    let p0, p1, p2;
    p0 = new Promise((resolve, reject) => {
      resolve(0);
    });
    p1 = new Promise((resolve, reject) => {
      resolve(1);
    });
    p2 = new Promise((resolve, reject) => {
      resolve(2);
    });
    Promise.series([p0, p1, p2]).then((data) => {
      expect(data).to.be.eql([0,1,2])
    })
  });

  it('should run tasks in series and reject with the value of the first promise rejected', () => {
    let p0, p1, p2;
    p0 = new Promise((resolve, reject) => {
      reject(0);
    });
    p1 = new Promise((resolve, reject) => {
      resolve(1);
    });
    p2 = new Promise((resolve, reject) => {
      resolve(2);
    });
    Promise.series([p0, p1, p2]).catch(err => {
      expect(err).to.be.equal(0);
    });
  });

  it('should run tasks in series and reject with the value of the second promise rejected', () => {
    let p0, p1, p2;
    p0 = new Promise((resolve, reject) => {
      resolve(0);
    });
    p1 = new Promise((resolve, reject) => {
      reject(1);
    });
    p2 = new Promise((resolve, reject) => {
      resolve(2);
    });
    Promise.series([p0, p1, p2]).catch(err => {
      expect(err).to.be.equal(1);
    });
  });

  it('should handle a large number of promises', () => {
    let promises = [];
    let iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      promises.push(Promise.resolve(i));
    }
    Promise.series(promises).then(results => {
      expect(results).to.be.an('array');
      expect(results).to.have.length(iterations);
    });
  });


});

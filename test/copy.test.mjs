import copy from '../src/copy.js';

describe('copy(obj)', () => {

  it('should return an emtpy object if obj parameter not provided', () => {
    let temp = copy();
    expect(temp).to.be.eql({});
  });

  it('should make a deep copy of an object', () => {
    let object = {
      givenName: 'foo',
      surname: 'bar',
      data: {
        array: [
          {name: 'foo'}
        ],
        married: true,
        divorced: false
      }
    };
    let temp = copy(object);
    expect(temp).to.be.eql(object);
    expect(temp).to.not.be.equal(object);
  });
});

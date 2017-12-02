import isJson from '../src/isJson.js';

describe('isJson(obj)', () => {

  it('should return false if obj param not provided', () => {
    let temp = isJson();
    expect(temp).to.not.be.ok;
  });

  it('should return false if obj is array', () => {
    let temp = isJson(['john', 'jangle', 'gingleheimer', 'schmidt']);
    expect(temp).to.not.be.ok;
  });

  it('should return false if obj is an object', () => {
    let temp = isJson({name: 'foo', type: 'bar'});
    expect(temp).to.not.be.ok;
  });

  it('should return true if obj is a JSON stringified object', () => {
    let temp = isJson(JSON.stringify({name: 'foo', type: 'bar'}));
    expect(temp).to.be.ok;
  });
});

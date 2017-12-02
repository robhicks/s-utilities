import contains from '../src/contains.js';

describe('contains(str, val)', () => {

  it('should return false if str parameter not provided', () => {
    let temp = contains();
    expect(temp).to.not.be.ok;
  });

  it('should return false if value not contained in str', () => {
    let temp = contains('bbbbbbbbbbfobbbbbbbbbb', 'foo');
    expect(temp).to.not.be.ok;
  });

  it('should return true if value contained in str', () => {
    let temp = contains('bbbbbbbbbbfoobbbbbbbbbb', 'foo');
    expect(temp).to.be.ok;
  });
});

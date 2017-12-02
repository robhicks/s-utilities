import uuid from '../src/uuid.js';
import validuuid from '../src/validUuid.mjs';

describe('uuid()', () => {

  it('should return a valid uuid', () => {
    let temp = uuid();
    expect(temp).to.be.a('string');
    expect(validuuid(temp)).to.be.ok;
  });
});

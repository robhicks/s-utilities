import DeepProxy from '../src/deepProxy.mjs';

describe(`DeepProxy`, () => {
  it(`should create a Proxy of an empty object`, () => {
    let target = {};
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.exist;
    expect(proxy).to.be.an('object');
    expect(proxy).to.be.eql(target);
  });

  it(`should create a Proxy of a shallow object`, () => {
    let target = {
      name: 'foo',
      location: 'bar'
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.exist;
    expect(proxy).to.be.an('object');
    expect(proxy).to.be.eql(target);
  });

  it(`should create a Proxy of a simple nested object`, () => {
    let target = {
      name: 'foo',
      location: {
        name: 'bar'
      }
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.be.eql(target);
    expect(proxy.location).to.be.eql(target.location);
  });

  it(`should create a Proxy of a deeply nested object`, () => {
    let target = {
      name: 'foo',
      location: {
        name: 'bar',
        address: {
          street: '1000 N 1000 E',
          city: 'American Fork'
        }
      }
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.be.eql(target);
    expect(proxy.location).to.be.eql(target.location);
    expect(proxy.location.address).to.be.eql(target.location.address);
  });

  it(`should create a Proxy of a very deeply nested object`, () => {
    let target = {
      name: 'foo',
      location: {
        name: 'bar',
        address: {
          street: '1000 N 1000 E',
          city: 'American Fork',
          region: {
            name: 'united states',
            location: {
              lat: '40.393591',
              long: '-111.797238'
            }
          }
        }
      }
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.be.eql(target);
    expect(proxy.location).to.be.eql(target.location);
    expect(proxy.location.address).to.be.eql(target.location.address);
  });

  it(`should create of a nested array`, () => {
    let target = {
      name: 'foobers',
      value: [
        {name: 'foo', value: 'bar'},
        {name: 'bar', value: 'baz'},
        {name: 'car', value: 'caz'}
      ]
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy).to.be.eql(target);
    expect(proxy.value).to.be.eql(target.value);
    expect(proxy.value[0]).to.be.eql(target.value[0]);
  });

  it(`should be useable to detect changes in a simple object`, () => {
    let target = {
      name: 'foo',
    };
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        expect(_target[property]).to.be.equal('rob');
        return true;
      }
    };
    let proxy = new DeepProxy(target, handler);
    proxy.name = 'rob';
  });

  it(`should be useable to detect changes in simple nested object`, () => {
    let proxy;
    let target = {
      name: 'foo',
      value: {
        name: 'bar'
      }
    };
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        if (proxy) expect(proxy.value.name).to.be.equal('rob');
        return true;
      }
    };
    proxy = new DeepProxy(target, handler);
    proxy.value.name = 'rob';
  });

  it(`should be useable to detect changes in a simpe array`, () => {
    let obj = {name: 'foo'};
    let target = [obj];
    let proxy;
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        if (proxy) expect(proxy).to.be.eql([{name: 'rob'}]);
        return true;
      }
    };
    proxy = new DeepProxy(target, handler);
    proxy[0].name = 'rob';
  });

  it(`should be useable to detect changes in an array with a nested object`, () => {
    let obj = {address: {city: 'American Fork', state: 'Utah'}};
    let target = [obj];
    let proxy;
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        if (proxy) expect(proxy).to.be.eql([{address: {city: 'American Fork', state: 'Wyoming'}}]);
        return true;
      }
    };
    proxy = new DeepProxy(target, handler);
    proxy[0].address.state = 'Wyoming';
  });

  it(`should be useable to detect changes in a nested array with a nested object`, () => {
    let obj = {name: 'rob', address: {city: 'American Fork', state: 'Utah'}};
    let target = {users: [obj]};
    let proxy;
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        if (proxy) expect(proxy).to.be.eql({users: [{name: 'rob', address: {city: 'American Fork', state: 'Wyoming'}}]});
        return true;
      }
    };
    proxy = new DeepProxy(target, handler);
    proxy.users[0].address.state = 'Wyoming';
  });

  it(`should detect changes in a very deeply nested object`, (done) => {
    let proxy;
    let target = {
      name: 'foo',
      location: {
        name: 'bar',
        address: {
          street: '1000 N 1000 E',
          city: 'American Fork',
          region: {
            name: 'united states',
            location: {
              lat: '40.393591',
              long: '-111.797238'
            }
          }
        }
      }
    };
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        return true;
      }
    };

    proxy = new DeepProxy(target, handler);
    setTimeout(() => {
      proxy.location.address.region.location.lat === '44';
      done();
    }, 500);
  });

  describe(`DeepProxy.revocable()`, () => {
    it(`should return a proxy object`, () => {
      let target = {
        name: 'foo',
        value: {
          name: 'bar'
        }
      };
      let handler = {
        set(_target, property, value) {
          _target[property] = value;
          return true;
        }
      };
      let proxyObj = DeepProxy.revocable(target, handler);
      expect(proxyObj.proxy).to.be.an('object');
      expect(proxyObj.revoke).to.be.a('function');
    });

    it(`should return a proxy object, which when accessed will provide a proxy`, () => {
      let target = {
        name: 'foo',
        value: {
          name: 'bar'
        }
      };
      let handler = {
        set(_target, property, value) {
          _target[property] = value;
          return true;
        }
      };
      let proxyObj = DeepProxy.revocable(target, handler);
      let proxy = proxyObj.proxy;
      expect(proxy.name).to.be.equal('foo');
    });

    it(`should revoke a revocable proxy`, () => {
      let target = {
        name: 'foo',
        value: {
          name: 'bar'
        }
      };
      let handler = {
        set(_target, property, value) {
          _target[property] = value;
          return true;
        }
      };
      let proxyObj = DeepProxy.revocable(target, handler);
      proxyObj.revoke();
    });
  });
});

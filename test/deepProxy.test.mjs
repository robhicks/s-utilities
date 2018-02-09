import DeepProxy from '../src/DeepProxy.mjs';

describe.only(`DeepProxy`, () => {
  it(`should create a Proxy of an empty object`, () => {
    let proxy = new DeepProxy({}, {});
    expect(proxy._deep_proxied).to.be.true;
  });

  it(`should create a Proxy of a shallow object`, () => {
    let target = {
      name: 'foo',
      location: 'bar'
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy._deep_proxied).to.be.true;
  });

  it(`should create a Proxy of a simple nested object`, () => {
    let target = {
      name: 'foo',
      location: {
        name: 'bar'
      }
    };
    let proxy = new DeepProxy(target, {});
    expect(proxy._deep_proxied).to.be.true;
    expect(proxy.location._deep_proxied).to.be.true;
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
    expect(proxy._deep_proxied).to.be.true;
    expect(proxy.location._deep_proxied).to.be.true;
    expect(proxy.location.address._deep_proxied).to.be.true;
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
    expect(proxy._deep_proxied).to.be.true;
    expect(proxy.value._deep_proxied).to.be.true;
    expect(proxy.value[0]._deep_proxied).to.be.true;
  });

  it(`should useable to detect changes in an object`, () => {
    let target = {
      name: 'foo',
      value: {
        name: 'bar'
      }
    };
    let handler = {
      set(_target, property, value) {
        _target[property] = value;
        expect(_target._deep_proxied).to.be.true;
        return true;
      }
    }
    let proxy = new DeepProxy(target, handler);
    expect(proxy._deep_proxied).to.be.true;
    proxy.value.name = 'rob';
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
          expect(_target._deep_proxied).to.be.true;
          return true;
        }
      }
      let proxyObj = DeepProxy.revocable(target, handler);
      expect(proxyObj.proxy).to.be.a('function');
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
          expect(_target._deep_proxied).to.be.true;
          return true;
        }
      }
      let proxyObj = DeepProxy.revocable(target, handler);
      let proxy = proxyObj.proxy();
      expect(proxy._deep_proxied).to.be.true;
      expect(proxy.value._deep_proxied).to.be.true;
    });

    it(`should return a proxy object, when revoked will remove the proxy`, () => {
      let target = {
        name: 'foo',
        value: {
          name: 'bar'
        }
      };
      let handler = {
        set(_target, property, value) {
          _target[property] = value;
          expect(_target._deep_proxied).to.be.true;
          return true;
        }
      }
      let proxyObj = DeepProxy.revocable(target, handler);
      proxyObj.revoke();
      expect(proxyObj.proxy).to.be.a('function');
    });
  });
});

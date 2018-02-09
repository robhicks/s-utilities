export default class DeepProxy {
  constructor(target, handler) {
    if (typeof target !== 'object' || typeof handler !== 'object') throw TypeError('target and handler must be objects');
    return this._create(target, handler);
  }

  _create(target, handler) {
    target = new Proxy(target, handler);
    if (Array.isArray(target)) target.forEach(i => this._create(i, handler));
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        let t = target[prop];
        if (typeof t === 'object') this._create(t, handler);
      }
    }
    target._deep_proxied = true;
    return target;
  }

  static revocable(target, handler) {
    let dp = new DeepProxy(target, handler);
    return {
      revoke() {
        dp = null;
      },
      proxy() {
        return dp;
      }
    };
  }
}

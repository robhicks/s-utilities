export default class DeepProxy {
  constructor(target, handler, revocable = false) {
    if (typeof target !== 'object' || typeof handler !== 'object') throw TypeError('target and handler must be objects');
    return this._create(target, handler, revocable);
  }

  _create(target, handler, revocable = false) {
    let _target;

    if (!Array.isArray(target)) _target = revocable ? Proxy.revocable(target, handler) : new Proxy(target, handler);
    else _target = target;

    let __target = _target.proxy ? _target.proxy : _target;
    for (let prop in __target) {
      if (__target.hasOwnProperty(prop)) {
        if (__target[prop] && typeof __target[prop] === 'object' && !Array.isArray(__target)) __target[prop] = this._create(__target[prop], handler, revocable);
        if (Array.isArray(__target)) __target = revocable ? Proxy.revocable(__target, handler) : new Proxy(__target, handler);
      }
    }
    return Array.isArray(_target) ? revocable ? Proxy.revocable(_target, handler) : new Proxy(_target, handler) : _target;
  }

  static revocable(target, handler) {
    let dp = new DeepProxy(target, handler, true);
    return {
      revoke: dp.revoke,
      proxy: dp.proxy
    };
  }
}

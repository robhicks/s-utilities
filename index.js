'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

Promise.allSettled = (promises) =>
  Promise.all(promises.map((promise) =>
    promise
    .then((value) => ({
      state: 'fulfilled',
      value
    }))
    .catch((reason) => ({
      state: 'rejected',
      reason
    }))
  ));

Promise.series = (array) => {
  let results = [];
  return array.reduce(function(p, item) {
    return p.then(function() {
      return item.then(function(data) {
        results.push(data);
        return results;
      });
    });
  }, Promise.resolve());
};

// Promise.series = tasks => tasks.reduce((p, task) => p.then(task));

/**
 * Checks to see if an element has a class
 * @param  {HTMLElement}  el   Element to check
 * @param  {String}  name class name to check
 * @return {Boolean}      True if the element has the class, otherwise false.
 */
function hasClass(el, name) {
  if (!el) return false;
  return !el.className || el.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)")) === null ? false : true;
}

/**
 * Adds a class to an element
 * @param {HTMLElement}  el   Element
 * @param {[String]} name class to add
 * @return {Void}
 */
function addClass(el, name) {
  if (!hasClass(el, name) && el) {
    el.className += (el.className ? ' ' : '') + name;
  }
}

/**
 * Adds a slist of classes to an element
 * @param {HTMLElement}  el   Element
 * @param {[String]} names classes to add (space delimited)
 * @return {Void}
 */
function addClasses(el, names = '') {
  let _names = names.split(' ');
  _names.forEach((n) => addClass(el, n));
}

/**
 * Removes a class from an element
 * @param {HTMLElement}  el   Element
 * @param {[String]} name class to remove
 * @return {Void}
 */
function removeClass(el, name) {
  if (el && hasClass(el, name)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
  }
}

/**
 * Toggles a class on an element
 * @param {HTMLElement}  el   Element
 * @param {[String]} name class to add and remove
 * @return {Void}
 */
function toggleClass(el, name) {
  if (hasClass(el, name)) removeClass(el, name);
  else addClass(el, name);
}

function accessCode() {
    let d = new Date().getTime();
    let accessCode = 'xxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return accessCode;
}

function appendAfter(el, sibling) {
  if (el.nextSibling) {
      el.parentNode.insertBefore(sibling, el.nextSibling);
      return;
  }

  el.parentNode.appendChild(sibling);
}

function contains(str = '', val) {
  return str.indexOf(val) !== -1;
}

function copy(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class DeepProxy {
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

function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  // console.log("rect", rect)
  let html = document.documentElement;
  return (
    rect.top >= 0 - rect.height &&
    rect.left >= 0 - rect.width &&
    rect.bottom <= html.clientHeight + rect.height &&
    rect.right <= html.clientWidth
  );
}

function isJson(str) {
  try {
    let json = JSON.parse(str);
    return json;
  } catch (e) {
    return false;
  }
}

function pad(n = '', width, z = '0') {
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class StringBuilder {
  constructor(string = '') {
    this.string = String(string);
  }
  toString() {
    return this.string;
  }
  append(val) {
    this.string += val;
    return this;
  }
  insert(pos, val) {
    let length = this.string.length;
    let left = this.string.slice(0, pos);
    let right = this.string.slice(pos);
    this.string = left + val + right;
    return this;
  }
}

function throttle(func, wait, immediate) {
  return debounce(func, wait, immediate);
}

function uuid$1() {
  let d = new Date().getTime();
  let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uid;
}

function argValidator(event, listener) {
  if (typeof event !== 'string') throw TypeError('event must be string');
  if (typeof listener !== 'function') throw TypeError('listener must be function');
}
const eventEmitterMap = new Map();

class EventEmitter {
  constructor(singleton = false) {
    if (singleton) {
      if (eventEmitterMap.has('instance')) return eventEmitterMap.get('instance');
      eventEmitterMap.set('instance', this);
    }
    this.events = {};
  }

  clear() {
    this.events = {};
  }

  emit(event, ...args) {
    if (this.events[event]) {
      (this.events[event] || []).forEach(l => l(...args));
    }
  }

  off(event, listener) {
    argValidator(event, listener);
    if (this.events[event]) {
      let idx = this.events[event].findIndex(e => e === listener);
      if (idx > -1) this.events[event].splice(idx, 1);
      if (this.events[event].length === 0) delete this.events[event];
    }
  }

  on(event, listener) {
    argValidator(event, listener);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  once(event, listener) {
    argValidator(event, listener);
    let self = this;
    this.on(event, function f() {
      self.off(event, f);
      listener.apply(this, arguments);
    });
  }

  get size() {
    return Object.keys(this.events).length;
  }

}

exports.accessCode = accessCode;
exports.addClass = addClass;
exports.addClasses = addClasses;
exports.appendAfter = appendAfter;
exports.contains = contains;
exports.copy = copy;
exports.debounce = debounce;
exports.DeepProxy = DeepProxy;
exports.hasClass = hasClass;
exports.isInViewport = isInViewport;
exports.isJson = isJson;
exports.pad = pad;
exports.removeClass = removeClass;
exports.StringBuilder = StringBuilder;
exports.throttle = throttle;
exports.toggleClass = toggleClass;
exports.uuid = uuid$1;
exports.EventEmitter = EventEmitter;

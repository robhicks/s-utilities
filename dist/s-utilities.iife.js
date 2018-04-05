var SUtils = (function (exports) {
  'use strict';

  Promise.allSettled = function (promises) { return Promise.all(promises.map(function (promise) { return promise
      .then(function (value) { return ({
        state: 'fulfilled',
        value: value
      }); })
      .catch(function (reason) { return ({
        state: 'rejected',
        reason: reason
      }); }); }
    )); };

  Promise.series = function (array) {
    var results = [];
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
    if (!el) { return false; }
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
  function addClasses(el, names) {
    if ( names === void 0 ) names = '';

    var _names = names.split(' ');
    _names.forEach(function (n) { return addClass(el, n); });
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
    if (hasClass(el, name)) { removeClass(el, name); }
    else { addClass(el, name); }
  }

  function accessCode() {
      var d = new Date().getTime();
      var accessCode = 'xxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
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

  function contains(str, val) {
    if ( str === void 0 ) str = '';

    return str.indexOf(val) !== -1;
  }

  function copy(obj) {
    if ( obj === void 0 ) obj = {};

    return JSON.parse(JSON.stringify(obj));
  }

  var DataStore = function DataStore() {
    this.storeMap = {};
  };

  // this.get(el, "hi");
  DataStore.prototype.get = function get (element, key) {
    return this.getStore(element)[key] || null;
  };

  DataStore.prototype.getAll = function getAll () {
    console.log("this.storeMap", this.storeMap);
  };

  // this.set(el, "hi", {"number": 4}
  DataStore.prototype.set = function set (element, key, value) {
    if (!value) { return; }
    this.getStore(element)[key] = value;
    return value;
  };

  // this.remove(el);
  // this.remove(el, "hi");
  DataStore.prototype.remove = function remove (element, key) {
    if (key) {
      var store = this.getStore(element);
      if (store[key]) { delete store[key]; }
    } else {
      var elementId = element[this.storeId];
      if (elementId) {
        delete this.storeMap[elementId];
        delete element[this.storeId];
      }
    }
  };

  DataStore.prototype.getStore = function getStore (element) {
    var storeId = this.storeId;
    var storeMap = this.storeMap;
    var elementId = element[storeId];

    if (!elementId) {
      elementId = element[storeId] = this.uid++;
      storeMap[elementId] = {};
    }

    return storeMap[elementId];
  };

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) { func.apply(context, args); }
    };
  }

  var DeepProxy = function DeepProxy(target, handler, revocable) {
    if ( revocable === void 0 ) revocable = false;

    if (typeof target !== 'object' || typeof handler !== 'object') { throw TypeError('target and handler must be objects'); }
    return this._create(target, handler, revocable);
  };

  DeepProxy.prototype._create = function _create (target, handler, revocable) {
      var this$1 = this;
      if ( revocable === void 0 ) revocable = false;

    var _target;

    if (!Array.isArray(target)) { _target = revocable ? Proxy.revocable(target, handler) : new Proxy(target, handler); }
    else { _target = target; }

    var __target = _target.proxy ? _target.proxy : _target;
    for (var prop in __target) {
      if (__target.hasOwnProperty(prop)) {
        if (__target[prop] && typeof __target[prop] === 'object' && !Array.isArray(__target)) { __target[prop] = this$1._create(__target[prop], handler, revocable); }
        if (Array.isArray(__target)) { __target = revocable ? Proxy.revocable(__target, handler) : new Proxy(__target, handler); }
      }
    }
    return Array.isArray(_target) ? revocable ? Proxy.revocable(_target, handler) : new Proxy(_target, handler) : _target;
  };

  DeepProxy.revocable = function revocable (target, handler) {
    var dp = new DeepProxy(target, handler, true);
    return {
      revoke: dp.revoke,
      proxy: dp.proxy
    };
  };

  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    // console.log("rect", rect)
    var html = document.documentElement;
    return (
      rect.top >= 0 - rect.height &&
      rect.left >= 0 - rect.width &&
      rect.bottom <= html.clientHeight + rect.height &&
      rect.right <= html.clientWidth
    );
  }

  function isJson(str) {
    try {
      var json = JSON.parse(str);
      return json;
    } catch (e) {
      return false;
    }
  }

  function pad(n, width, z) {
    if ( n === void 0 ) n = '';
    if ( z === void 0 ) z = '0';

    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  var StringBuilder = function StringBuilder(string) {
    if ( string === void 0 ) string = '';

    this.string = String(string);
  };
  StringBuilder.prototype.toString = function toString () {
    return this.string;
  };
  StringBuilder.prototype.append = function append (val) {
    this.string += val;
    return this;
  };
  StringBuilder.prototype.insert = function insert (pos, val) {
    var length = this.string.length;
    var left = this.string.slice(0, pos);
    var right = this.string.slice(pos);
    this.string = left + val + right;
    return this;
  };

  function throttle(func, wait, immediate) {
    return debounce(func, wait, immediate);
  }

  function uuid$1() {
    var d = new Date().getTime();
    var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid;
  }

  function argValidator(event, listener) {
    if (typeof event !== 'string') { throw TypeError('event must be string'); }
    if (typeof listener !== 'function') { throw TypeError('listener must be function'); }
  }
  var eventEmitterMap = new Map();

  var EventEmitter = function EventEmitter(singleton) {
    if ( singleton === void 0 ) singleton = false;

    if (singleton) {
      if (eventEmitterMap.has('instance')) { return eventEmitterMap.get('instance'); }
      eventEmitterMap.set('instance', this);
    }
    this.events = {};
  };

  var prototypeAccessors = { size: { configurable: true } };

  EventEmitter.prototype.clear = function clear () {
    this.events = {};
  };

  EventEmitter.prototype.emit = function emit (event) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    if (this.events[event]) {
      (this.events[event] || []).forEach(function (l) { return l.apply(void 0, args); });
    }
  };

  EventEmitter.prototype.off = function off (event, listener) {
    argValidator(event, listener);
    if (this.events[event]) {
      var idx = this.events[event].findIndex(function (e) { return e === listener; });
      if (idx > -1) { this.events[event].splice(idx, 1); }
      if (this.events[event].length === 0) { delete this.events[event]; }
    }
  };

  EventEmitter.prototype.on = function on (event, listener) {
    argValidator(event, listener);
    if (!this.events[event]) { this.events[event] = []; }
    this.events[event].push(listener);
  };

  EventEmitter.prototype.once = function once (event, listener) {
    argValidator(event, listener);
    var self = this;
    this.on(event, function f() {
      self.off(event, f);
      listener.apply(this, arguments);
    });
  };

  prototypeAccessors.size.get = function () {
    return Object.keys(this.events).length;
  };

  Object.defineProperties( EventEmitter.prototype, prototypeAccessors );

  exports.accessCode = accessCode;
  exports.addClass = addClass;
  exports.addClasses = addClasses;
  exports.appendAfter = appendAfter;
  exports.contains = contains;
  exports.copy = copy;
  exports.DataStore = DataStore;
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

  return exports;

}({}));

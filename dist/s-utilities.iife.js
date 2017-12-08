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

var copy = function(obj) {
  if ( obj === void 0 ) obj = {};

  return JSON.parse(JSON.stringify(obj));
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

exports.addClass = addClass;
exports.addClasses = addClasses;
exports.appendAfter = appendAfter;
exports.contains = contains;
exports.copy = copy;
exports.debounce = debounce;
exports.hasClass = hasClass;
exports.isInViewport = isInViewport;
exports.isJson = isJson;
exports.pad = pad;
exports.removeClass = removeClass;
exports.StringBuilder = StringBuilder;
exports.throttle = throttle;
exports.toggleClass = toggleClass;
exports.uuid = uuid$1;

return exports;

}({}));

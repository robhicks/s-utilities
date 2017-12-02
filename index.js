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

function hasClass(el, name) {
  return el.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)")) === null ? false : true;
}

function addClass(el, name) {
  if (!hasClass(el, name)) {
    el.className += (el.className ? ' ' : '') + name;
  }
}

function addClasses(el, names = '') {
  let _names = names.split(' ');
  _names.forEach((n) => addClass(el, n));
}

function removeClass(el, name) {
  if (hasClass(el, name)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
  }
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

var copy = function(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
};

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
exports.uuid = uuid$1;

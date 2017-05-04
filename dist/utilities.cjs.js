'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var allSettled = function(promises) {
  return Promise.all(promises.map(function (promise) { return promise
        .then(function (value) { return ({state: 'fulfilled', value: value}); })
        .catch(function (reason) { return ({state: 'rejected', reason: reason}); }); }
    ));
  };

function contains(str, val) {
  return str.indexOf(val) !== -1;
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

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

exports.allSettled = allSettled;
exports.contains = contains;
exports.copy = copy;
exports.debounce = debounce;
exports.isInViewport = isInViewport;
exports.isJson = isJson;
exports.throttle = throttle;
exports.uuid = uuid$1;

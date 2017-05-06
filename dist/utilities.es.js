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

function pad(n, width, z) {
  if ( n === void 0 ) n = '';
  if ( z === void 0 ) z = '0';

  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var StringBuilder = function StringBuilder(string) {
  if (!string || typeof string === 'undefined') { this.string = String(""); }
  else { this.string = String(string); }
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
  var left = this.string.slice(0,pos);
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

export { allSettled, contains, copy, debounce, isInViewport, isJson, pad, StringBuilder, throttle, uuid$1 as uuid };

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

export { addClass, addClasses, appendAfter, contains, copy, debounce, hasClass, isInViewport, isJson, pad, removeClass, StringBuilder, throttle, toggleClass, uuid$1 as uuid };

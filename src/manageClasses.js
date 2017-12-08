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

export {addClass, addClasses, hasClass, removeClass, toggleClass};

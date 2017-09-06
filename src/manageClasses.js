function hasClass(el, name) {
  return el.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)")) === null ? false : true;
}

function addClass(el, name) {
  if (!hasClass(el, name)) {
    el.className += (el.className ? ' ' : '') + name;
  }
}

function addClasses(el, names) {
  let _names = names.slit(' ');
  _names.forEach((n) => addClass(el, n));
}

function removeClass(el, name) {
  if (hasClass(el, name)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
  }
}

export {addClass, addClasses, hasClass, removeClass};

import debounce from './debounce.js';

export default function throttle(func, wait, immediate) {
  return debounce(func, wait, immediate);
}

function uuid() {
  let d = new Date().getTime();
  let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uid;
}

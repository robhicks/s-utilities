function argValidator(event, listener) {
  if (typeof event !== 'string') throw TypeError('event must be string');
  if (typeof listener !== 'function') throw TypeError('listener must be function');
}
const eventEmitterMap = new Map();

export class EventEmitter {
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

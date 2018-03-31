import { EventEmitter } from '../src/EventEmitter.mjs';

describe(`EventEmitter`, () => {
  let events;

  beforeEach(() => {
    events = new EventEmitter();
  });

  afterEach(() => {
    events.clear();
  });

  it(`should have certain properties when instantiated`, () => {
    expect(events).to.be.instanceof(EventEmitter);
    expect(events.events).to.be.an('object');
    expect(events.events).to.be.eql({});
    expect(events.clear).to.be.a('function');
    expect(events.emit).to.be.a('function');
    expect(events.off).to.be.a('function');
    expect(events.on).to.be.a('function');
    expect(events.size).to.exist;
  });

  it(`should register a listener`, () => {
    let cb = () => {};
    expect(events.size).to.be.equal(0);
    events.on('foo', cb);
    expect(events.size).to.be.equal(1);
    events.off('foo', cb);
    expect(events.size).to.be.equal(0);
  });

  it(`should register a listener once`, () => {
    let cb = () => {};
    expect(events.size).to.be.equal(0);
    events.once('foo', cb);
    expect(events.size).to.be.equal(1);
    events.emit('foo', 'bar');
    expect(events.size).to.be.equal(0);
  });

  it(`should create different instances`, () => {
    let events1 = new EventEmitter();
    expect(events).to.not.be.equal(events1);
  });

  it(`should create an optional singleton`, () => {
    events = new EventEmitter(true);
    let events1 = new EventEmitter(true);
    expect(events).to.be.equal(events1);
  });

  it(`should not create duplicate event listeners`, () => {
    let cb = () => {};

    events.once('foo', cb);
    expect(events.size).to.be.equal(1);
    events.once('foo', cb);
    expect(events.size).to.be.equal(1);
  });

  it(`should remove the events channel when the last listener is removed`, () => {
    let cb = () => {};
    let cb1 = () => {};
    events.on('foo', cb);
    events.on('foo', cb1);
    expect(events.size).to.be.equal(1);
    expect(events.events.foo).to.have.length(2);
    events.off('foo', cb);
    expect(events.events.foo).to.have.length(1);
    events.off('foo', cb1);
    expect(events.events.foo).to.be.undefined;
  });

});

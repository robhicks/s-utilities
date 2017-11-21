import Sanitizer from './Sanitize.mjs';
import basicConfig from './basicConfig.mjs';
import relaxedConfig from './relaxedConfig.mjs';
import restrictedConfig from './restrictedConfig.mjs';

describe('Sanitizer', () => {

  it('.clean() should return a document fragment', () => {
    let sanitizer = new Sanitizer();
    let t = document.createElement('template');
    t.innerHTML = `<p>yo</p>`;
    let sanitized = sanitizer.clean(t.content);
    expect(sanitized).to.be.instanceof(DocumentFragment);
  });

  it('.sanitizeHtmlString(html, returnString) should accept string html and return a document fragment', () => {
    let sanitizer = new Sanitizer();
    let html = `<p>yo</p>`;
    let sanitized = sanitizer.sanitizeHtmlString(html);
    expect(sanitized).to.be.instanceof(DocumentFragment);
  });

  it('.sanitizeHtmlString(html, returnString) should accept string html and return an html string', () => {
    let sanitizer = new Sanitizer();
    let html = `<p>yo</p>`;
    let sanitized = sanitizer.sanitizeHtmlString(html, true);
    expect(sanitized).to.be.a('string');
  });

  it('should support a basic configuration', () => {
    let sanitizer = new Sanitizer('basic');
    expect(sanitizer.getConfig()).to.be.an('object');
    expect(JSON.stringify(sanitizer.getConfig())).to.be.equal(JSON.stringify(basicConfig));
  });

  it('should support a basic configuration as default', () => {
    let sanitizer = new Sanitizer();
    expect(sanitizer.getConfig()).to.be.an('object');
    expect(JSON.stringify(sanitizer.getConfig())).to.be.equal(JSON.stringify(basicConfig));
  });

  it('should support a relaxed configuration', () => {
    let sanitizer = new Sanitizer('relaxed');
    expect(sanitizer.getConfig()).to.be.an('object');
    expect(JSON.stringify(sanitizer.getConfig())).to.be.equal(JSON.stringify(relaxedConfig));
  });

  it('should support a restricted configuration', () => {
    let sanitizer = new Sanitizer('restricted');
    expect(sanitizer.getConfig()).to.be.an('object');
    expect(JSON.stringify(sanitizer.getConfig())).to.be.equal(JSON.stringify(restrictedConfig));
  });

  it('in basic configuration should remove buttons', () => {
    let sanitizer = new Sanitizer();
    let t = document.createElement('template');
    t.innerHTML = `<button>yo</button>`;
    let sanitized = sanitizer.clean(t.content);
    expect(sanitized).to.be.instanceof(DocumentFragment);
    expect(sanitized.firstChildElement).to.be.undefined;
  });

  it('in basic configuration should remove selects', () => {
    let sanitizer = new Sanitizer();
    let t = document.createElement('template');
    t.innerHTML = `<select><option>yo</option></select>`;
    let sanitized = sanitizer.clean(t.content);
    expect(sanitized).to.be.instanceof(DocumentFragment);
    expect(sanitized.firstChildElement).to.be.undefined;
  });

  it('in basic configuration should remove hrefs with ftp protocol', () => {
    let sanitizer = new Sanitizer();
    let t = document.createElement('template');
    t.innerHTML = `<a href="ftp://www.familysearch.org">yo</a>`;
    let sanitized = sanitizer.clean(t.content);
    let link = sanitized.querySelector('a');
    expect(link.hasAttribute('href')).to.not.be.ok;
  });

  it('should remove various DOM level 1 and 2 event listeners', () => {
    let sanitizer = new Sanitizer();
    let t = document.createElement('template');
    t.innerHTML = `<div onclick="maliciousFunction();">Click Me</div>`;
    let sanitized = sanitizer.clean(t.content);
    let link = sanitized.querySelector('div');
    expect(link.hasAttribute('onclick')).to.not.be.ok;
    t.innerHTML = `<div onkeydown="maliciousFunction();">Click Me</div>`;
    sanitized = sanitizer.clean(t.content);
    link = sanitized.querySelector('div');
    expect(link.hasAttribute('onkeydown')).to.not.be.ok;
  });
});

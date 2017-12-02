import getTranslations from '../getTranslations.mjs';

describe('getTtranslations(ns)', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should get translations from the server', () => {
    let tr = {foo: "bar"};
    fetchMock.getOnce('http://localhost:5000/translations?lang=en&ns=odz', tr);
    getTranslations('odz')
    .then(response => response.json())
    .then(translations => {
      expect(translations).to.be.an('object');
      expect(translations).to.be.eql(tr);
    });
  });

  it('should get translations from the server only once', () => {
    let tr = {foo: "bar"};
    fetchMock.getOnce('http://localhost:5000/translations?lang=en&ns=odz', tr);
    getTranslations('odz')
    .then(translations => {
      expect(translations.status).to.be.ok;
    });
    getTranslations('odz')
    .then(translations => {
      expect(translations.status).to.be.ok;
    });
  });

});

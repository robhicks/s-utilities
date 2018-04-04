import StringBuilder from './StringBuilder.mjs';
import TinyUri from 'tiny-uri';

let translations = new Map();
let request = new Map();
let deferredRequests = [];


export default function(ns) {
  let locale = typeof FS !== 'undefined' && FS.simpleLocale ? FS.simpleLocale() : 'en';
  let key = new StringBuilder().append(locale).append(':').append(ns).toString(true);
  if (translations.has(key)) return Promise.resolve(translations.get(key));
  if (request.has(key)) return request.get(key);

  let url = typeof FS !== 'undefined' && FS.appPath ?
    new TinyUri(FS.appPath + '/translations').query.add({lang: locale}).query.add({ns}).toString() :
    new TinyUri('http://localhost:5000/translations').query.add({lang: locale}).query.add({ns}).toString();

  request.set(key, new Promise((resolve, reject) => deferredRequests.push({key, resolve, reject})));

  return fetch(url).then((trans) => {
      translations.set(key, trans);
      let reqIdx = deferredRequests.findIndex(r => r.key === key);
      let req = deferredRequests[reqIdx];
      if (req) {
        req.resolve(trans);
        deferredRequests.splice(reqIdx, 1);
      }
      return trans;
    })
    .catch(err => console.log("err", err));
}

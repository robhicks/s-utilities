import events from './dom-level-1-events.mjs';

export default {
  elements: [
     'a', 'b', 'blockquote', 'br', 'cite', 'code', 'div', 'dd', 'dl', 'dt', 'em',
     'i', 'li', 'nav', 'ol', 'p', 'pre', 'q', 'small', 'span', 'strike', 'strong', 'sub',
     'sup', 'target', 'u', 'ul'],

   attributes: {
     a: ['href'],
     blockquote: ['cite'],
     q: ['cite']
   },

   protocols: {
     a: {href: ['ftp', 'http', 'https', 'mailto']},
     blockquote: {cite: ['http', 'https']},
     q: {cite: ['http', 'https']}
   },
   events,
   forceLocalTargets: true
};

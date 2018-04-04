import basicConfig from './basicConfig.mjs';
import relaxedConfig from './relaxedConfig.mjs';
import restrictedConfig from './restrictedConfig.mjs';
import domEvents from './dom-level-1-events.mjs';
import TinyUri from 'tiny-uri';

export default class Sanitize {
  constructor(config = 'basic') {
    this.config = this.configure(config);
  }

  changeConfig(config) {
    this.config = this.configure(config);
  }

  clean(container) {
    let target = document.createDocumentFragment();

    let cleanNode = (node) => {
      // console.log("node.nodeType", node.nodeType, node.nodeName);
      let type = node.nodeType;
      let nodeName = node.nodeName.toLowerCase();
      switch (type) {
        case 1: // ELEMENT_NODE
          let allowableAttributes = this.config.attributes[nodeName] || [];
          let attributes = node.attributes;
          let events = this.config.events;

          [].forEach.call(attributes, (a, i) => {
            let protocols = this.config.protocols[nodeName] ? this.config.protocols[nodeName][a.localName] : [];
            let value = a.value;
            if (!allowableAttributes.includes(a.localName) ||
              events.includes(a.localName) ||
              protocols.includes(new TinyUri(value).protocol())) node.removeAttribute(a.localName);
          });
          if (!this.config.elements.includes(nodeName)) node.setAttribute('remove', true);
          if (nodeName === 'a' && this.config.forceLocalTargets) node.setAttribute('target', '_blank');
          break;
        case 3: //TEXT_NODE
          //console.log("text", node.nodeName);
          break;
        case 8: // COMMENT_NODE
        case 9: // DOCUMENT_NODE
        case 10: // DOCUMENT_TYPE_NODE
        case 11: //DOCUMENT_FRAGMENT_NODE
          console.log(node);
          node.remove();
          break;
        default:
          break;
      }
      // console.log("node", node, 'type', node.nodeType, 'name', node.nodeName);
    };

    function traverseNodes(node) {
      let nodes = node.childNodes;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].childNodes.length > 0) {
          cleanNode(nodes[i]);
          if (nodes[i]) traverseNodes(nodes[i]);
        } else cleanNode(nodes[i]);
      }
    }

    traverseNodes(container);

    let nodesToRemove = container.querySelectorAll('[remove]');
    nodesToRemove.forEach(n => n.remove());

    while (container.childNodes.length > 0) {
      target.appendChild(container.childNodes[0]);
    }

    return target;
  }

  sanitizeHtmlString(html, returnString = false) {
    if (returnString) return this.cleanAndReturnString(html);
    let template = document.createElement('template');
    template.innerHTML = `<div>${html}</div>`;
    return this.clean(template.content);
  }

  cleanAndReturnString(html) {
    let template = document.createElement('template');
    template.innerHTML = `<div>${html}</div>`;
    let sanitized = this.clean(template.content);
    let frag = document.createDocumentFragment();
    frag.appendChild(document.createElement('div'));
    frag.firstChild.appendChild(sanitized);
    return frag.firstChild.innerHTML;
  }

  configure(config) {
    let _config;
    switch (config) {
      case 'relaxed':
        _config = Object.assign({}, relaxedConfig);
        break;
      case 'restricted':
        _config = Object.assign({}, restrictedConfig);
        break;
      case 'basic':
      default:
        _config = Object.assign({}, basicConfig);
    }
    return _config;
  }

  getConfig() {
    return this.config;
  }

}

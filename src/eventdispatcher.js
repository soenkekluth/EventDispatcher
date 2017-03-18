import CoreDispatcher from './core';
import assign from 'object-assign';

export default class EventDispatcher extends CoreDispatcher {

  constructor({ target, currentTarget } = {}) {
    super();
    this.target = target || this;
    this.currentTarget = currentTarget || this;

    this.addListener = this.bind = this.addEventListener = this.on;
    this.removeListener = this.unbind = this.removeEventListener = this.off;
    this.addListenerOnce = this.one = this.once;
    this.emit = this.dispatch = this.dispatchEvent = this.trigger;

    this.hasListener = this.hasListeners = this.listens;
  }

  listens(eventName) {
    if (eventName) {
      return this.getListener(eventName).length > 0;
    }
    return (!!this.eventMap && Object.keys(this.eventMap).length > 0);
  }


  createEventObject(eventType, eventObject) {
    let evtObj = {
      type: eventType,
      target: this.target,
      currentTarget: this.currentTarget,
    };

    if (eventObject) {
      evtObj = assign(evtObj, eventObject);
    }

    return evtObj;
  }
}

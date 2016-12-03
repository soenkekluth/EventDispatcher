import CoreDispatcher from './core';

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

  trigger(eventType, eventObject = {}) {
    eventObject.target = eventObject.target || this.target;
    eventObject.currentTarget = eventObject.currentTarget || this.currentTarget;
    return super.trigger(eventType, eventObject);
  }
}

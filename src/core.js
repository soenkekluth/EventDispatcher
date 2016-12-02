export default class EventDispatcher {

  constructor() {
    this.eventMap = {};
  }

  on(eventName, handler) {
    const listeners = this.getListener(eventName);
    if (listeners.indexOf(handler) === -1) {
      listeners.push(handler);
    }
    this.eventMap[eventName] = this.eventMap[eventName] || listeners;
    return this;
  }

  once(eventName, handler) {
    const f2 = (e) => {
      handler(e);
      this.off(eventName, f2);
    };
    return this.on(eventName, f2);
  }

  off(eventName, handler) {
    const listeners = this.getListener(eventName);
    const i = listeners.indexOf(handler);
    if (i > -1) {
      listeners.splice(i, 1);
      if (!listeners.length) {
        delete this.eventMap[eventName];
      }
    }
    return this;
  }

  trigger(eventType, eventObject = {}) {
    const listeners = this.getListener(eventType);

    if (listeners) {
      eventObject.type = eventType;
      eventObject.target = eventObject.target || this;

      for (let i = 0, l = listeners.length; i < l; i++) {
        listeners[i](eventObject);
      }
    }

    return this;
  }

  clear() {
    if (this.eventMap) {
      const keys = Object.keys(this.eventMap);
      for (let i = 0, l = keys.length; i < l; i++) {
        this.eventMap[keys[i]].length = 0;
        delete this.eventMap[keys[i]];
      }
    }
  }

  getListener(eventName) {
    return (this.eventMap && this.eventMap[eventName]) ? this.eventMap[eventName] : [];
  }

  destroy() {
    this.clear();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  }
}

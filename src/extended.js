export default class EventDispatcher {

  constructor() {
    this.eventMap = {};
  }

  on(eventName, handler) {
    const listeners = this.getListener(eventName);
    if (!listeners) {
      this.eventMap[eventName] = [handler];
    } else if (listeners.indexOf(handler) === -1) {
      listeners.push(handler);
    }
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
    if (!handler) {
      return this.removeAllListener(eventName);
    }

    const listeners = this.getListener(eventName);
    if (listeners) {
      const i = listeners.indexOf(handler);
      if (i > -1) {
        listeners.splice(i, 1);
        if (!listeners.length) {
          delete this.eventMap[eventName];
        }
      }
    }
    return this;
  }

  removeAllListener(eventName) {

    if (!eventName) {
      if (this.eventMap) {
        const keys = Object.keys(this.eventMap);
        for (let i = 0; i < keys.length; i++) {
          this.removeAllListener(keys[i]);
        }
      }
      return;
    }

    const listeners = this.getListener(eventName);
    if (listeners) {
      this.eventMap[eventName].length = 0;
      delete this.eventMap[eventName];
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

  getListener(eventName) {
    const result = this.eventMap ? this.eventMap[eventName] : null;
    return (result || null);
  }

  destroy() {
    this.removeAllListener();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  }
}

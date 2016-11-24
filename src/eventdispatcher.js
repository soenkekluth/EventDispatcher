function isEmpty(obj) {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
}

export default class EventDispatcher {

  constructor({ target, currentTarget } = {}) {
    this.target = target || this;
    this.currentTarget = currentTarget || this;
    this.eventMap = {};
    this.destroyed = false;

    this.on = this.bind = this.addEventListener = this.addListener;
    this.off = this.unbind = this.removeEventListener = this.removeListener;
    this.once = this.one = this.addListenerOnce;
    this.emit = this.trigger = this.dispatchEvent = this.dispatch;
  }

  addListener(event, listener) {
    const listeners = this.getListener(event);
    if (!listeners) {
      this.eventMap[event] = [listener];
    } else if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
    return this;
  }

  addListenerOnce(event, listener) {
    const f2 = (e) => {
      listener(e);
      this.off(event, f2);
    };
    return this.on(event, f2);
  }

  removeListener(event, listener) {
    if (!listener) {
      return this.removeAllListener(event);
    }

    const listeners = this.getListener(event);
    if (listeners) {
      const i = listeners.indexOf(listener);
      if (i > -1) {
        listeners.splice(i, 1);
        if (!listeners.length) {
          delete this.eventMap[event];
        }
      }
    }
    return this;
  }

  removeAllListener(event) {
    const listeners = this.getListener(event);
    if (listeners) {
      this.eventMap[event].length = 0;
      delete this.eventMap[event];
    }
    return this;
  }

  hasListener(event) {
    return this.getListener(event) !== null;
  }

  hasListeners() {
    return (this.eventMap !== null && this.eventMap !== undefined && !isEmpty(this.eventMap));
  }

  dispatch(eventType, eventObject) {
    const listeners = this.getListener(eventType);

    if (listeners) {
      const evtObj = eventObject || {};
      evtObj.type = eventType;
      evtObj.target = evtObj.target || this.target;
      evtObj.currentTarget = evtObj.currentTarget || this.currentTarget;

      let i = -1;
      while (++i < listeners.length) {
        listeners[i](evtObj);
      }
    }
    return this;
  }

  getListener(event) {
    const result = this.eventMap ? this.eventMap[event] : null;
    return (result || null);
  }

  destroy() {
    if (this.eventMap) {
      const keys = Object.keys(this.eventMap);
      for (let i = 0; i < keys.length; i++) {
        this.removeAllListener(keys[i]);
      }
    }

    this.eventMap = null;
    this.destroyed = true;
    return this;
  }
}

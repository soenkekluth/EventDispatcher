function isEmpty(obj) {
  console.log('isEmpty', obj);
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
}

export default class EventDispatcher {

  _eventMap = {};
  _destroyed = false;
  _target = null;
  _currentTarget = null;

  constructor({ target, currentTarget } = {}) {
    this._target = target || this;
    this._currentTarget = currentTarget || this;

    this.on = this.bind = this.addEventListener = this.addListener;
    this.off = this.unbind = this.removeEventListener = this.removeListener;
    this.once = this.one = this.addListenerOnce;
    this.emit = this.trigger = this.dispatchEvent = this.dispatch;
  }

  addListener(event, listener) {
    const listeners = this.getListener(event);
    if (!listeners) {
      this._eventMap[event] = [listener];
    } else if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
    return this;
  }

  addListenerOnce(event, listener) {
    let f2 = (e) => {
      listener(e);
      this.off(event, f2);
      f2 = null;
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
          delete (this._eventMap[event]);
        }
      }
    }
    return this;
  }

  removeAllListener(event) {
    const listeners = this.getListener(event);
    if (listeners) {
      this._eventMap[event].length = 0;
      delete (this._eventMap[event]);
    }
    return this;
  }

  hasListener(event) {
    return this.getListener(event) !== null;
  }

  hasListeners() {
    return (this._eventMap !== null && this._eventMap !== undefined && !isEmpty(this._eventMap));
  }

  dispatch(eventType, eventObject) {
    const listeners = this.getListener(eventType);

    if (listeners) {
      const evtObj = eventObject || {};
      evtObj.type = eventType;
      evtObj.target = evtObj.target || this._target;
      evtObj.currentTarget = evtObj.currentTarget || this._currentTarget;

      let i = -1;
      while (++i < listeners.length) {
        listeners[i](evtObj);
      }
    }
    return this;
  }

  getListener(event) {
    const result = this._eventMap ? this._eventMap[event] : null;
    return (result || null);
  }

  destroy() {
    if (this._eventMap) {
      const keys = Object.keys(this._eventMap);
      for (let i = 0; i < keys.length; i++) {
        this.removeAllListener(keys[i]);
      }
    }

    this._eventMap = null;
    this._destroyed = true;
    return this;
  }
}

import assign from 'object-assign';

export default class CoreDispatcher {

  constructor() {
    this.eventMap = {};
    this.destroyed = false;
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
    if (!handler) {
      this.eventMap[eventName].length = 0;
      delete this.eventMap[eventName];
    } else {
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

  commitEvent(listeners, eventObject) {
    for (let i = 0, l = listeners.length; i < l; i++) {
      if (listeners[i]) {
        listeners[i](eventObject);
      } else if (console) {
        console.warn('listener undefined', i);
      }
    }
    return this;
  }

  commitEvents(listeners, eventObjects) {
    for (let i = 0, l = listeners.length; i < l; i++) {
      if (listeners[i]) {
        for (let ii = 0, ll = eventObjects.length; ii < ll; ii++) {
          listeners[i](eventObjects[ii]);
        }
      } else if (console) {
        console.warn('listener undefined', i);
      }
    }
    return this;
  }

  createEventObject(eventType, eventObject) {
    let evtObj = {
      type: eventType,
      target: this,
    };

    if (eventObject) {
      evtObj = assign(evtObj, eventObject);
    }

    return evtObj;
  }


  triggerSync(eventObjects) {
    const listenerCollection = [];
    for (let i = 0, l = eventObjects.length; i < l; i++) {
      const listeners = this.getListener(eventObjects[i].type);
      for (let ii = 0, ll = listeners.length; ii < ll; ii++) {
        const listener = listeners[ii];
        if(listenerCollection.indexOf(listener) < 0){
          listenerCollection.push(listener);
        }
      }

    }
  }

  trigger(eventType, eventObject) {
    const listeners = this.getListener(eventType);
    if (listeners && listeners.length) {
      return this.commitEvent(listeners, this.createEventObject(eventType, eventObject));
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
    return (!!this.eventMap && this.eventMap[eventName]) ? this.eventMap[eventName] : [];
  }

  destroy() {
    this.clear();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  }
}

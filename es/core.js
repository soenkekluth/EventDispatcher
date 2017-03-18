import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import assign from 'object-assign';

var CoreDispatcher = function () {
  function CoreDispatcher() {
    _classCallCheck(this, CoreDispatcher);

    this.eventMap = {};
    this.destroyed = false;
  }

  CoreDispatcher.prototype.on = function on(eventName, handler) {
    var listeners = this.getListener(eventName);
    if (listeners.indexOf(handler) === -1) {
      listeners.push(handler);
    }
    this.eventMap[eventName] = this.eventMap[eventName] || listeners;
    return this;
  };

  CoreDispatcher.prototype.once = function once(eventName, handler) {
    var _this = this;

    var f2 = function f2(e) {
      handler(e);
      _this.off(eventName, f2);
    };
    return this.on(eventName, f2);
  };

  CoreDispatcher.prototype.off = function off(eventName, handler) {
    var listeners = this.getListener(eventName);
    if (!handler) {
      this.eventMap[eventName].length = 0;
      delete this.eventMap[eventName];
    } else {
      var i = listeners.indexOf(handler);
      if (i > -1) {
        listeners.splice(i, 1);
        if (!listeners.length) {
          delete this.eventMap[eventName];
        }
      }
    }
    return this;
  };

  CoreDispatcher.prototype.commitEvent = function commitEvent(listeners, eventObject) {
    for (var i = 0, l = listeners.length; i < l; i++) {
      if (listeners[i]) {
        listeners[i](eventObject);
      } else if (console) {
        console.warn('listener undefined', i);
      }
    }
    return this;
  };

  CoreDispatcher.prototype.commitEvents = function commitEvents(listeners, eventObjects) {
    for (var i = 0, l = listeners.length; i < l; i++) {
      if (listeners[i]) {
        for (var ii = 0, ll = eventObjects.length; ii < ll; ii++) {
          listeners[i](eventObjects[ii]);
        }
      } else if (console) {
        console.warn('listener undefined', i);
      }
    }
    return this;
  };

  CoreDispatcher.prototype.createEventObject = function createEventObject(eventType, eventObject) {
    var evtObj = {
      type: eventType,
      target: this
    };

    if (eventObject) {
      evtObj = assign(evtObj, eventObject);
    }

    return evtObj;
  };

  CoreDispatcher.prototype.triggerSync = function triggerSync(eventObjects) {
    var listenerCollection = [];
    for (var i = 0, l = eventObjects.length; i < l; i++) {
      var listeners = this.getListener(eventObjects[i].type);
      for (var ii = 0, ll = listeners.length; ii < ll; ii++) {
        var listener = listeners[ii];
        if (listenerCollection.indexOf(listener) < 0) {
          listenerCollection.push(listener);
        }
      }
    }
  };

  CoreDispatcher.prototype.trigger = function trigger(eventType, eventObject) {
    var listeners = this.getListener(eventType);
    if (listeners && listeners.length) {
      return this.commitEvent(listeners, this.createEventObject(eventType, eventObject));
    }
    return this;
  };

  CoreDispatcher.prototype.clear = function clear() {
    if (this.eventMap) {
      var keys = Object.keys(this.eventMap);
      for (var i = 0, l = keys.length; i < l; i++) {
        this.eventMap[keys[i]].length = 0;
        delete this.eventMap[keys[i]];
      }
    }
  };

  CoreDispatcher.prototype.getListener = function getListener(eventName) {
    return !!this.eventMap && this.eventMap[eventName] ? this.eventMap[eventName] : [];
  };

  CoreDispatcher.prototype.destroy = function destroy() {
    this.clear();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  };

  return CoreDispatcher;
}();

export { CoreDispatcher as default };
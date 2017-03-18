import _classCallCheck from "babel-runtime/helpers/classCallCheck";

var EventDispatcher = function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.eventMap = {};
  }

  EventDispatcher.prototype.on = function on(eventName, handler) {
    var listeners = this.getListener(eventName);
    if (!listeners) {
      this.eventMap[eventName] = [handler];
    } else if (listeners.indexOf(handler) === -1) {
      listeners.push(handler);
    }
    return this;
  };

  EventDispatcher.prototype.once = function once(eventName, handler) {
    var _this = this;

    var f2 = function f2(e) {
      handler(e);
      _this.off(eventName, f2);
    };
    return this.on(eventName, f2);
  };

  EventDispatcher.prototype.off = function off(eventName, handler) {
    if (!handler) {
      return this.removeAllListener(eventName);
    }

    var listeners = this.getListener(eventName);
    if (listeners) {
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

  EventDispatcher.prototype.removeAllListener = function removeAllListener(eventName) {

    if (!eventName) {
      if (this.eventMap) {
        var keys = Object.keys(this.eventMap);
        for (var i = 0; i < keys.length; i++) {
          this.removeAllListener(keys[i]);
        }
      }
      return;
    }

    var listeners = this.getListener(eventName);
    if (listeners) {
      this.eventMap[eventName].length = 0;
      delete this.eventMap[eventName];
    }
    return this;
  };

  EventDispatcher.prototype.trigger = function trigger(eventType) {
    var eventObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var listeners = this.getListener(eventType);

    if (listeners) {
      eventObject.type = eventType;
      eventObject.target = eventObject.target || this;

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](eventObject);
      }
    }

    return this;
  };

  EventDispatcher.prototype.getListener = function getListener(eventName) {
    var result = this.eventMap ? this.eventMap[eventName] : null;
    return result || null;
  };

  EventDispatcher.prototype.destroy = function destroy() {
    this.removeAllListener();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  };

  return EventDispatcher;
}();

export { EventDispatcher as default };
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDispatcher = function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.eventMap = {};
  }

  EventDispatcher.prototype.on = function on(eventName, handler) {
    var listeners = this.getListener(eventName);
    if (listeners.indexOf(handler) === -1) {
      listeners.push(handler);
    }
    this.eventMap[eventName] = this.eventMap[eventName] || listeners;
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
    var listeners = this.getListener(eventName);
    var i = listeners.indexOf(handler);
    if (i > -1) {
      listeners.splice(i, 1);
      if (!listeners.length) {
        delete this.eventMap[eventName];
      }
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

  EventDispatcher.prototype.clear = function clear() {
    if (this.eventMap) {
      var keys = Object.keys(this.eventMap);
      for (var i = 0, l = keys.length; i < l; i++) {
        this.eventMap[keys[i]].length = 0;
        delete this.eventMap[keys[i]];
      }
    }
  };

  EventDispatcher.prototype.getListener = function getListener(eventName) {
    return this.eventMap && this.eventMap[eventName] ? this.eventMap[eventName] : [];
  };

  EventDispatcher.prototype.destroy = function destroy() {
    this.clear();
    this.eventMap = null;
    this.destroyed = true;
    return this;
  };

  return EventDispatcher;
}();

exports.default = EventDispatcher;
module.exports = exports["default"];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isEmpty(obj) {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
}

var EventDispatcher = function () {
  function EventDispatcher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target,
        currentTarget = _ref.currentTarget;

    _classCallCheck(this, EventDispatcher);

    this.target = target || this;
    this.currentTarget = currentTarget || this;
    this.eventMap = {};
    this.destroyed = false;

    this.on = this.bind = this.addEventListener = this.addListener;
    this.off = this.unbind = this.removeEventListener = this.removeListener;
    this.once = this.one = this.addListenerOnce;
    this.emit = this.trigger = this.dispatchEvent = this.dispatch;
  }

  EventDispatcher.prototype.addListener = function addListener(event, listener) {
    var listeners = this.getListener(event);
    if (!listeners) {
      this.eventMap[event] = [listener];
    } else if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
    return this;
  };

  EventDispatcher.prototype.addListenerOnce = function addListenerOnce(event, listener) {
    var _this = this;

    var f2 = function f2(e) {
      listener(e);
      _this.off(event, f2);
    };
    return this.on(event, f2);
  };

  EventDispatcher.prototype.removeListener = function removeListener(event, listener) {
    if (!listener) {
      return this.removeAllListener(event);
    }

    var listeners = this.getListener(event);
    if (listeners) {
      var i = listeners.indexOf(listener);
      if (i > -1) {
        listeners.splice(i, 1);
        if (!listeners.length) {
          delete this.eventMap[event];
        }
      }
    }
    return this;
  };

  EventDispatcher.prototype.removeAllListener = function removeAllListener(event) {
    var listeners = this.getListener(event);
    if (listeners) {
      this.eventMap[event].length = 0;
      delete this.eventMap[event];
    }
    return this;
  };

  EventDispatcher.prototype.hasListener = function hasListener(event) {
    return this.getListener(event) !== null;
  };

  EventDispatcher.prototype.hasListeners = function hasListeners() {
    return this.eventMap !== null && this.eventMap !== undefined && !isEmpty(this.eventMap);
  };

  EventDispatcher.prototype.dispatch = function dispatch(eventType, eventObject) {
    var listeners = this.getListener(eventType);

    if (listeners) {
      var evtObj = eventObject || {};
      evtObj.type = eventType;
      evtObj.target = evtObj.target || this.target;
      evtObj.currentTarget = evtObj.currentTarget || this.currentTarget;

      var i = -1;
      while (++i < listeners.length) {
        listeners[i](evtObj);
      }
    }
    return this;
  };

  EventDispatcher.prototype.getListener = function getListener(event) {
    var result = this.eventMap ? this.eventMap[event] : null;
    return result || null;
  };

  EventDispatcher.prototype.destroy = function destroy() {
    if (this.eventMap) {
      var keys = Object.keys(this.eventMap);
      for (var i = 0; i < keys.length; i++) {
        this.removeAllListener(keys[i]);
      }
    }

    this.eventMap = null;
    this.destroyed = true;
    return this;
  };

  return EventDispatcher;
}();

exports.default = EventDispatcher;
module.exports = exports["default"];
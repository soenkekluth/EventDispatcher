'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

var EventDispatcher = function () {
  function EventDispatcher() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var target = _ref.target;
    var currentTarget = _ref.currentTarget;

    _classCallCheck(this, EventDispatcher);

    this._eventMap = {};
    this._destroyed = false;
    this._target = target || this;
    this._currentTarget = currentTarget || this;

    this.on = this.bind = this.addEventListener = this.addListener;
    this.off = this.unbind = this.removeEventListener = this.removeListener;
    this.once = this.one = this.addListenerOnce;
    this.emit = this.trigger = this.dispatchEvent = this.dispatch;
  }

  EventDispatcher.prototype.addListener = function addListener(event, listener) {
    var listeners = this.getListener(event);
    if (!listeners) {
      this._eventMap[event] = [listener];
    } else if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
    return this;
  };

  EventDispatcher.prototype.addListenerOnce = function addListenerOnce(event, listener) {
    var _this = this;

    var _f = function f2(e) {
      listener(e);
      _this.off(event, _f);
      listener = null;
      _f = null;
    };
    return this.on(event, _f);
  };

  EventDispatcher.prototype.removeListener = function removeListener(event, listener) {

    if (!listener) {
      return this.removeAllListener(event);
    }

    var listeners = this.getListener(event);
    if (listeners) {
      var i = listeners.indexOf(listener);
      if (i > -1) {
        listeners = listeners.splice(i, 1);
        if (!listeners.length) {
          delete this._eventMap[event];
        }
      }
    }
    return this;
  };

  EventDispatcher.prototype.removeAllListener = function removeAllListener(event) {
    var listeners = this.getListener(event);
    if (listeners) {
      this._eventMap[event].length = 0;
      delete this._eventMap[event];
    }
    return this;
  };

  EventDispatcher.prototype.hasListener = function hasListener(event) {
    return this.getListener(event) !== null;
  };

  EventDispatcher.prototype.hasListeners = function hasListeners() {
    return this._eventMap !== null && this._eventMap !== undefined && !isEmpty(this._eventMap);
  };

  EventDispatcher.prototype.dispatch = function dispatch(eventType, eventObject) {
    var listeners = this.getListener(eventType);

    if (listeners) {
      eventObject = eventObject || {};
      eventObject.type = eventType;
      eventObject.target = eventObject.target || this._target;
      eventObject.currentTarget = eventObject.currentTarget || this._currentTarget;

      var i = -1;
      while (++i < listeners.length) {
        listeners[i](eventObject);
      }
    }
    return this;
  };

  EventDispatcher.prototype.getListener = function getListener(event) {
    var result = this._eventMap ? this._eventMap[event] : null;
    return result || null;
  };

  EventDispatcher.prototype.destroy = function destroy() {
    if (this._eventMap) {
      for (var i in this._eventMap) {
        this.removeAllListener(i);
      }
      this._eventMap = null;
    }
    this._destroyed = true;
    return this;
  };

  return EventDispatcher;
}();

exports.default = EventDispatcher;
module.exports = exports['default'];
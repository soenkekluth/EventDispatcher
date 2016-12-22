'use strict';

exports.__esModule = true;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  CoreDispatcher.prototype.trigger = function trigger(eventType, eventObject) {
    var listeners = this.getListener(eventType);
    if (listeners && listeners.length) {
      var payload = {
        type: eventType,
        target: this
      };

      if (eventObject) {
        payload = (0, _objectAssign2.default)(payload, eventObject);
      }

      return this.commitEvent(listeners, payload);
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

exports.default = CoreDispatcher;
module.exports = exports['default'];
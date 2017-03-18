import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import CoreDispatcher from './core';
import assign from 'object-assign';

var EventDispatcher = function (_CoreDispatcher) {
  _inherits(EventDispatcher, _CoreDispatcher);

  function EventDispatcher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target,
        currentTarget = _ref.currentTarget;

    _classCallCheck(this, EventDispatcher);

    var _this = _possibleConstructorReturn(this, _CoreDispatcher.call(this));

    _this.target = target || _this;
    _this.currentTarget = currentTarget || _this;

    _this.addListener = _this.bind = _this.addEventListener = _this.on;
    _this.removeListener = _this.unbind = _this.removeEventListener = _this.off;
    _this.addListenerOnce = _this.one = _this.once;
    _this.emit = _this.dispatch = _this.dispatchEvent = _this.trigger;

    _this.hasListener = _this.hasListeners = _this.listens;
    return _this;
  }

  EventDispatcher.prototype.listens = function listens(eventName) {
    if (eventName) {
      return this.getListener(eventName).length > 0;
    }
    return !!this.eventMap && Object.keys(this.eventMap).length > 0;
  };

  EventDispatcher.prototype.createEventObject = function createEventObject(eventType, eventObject) {
    var evtObj = {
      type: eventType,
      target: this.target,
      currentTarget: this.currentTarget
    };

    if (eventObject) {
      evtObj = assign(evtObj, eventObject);
    }

    return evtObj;
  };

  return EventDispatcher;
}(CoreDispatcher);

export { EventDispatcher as default };
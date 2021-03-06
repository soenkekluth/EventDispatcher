'use strict';

exports.__esModule = true;
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventDispatcher = function (_CoreDispatcher) {
  (0, _inherits3.default)(EventDispatcher, _CoreDispatcher);

  function EventDispatcher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target,
        currentTarget = _ref.currentTarget;

    (0, _classCallCheck3.default)(this, EventDispatcher);

    var _this = (0, _possibleConstructorReturn3.default)(this, _CoreDispatcher.call(this));

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
      evtObj = (0, _objectAssign2.default)(evtObj, eventObject);
    }

    return evtObj;
  };

  return EventDispatcher;
}(_core2.default);

exports.default = EventDispatcher;
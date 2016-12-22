'use strict';

exports.__esModule = true;

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

  EventDispatcher.prototype.trigger = function trigger(eventType, eventObject) {
    var listeners = this.getListener(eventType);
    if (listeners && listeners.length) {
      var payload = {
        type: eventType,
        target: this.target,
        currentTarget: this.currentTarget
      };

      if (eventObject) {
        payload = (0, _objectAssign2.default)(payload, eventObject);
      }

      return this.commitEvent(listeners, payload);
    }

    return this;
  };

  return EventDispatcher;
}(_core2.default);

exports.default = EventDispatcher;
module.exports = exports['default'];
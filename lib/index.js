'use strict';

exports.__esModule = true;
exports.CoreDispatcher = undefined;

var _core = require('./core');

Object.defineProperty(exports, 'CoreDispatcher', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_core).default;
  }
});

var _eventdispatcher = require('./eventdispatcher');

var _eventdispatcher2 = _interopRequireDefault(_eventdispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _eventdispatcher2.default;
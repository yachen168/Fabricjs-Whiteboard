"use strict";

exports.__esModule = true;
exports.default = void 0;

var _remove = _interopRequireDefault(require("./images/remove.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCursor = function getCursor(_ref) {
  var type = _ref.type;

  switch (type) {
    case 'eraser':
      {
        return _remove.default;
      }

    default:
      {
        return '';
      }
  }
};

var _default = getCursor;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _remove = _interopRequireDefault(require("./images/remove.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCursor = _ref => {
  let {
    type
  } = _ref;

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
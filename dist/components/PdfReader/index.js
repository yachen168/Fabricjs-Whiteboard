"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _entry = require("react-pdf/dist/esm/entry.webpack");

var _reactPdf = require("react-pdf");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(_reactPdf.pdfjs.version, "/pdf.worker.js");

const PDFReader = _ref => {
  let {
    fileReaderInfo,
    updateFileReaderInfo
  } = _ref;

  function onRenderSuccess() {
    const importPDFCanvas = document.querySelector('.import-pdf-page canvas');
    const pdfAsImageSrc = importPDFCanvas.toDataURL();
    updateFileReaderInfo({
      currentPage: pdfAsImageSrc
    });
  }

  function onDocumentLoadSuccess(_ref2) {
    let {
      numPages
    } = _ref2;
    updateFileReaderInfo({
      totalPages: numPages
    });
  }

  function changePage(offset) {
    updateFileReaderInfo({
      currentPageNumber: fileReaderInfo.currentPageNumber + offset
    });
  }

  const nextPage = () => changePage(1);

  const previousPage = () => changePage(-1);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.pdfReader
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.fileContainer
  }, /*#__PURE__*/_react.default.createElement(_entry.Document, {
    className: _indexModule.default.document,
    file: fileReaderInfo.file,
    onLoadSuccess: onDocumentLoadSuccess,
    onLoadProgress: _ref3 => {
      let {
        loaded,
        total
      } = _ref3;
      return console.log('Loading a document: ' + loaded / total * 100 + '%');
    }
  }, /*#__PURE__*/_react.default.createElement(_entry.Page, {
    className: "import-pdf-page",
    onRenderSuccess: onRenderSuccess,
    pageNumber: fileReaderInfo.currentPageNumber
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.pageInfo
  }, /*#__PURE__*/_react.default.createElement("span", null, "Page ", fileReaderInfo.currentPageNumber, " of ", fileReaderInfo.totalPages || '--'), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    disabled: fileReaderInfo.currentPageNumber <= 1,
    onClick: previousPage
  }, "Previous"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    disabled: fileReaderInfo.currentPageNumber >= fileReaderInfo.totalPages,
    onClick: nextPage
  }, "Next")));
};

var _default = PDFReader;
exports.default = _default;
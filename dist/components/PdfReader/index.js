"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _entry = require("react-pdf/dist/esm/entry.webpack");

var _reactPdf = require("react-pdf");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/" + _reactPdf.pdfjs.version + "/pdf.worker.js";

var PDFReader = function PDFReader(_ref) {
  var fileReaderInfo = _ref.fileReaderInfo,
      updateFileReaderInfo = _ref.updateFileReaderInfo;

  function onRenderSuccess() {
    var importPDFCanvas = document.querySelector('.import-pdf-page canvas');
    var pdfAsImageSrc = importPDFCanvas.toDataURL();
    updateFileReaderInfo({
      currentPage: pdfAsImageSrc
    });
  }

  function onDocumentLoadSuccess(_ref2) {
    var numPages = _ref2.numPages;
    updateFileReaderInfo({
      totalPages: numPages
    });
  }

  function changePage(offset) {
    updateFileReaderInfo({
      currentPageNumber: fileReaderInfo.currentPageNumber + offset
    });
  }

  var nextPage = function nextPage() {
    return changePage(1);
  };

  var previousPage = function previousPage() {
    return changePage(-1);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.pdfReader
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.fileContainer
  }, /*#__PURE__*/_react.default.createElement(_entry.Document, {
    className: _indexModule.default.document,
    file: fileReaderInfo.file,
    onLoadSuccess: onDocumentLoadSuccess,
    onLoadProgress: function onLoadProgress(_ref3) {
      var loaded = _ref3.loaded,
          total = _ref3.total;
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
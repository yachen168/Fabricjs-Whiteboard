"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _entry = require("react-pdf/dist/esm/entry.webpack");

var _fileReader = require("../../../actions/fileReader");

require("react-pdf/dist/esm/Page/AnnotationLayer.css");

var _reactPdf = require("react-pdf");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(_reactPdf.pdfjs.version, "/pdf.worker.js");

function PDFReader() {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    fileReader
  } = (0, _reactRedux.useSelector)(state => state);

  const onRenderSuccess = () => {
    const importPDFCanvas = document.querySelector('.import-pdf-page canvas');
    const pdfAsImageSrc = importPDFCanvas.toDataURL();
    console.log('setFileReaderInfo');
    dispatch((0, _fileReader.setFileReaderInfo)({
      currentPage: pdfAsImageSrc
    }));
  };

  const onFileChange = event => {
    console.log('onFileChange');
    console.log('event', event);
    dispatch((0, _fileReader.setFileReaderInfo)({
      file: event.target.files[0],
      currentPageNumber: 1
    }));
  };

  const onDocumentLoadSuccess = _ref => {
    let {
      numPages
    } = _ref;
    console.log('onDocumentLoadSuccess');
    dispatch((0, _fileReader.setFileReaderInfo)({
      totalPages: numPages
    }));
  };

  const changePage = offset => {
    dispatch((0, _fileReader.setFileReaderInfo)({
      currentPageNumber: fileReader.currentPageNumber + offset
    }));
  };

  const nextPage = () => changePage(1);

  const previousPage = () => changePage(-1);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.pdfReader
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "uploadPdf"
  }, "Upload pdf\uFF1A"), /*#__PURE__*/_react.default.createElement("input", {
    id: "uploadPdf",
    accept: ".pdf",
    type: "file",
    onChange: onFileChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.fileContainer
  }, /*#__PURE__*/_react.default.createElement(_entry.Document, {
    className: _indexModule.default.document,
    file: fileReader.file,
    onLoadSuccess: onDocumentLoadSuccess,
    onLoadProgress: _ref2 => {
      let {
        loaded,
        total
      } = _ref2;
      return console.log('Loading a document: ' + loaded / total * 100 + '%');
    }
  }, /*#__PURE__*/_react.default.createElement(_entry.Page, {
    className: "import-pdf-page",
    onRenderSuccess: onRenderSuccess,
    pageNumber: fileReader.currentPageNumber
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, "Page ", fileReader.currentPageNumber, " of ", fileReader.totalPages || '--'), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    disabled: fileReader.currentPageNumber <= 1,
    onClick: previousPage
  }, "Previous"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    disabled: fileReader.currentPageNumber >= fileReader.totalPages,
    onClick: nextPage
  }, "Next")));
}

var _default = PDFReader;
exports.default = _default;
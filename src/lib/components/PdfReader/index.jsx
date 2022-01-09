import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { setFileReaderInfo } from '../../../actions/fileReader';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { pdfjs } from 'react-pdf';
import styles from './index.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFReader() {
  const dispatch = useDispatch();
  const { fileReader } = useSelector((state) => state);

  const onRenderSuccess = () => {
    const importPDFCanvas = document.querySelector('.import-pdf-page canvas');
    const pdfAsImageSrc = importPDFCanvas.toDataURL();

    console.log('setFileReaderInfo');

    dispatch(setFileReaderInfo({ currentPage: pdfAsImageSrc }));
  };

  const onFileChange = (event) => {
    console.log('onFileChange');
    console.log('event', event);
    dispatch(setFileReaderInfo({ file: event.target.files[0], currentPageNumber: 1 }));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('onDocumentLoadSuccess');
    dispatch(setFileReaderInfo({ totalPages: numPages }));
  };

  const changePage = (offset) => {
    dispatch(setFileReaderInfo({ currentPageNumber: fileReader.currentPageNumber + offset }));
  };

  const nextPage = () => changePage(1);
  const previousPage = () => changePage(-1);

  return (
    <div className={styles.pdfReader}>
      <div>
        <label htmlFor="uploadPdf">Upload pdf：</label>
        <input id="uploadPdf" accept=".pdf" type="file" onChange={onFileChange} />
      </div>
      <div className={styles.fileContainer}>
        <Document
          className={styles.document}
          file={fileReader.file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadProgress={({ loaded, total }) =>
            console.log('Loading a document: ' + (loaded / total) * 100 + '%')
          }
        >
          <Page
            className="import-pdf-page"
            onRenderSuccess={onRenderSuccess}
            pageNumber={fileReader.currentPageNumber}
          />
        </Document>
      </div>
      <div>
        <span>
          Page {fileReader.currentPageNumber} of {fileReader.totalPages || '--'}
        </span>
        <button type="button" disabled={fileReader.currentPageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={fileReader.currentPageNumber >= fileReader.totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFReader;

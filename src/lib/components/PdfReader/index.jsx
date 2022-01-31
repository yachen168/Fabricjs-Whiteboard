import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { setFileReaderInfo } from '../../../actions/fileReader';
import { Button } from 'primereact/button';
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

    dispatch(setFileReaderInfo({ currentPage: pdfAsImageSrc }));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(setFileReaderInfo({ totalPages: numPages }));
  };

  const changePage = (offset) => {
    dispatch(setFileReaderInfo({ currentPageNumber: fileReader.currentPageNumber + offset }));
  };

  const nextPage = () => changePage(1);
  const previousPage = () => changePage(-1);

  return (
    <div className={styles.pdfReader}>
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
      <div className={styles.pageInfo}>
        <span>
          Page {fileReader.currentPageNumber} of {fileReader.totalPages || '--'}
        </span>
        <Button
          className="p-button-info p-button-text"
          type="button"
          label="< Previous"
          disabled={fileReader.currentPageNumber <= 1}
          onClick={previousPage}
        />

        <Button
          className="p-button-info p-button-text"
          type="button"
          label="Next >"
          disabled={fileReader.currentPageNumber >= fileReader.totalPages}
          onClick={nextPage}
        />
      </div>
    </div>
  );
}

export default PDFReader;

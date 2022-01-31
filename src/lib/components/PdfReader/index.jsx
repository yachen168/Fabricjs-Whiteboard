import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button } from 'primereact/button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { pdfjs } from 'react-pdf';
import styles from './index.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFReader({ fileReaderInfo, updateFileReaderInfo }) {
  const onRenderSuccess = () => {
    const importPDFCanvas = document.querySelector('.import-pdf-page canvas');
    const pdfAsImageSrc = importPDFCanvas.toDataURL();

    updateFileReaderInfo({ currentPage: pdfAsImageSrc });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    updateFileReaderInfo({ totalPages: numPages });
  };

  const changePage = (offset) => {
    updateFileReaderInfo({ currentPageNumber: fileReaderInfo.currentPageNumber + offset });
  };

  const nextPage = () => changePage(1);
  const previousPage = () => changePage(-1);

  return (
    <div className={styles.pdfReader}>
      <div className={styles.fileContainer}>
        <Document
          className={styles.document}
          file={fileReaderInfo.file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadProgress={({ loaded, total }) =>
            console.log('Loading a document: ' + (loaded / total) * 100 + '%')
          }
        >
          <Page
            className="import-pdf-page"
            onRenderSuccess={onRenderSuccess}
            pageNumber={fileReaderInfo.currentPageNumber}
          />
        </Document>
      </div>
      <div className={styles.pageInfo}>
        <span>
          Page {fileReaderInfo.currentPageNumber} of {fileReaderInfo.totalPages || '--'}
        </span>
        <Button
          className="p-button-info p-button-text"
          type="button"
          label="< Previous"
          disabled={fileReaderInfo.currentPageNumber <= 1}
          onClick={previousPage}
        />

        <Button
          className="p-button-info p-button-text"
          type="button"
          label="Next >"
          disabled={fileReaderInfo.currentPageNumber >= fileReaderInfo.totalPages}
          onClick={nextPage}
        />
      </div>
    </div>
  );
}

export default PDFReader;

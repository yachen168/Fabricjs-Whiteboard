import React from 'react';
import { Whiteboard } from './lib';
import styles from './app.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <main>
        <Whiteboard aspectRatio={4 / 3} />
      </main>
    </div>
  );
};

export default App;

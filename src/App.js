import React from 'react';
import Whiteboard from './components/WhiteBoard';

import styles from './app.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Whiteboard />
    </div>
  );
};

export default App;

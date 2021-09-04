import React from 'react';
import Home from './views/Home';
import styles from './app.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  );
};

export default App;

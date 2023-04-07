import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.centerItems}>
      <h1>Error 404</h1>
      <h2>
        We apologize, but it seems the page you are looking for has taken a sick
        day
      </h2>
    </div>
  );
};

export default NotFound;

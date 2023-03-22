import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>2023 | The Clinic</div>
      <div>
        Made by <b>Physician Registration Team</b> &copy;
      </div>
    </div>
  );
};

export default Footer;

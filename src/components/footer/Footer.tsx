import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>2023 | G-Unit Clinic</div>
      <div>
        Made by <b>G-Unit-Team</b> &copy;
      </div>
    </div>
  );
};

export default Footer;

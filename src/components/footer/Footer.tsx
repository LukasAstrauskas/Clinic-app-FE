import React from 'react';
import styles from './Footer.module.css';
import { PAGENEAME } from '../../utils/Constants';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>2023 | {PAGENEAME}</div>
      <div>
        Made by <b>G-Unit-Team</b> &copy;
      </div>
    </div>
  );
};

export default Footer;

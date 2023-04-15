import React from 'react';
import styles from './WelcomePage.module.css';
import { NavLink } from 'react-router-dom';

type props = {
  icon2?: string;
  icon1: string;
  title: string;
  linkTo?: string;
};

const Item = ({ title, icon1, icon2, linkTo = '*' }: props) => {
  return (
    <NavLink to={linkTo} className={styles.itemLink}>
      <div className={styles.item}>
        <div>
          <img src={icon1} alt='icon.png' className={styles.itemIcon} />
          <img src={icon2} className={styles.itemIcon} />
        </div>
        <h2>{title}</h2>
      </div>
    </NavLink>
  );
};

export default Item;

import React from 'react';
import styles from './HomePage.module.css';
import { NavLink } from 'react-router-dom';

type props = {
  icon: string;
  title: string;
  linkTo: string;
};

const Item = ({ title, icon, linkTo }: props) => {
  return (
    <NavLink to={linkTo} className={styles.itemLink}>
      <div className={styles.item}>
        <div>
          <img src={icon} alt='icon.png' className={styles.itemIcon} />
        </div>
        <h2>{title}</h2>
      </div>
    </NavLink>
  );
};

export default Item;

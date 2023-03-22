import React from 'react';
import styles from './Content.module.css';

const Item = (props: { icon2?: string; icon1: string; title: string }) => {
  return (
    <a href='#' className={styles.itemLink}>
      <div className={styles.item}>
        <div>
          <img src={props.icon1} alt='icon.png' className={styles.itemIcon} />
          <img src={props.icon2} className={styles.itemIcon} />
        </div>
        <h2>{props.title}</h2>
      </div>
    </a>
  );
};

export default Item;

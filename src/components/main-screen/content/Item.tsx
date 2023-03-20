import React from 'react';

const Item = (props: {
  icon2?: string | undefined;
  icon1: string | undefined;
  title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <a href='#' className='item-link'>
      <div className='item'>
        <div>
          <img src={props.icon1} alt='icon.png' className='item-icon' />
          <img src={props.icon2} className='item-icon' />
        </div>
        <h2 className='item-name'>{props.title}</h2>
      </div>
    </a>
  );
};

export default Item;

/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MenuItem({ menuItem }) {
  const { push } = useHistory();
  return (
    <button
      type="button"
      onClick={() => {
        push(`/edit-menu-item/${menuItem.id}`);
      }}
      className="p-2 h-100 menu-item"
    >
      <img
        style={{ objectFit: 'cover' }}
        src={menuItem.menu_item_photo}
        alt="item name"
        height="125"
      />
      <div className="pl-0 pr-0">
        <h3>{menuItem.menu_item_name}</h3>
        <p>{menuItem.menu_item_description}</p>
        <p className="text-success">${menuItem.menu_item_price}</p>
        {/* <button color="primary">View Item</button> */}
      </div>
    </button>
  );
}

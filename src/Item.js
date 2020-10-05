import React from 'react';

export default function Item({item}) {
  return ([
    <div className="new-item row">
      <div className="item-checkbox">[x]</div>
      <div className="item-title"><p>{item}</p></div>
    </div>
  ])
}

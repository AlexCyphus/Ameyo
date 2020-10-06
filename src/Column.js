import React from 'react';

let cons = console.log('hi')

let i = 0

export default function Column({items, action, title, checkItem}) {
  return ([
    <div className="col-3 p-1">
    <p className="column-header text-center">{title}</p>
      <div className="outer-column">
        <div className="items">
          {items.map((item) => {
            i++
            if (item.completed) {
              return ([
                <div className="item-row d-flex" key={i}>
                  <div className="item-checkbox d-flex">
                    <div className="checkbox m-auto"></div>
                  </div>
                  <div className="item-name"><p className="item-p"  key={item.key}>{item.title}</p></div>
                </div>
              ])
            }
            else {
              return ([
                <div className="item-row d-flex" key={i}>
                  <div className="item-checkbox d-flex">
                    <div className="checkbox m-auto"></div>
                  </div>
                  <div className="item-name"><p className="item-p"  key={item.key}>{item.title}</p></div>
                </div>
              ])
            }
          }
        )}
        </div>
        <div className="add-item d-flex">
          <p className="m-auto">{action}</p>
        </div>
      </div>
    </div>
  ])
}


import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';



export default function Column({items, action, title, checkItem, itemInputChange, colNum, submitItem, inputVal}) {
  return ([
    <div className="col-3 p-1">
    <p className="column-header text-center">{title}</p>
      <div className="outer-column">
        <div className="items">
          {items.map((item, index) => {
              return ([
                <div className={"item-row d-flex " + item.completed} key={index} onClick={checkItem} id={item.id}>
                  <div className="item-checkbox d-flex">
                    <div className="checkbox m-auto">
                      {item.completed == "item-complete" ? <p className="checkbox-cross">x</p> : null}
                    </div>
                  </div>
                  <div className="item-name"><p className="item-p" key={item.key}>{item.title}</p></div>
                </div>
              ])
            }
          )}
        </div>
        <form className="w-100" onSubmit={submitItem} id={'col' + colNum}>
          <div className="add-item d-flex">
            <input className="w-100 text-center" type="text" placeholder={action} onChange={itemInputChange} id={'col' + colNum} value={inputVal}/>
          </div>
        </form>
      </div>
    </div>
  ])
}

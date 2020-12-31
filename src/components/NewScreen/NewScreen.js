import './NewScreen.scss';
import React from 'react';

const NewScreen = () => {
    console.log('render')
    return (
        <div className="new-screen-outer">
            <p className="close-popup">x</p>
            <div className="new-screen-inner">
                <h1 className="pb-5"> 🆕 Introducing: Labels! 🆕 </h1>
                <div className="d-flex">
                    <div className="p-relative">
                        <img alt="" src="./info6.png" id="new-screen-image"></img>
                    </div>
                    <div className="d-flex">
                        <div className="text-left new-screen-labels-info">
                            <p>You can now easily add labels to your notes for better visual clarity!</p>
                            <p>Simply start a note with the group followed by a colon (:) and a label will be assigned to the group</p>
                            <p>For example... </p>
                            <p><code>ECON255: Read pages 315 to 319</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewScreen
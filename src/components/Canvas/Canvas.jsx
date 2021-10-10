import React from "react";
import clsx from "clsx";

import './Canvas.css';
import Char from "./Char/Char";


const Canvas = ({className, canvas}) => {
    return (
        <div className={clsx("canvas", className)}>
            <div className="canvas__content-holder">
                {canvas && canvas.map((items, index) => {
                        return (
                            <div key={index} className="canvas__column">
                                {items.map((subItems, idx) => <Char key={idx} char={subItems.type}/>)}
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    )
}

export default Canvas;

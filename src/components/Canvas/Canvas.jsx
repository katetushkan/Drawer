import React from "react";
import clsx from "clsx";

import './Canvas.css';
import Char from "./Char/Char";


const Canvas = ({className, canvas}) => {
    debugger
    return (
        <div className={clsx("canvas", className)}>
            <div className="canvas__content-holder">
                {canvas ? canvas.map((items) => {
                        return (
                            <div className="canvas__column">
                                {items.map((subItems) => {
                                    return <Char char={subItems.type}/>;
                                })}
                            </div>
                        );
                    }
                ) : '' }
            </div>
        </div>
    )
}

export default Canvas;

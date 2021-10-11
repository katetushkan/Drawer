import React from "react";
import clsx from "clsx";

import './Char.css';

const CHARS = {
    0: <>&nbsp;</>,
    1: 'x'
}

const Char = ({char, className}) => {
    debugger
    return (
        <span className={clsx('char', className)}>{char.type === 2 ? char.data.colour : CHARS[char.type]}</span>
    );
}

export default Char;

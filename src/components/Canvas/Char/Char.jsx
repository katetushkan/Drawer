import React from "react";
import clsx from "clsx";

import './Char.css';

const CHARS = {
    0: <>&nbsp;</>,
    1: 'x',
    2: 'o'
}

const Char = ({char, className}) => {
    return (
        <span className={clsx('char', className)}>{CHARS[char]}</span>
    );
}

export default Char;

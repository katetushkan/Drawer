import React from "react";
import clsx from "clsx";

import './Char.css';

const CHARS = {
    0: ' ',
    1: 'x',
    2: 'o'
}

const Char = ({char, className}) => {
    debugger
    return (
        <pre className={clsx('char', className)}>{char.type === 0 ? <>&npsp;</> : CHARS[char]}</pre>
    )
}

export default Char;

import React from 'react';
import clsx from "clsx";

import './Link.css';

const Link = ({name, className, onClick, children, disabled}) => {
    return (
        <a className={clsx("link", {
            'link--disabled': disabled,
           },className)}
           download={name}
           onClick={onClick}
        >
            {children}
        </a>
    )
}

export default Link;

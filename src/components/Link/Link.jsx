import React from 'react';
import clsx from "clsx";

import './Link.css';

const Link = ({name, className, href, children, disabled}) => {
    return (
        <a
            className={clsx("link", {
                'link--disabled': disabled,
            }, className)}
            download={name}
            href={disabled ? undefined : href}
            aria-disabled={disabled}
        >
            {children}
        </a>
    )
}

export default Link;

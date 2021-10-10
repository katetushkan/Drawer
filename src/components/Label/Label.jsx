import React from "react";
import clsx from "clsx";

const Label = ({htmlFor, className, children}) => {

    return (
        <label
            htmlFor={htmlFor}
            className={clsx('label', className)}>
            {children}
        </label>
    );
}

export default Label;

import React from "react";
import clsx from "clsx";
import Link from "../Link/Link";

import './DownloadAction.css';

const DownloadAction = ({fileName, className, onClick, disabled}) => {
    function handleOnClick(event) {
        onClick(event.currentTarget);
    }
    return (
        <div className="download-action__wrapper">
            <Link
                className={clsx('download-action__link', className)}
                name={fileName}
                onClick={handleOnClick}
                disabled={disabled}
            >
                download file
            </Link>
        </div>
    );
}

export default DownloadAction;

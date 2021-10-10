import React from "react";
import clsx from "clsx";
import FileInput from "../FileInput/FileInput";

import './UploadAction.css';

const UploadAction = ({className, onChange, children}) => {

    function handleOnChange (event) {
        const file = event.currentTarget.files[0];
        if (file) {
            onChange(file)
        }
    }

    return (
        <div className="upload-action__wrapper">
            <FileInput
                className={clsx('upload-action__input', className)}
                autoFocus
                id="upload"
                onChange={handleOnChange}
            />
            <label
                htmlFor="upload"
                className='upload-action__label'
            >
                {children}
            </label>
        </div>
    );
}

export default UploadAction;

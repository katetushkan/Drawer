import React from "react";
import clsx from "clsx";
import Label from "../Label/Label";
import FileInput from "../FileInput/FileInput";

import './UploadAction.css';

const UploadAction = ({className, onChange, children}) => {

    function handleOnChange (event) {
        const file = event.currentTarget.files[0]
        onChange(file)
    }

    return (
        <div className="upload-action__wrapper">
            <FileInput
                className={clsx('upload-action__input', className)}
                autoFocus={true}
                type="file"
                id="upload"
                onChange={handleOnChange}
            />
            <Label
                htmlFor="upload"
                className='upload-action__label'>
                {children}
            </Label>
        </div>
    );
}

export default UploadAction;

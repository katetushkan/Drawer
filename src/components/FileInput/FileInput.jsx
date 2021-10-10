import React from "react";
import clsx from "clsx";

import './FileInput.css';

const FileInput = ({id, className, onChange, autoFocus}) => {

  return (
      <input
          className={clsx('file-input', className)}
          autoFocus={autoFocus}
          type="file"
          id={id}
          onChange={onChange}
      />
  );
}

export default FileInput;

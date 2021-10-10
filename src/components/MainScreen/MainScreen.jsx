import React, {useState} from "react";

import UploadAction from "../UploadAction/UploadAction";
import DownloadAction from "../DownloadAction/DownloadAction";
import Canvas from "../Canvas/Canvas";
import {FileService} from "../../services/FileService/FileService.js";

import "./MainScreen.css";
import {useDataConverterContext, useDrawerContext} from "../../services/ServiceProvider";

const MainScreen = () => {
    const dataConverter= useDataConverterContext();
    const drawer = useDrawerContext();
    const [canvas, setCanvas] = useState();
    const fileService = new FileService();
    const [downloadDisabled, setDownloadDisabled ] = useState(true)
    const [hideCanvas, setHideCanvas] = useState(true)
    const [error, setError] = useState('');

    function onchange(file) {

        fileService.readTextFile(file).then((result)=>{
            console.log(result)
            try {
                let objects = dataConverter.parseCommands(result);
                console.log(objects)
                objects.forEach((command) => {
                    drawer.executeCommand(command);
                });
                setDownloadDisabled(false);
                setHideCanvas(false);
                setCanvas(drawer.canvas);
                debugger
            }
            catch (e) {
                setError(e.message)
            }
        })
    }

    function clickDownloadLink (link) {
        if (!drawer.canvas) {
            return
        }
        let string = dataConverter.serializeCanvas(drawer.canvas);
        try {
            let blob = fileService.writeTextToFile("output.txt", string);
            link.href = URL.createObjectURL(blob);
        }
        catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="main-screen">
            <div className="main-screen__content-wrapper">
                { hideCanvas ||
                    <Canvas
                        className="main-screen__canvas"
                        canvas={canvas}
                    />
                }
                <div className="main-screen__controls-wrapper">
                    <UploadAction
                        className="main-screen__upload"
                        onChange={onchange}
                    >
                        upload file
                    </UploadAction>
                    <DownloadAction
                        onClick={clickDownloadLink}
                        className="main-screen__download"
                        fileName="output.txt"
                        disabled={downloadDisabled}
                    />
                </div>
                { !error || <h3 className="main-screen__error-message">! Error: {error}</h3>}
            </div>
        </div>

    );
}

export default MainScreen;

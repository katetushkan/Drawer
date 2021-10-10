import React, {useEffect, useState} from "react";

import UploadAction from "../UploadAction/UploadAction";
import DownloadAction from "../DownloadAction/DownloadAction";
import Canvas from "../Canvas/Canvas";
import {FileService} from "../../services/FileService/FileService.js";

import "./MainScreen.css";
import {useDataConverterContext, useDrawerContext} from "../../services/ServiceProvider";

const fileService = new FileService();

const MainScreen = () => {
    const dataConverter = useDataConverterContext();
    const drawer = useDrawerContext();
    const [canvas, setCanvas] = useState(null);
    const [downloadLink, setDownloadLink] = useState(undefined);
    const [error, setError] = useState('');

    useEffect(() => {
        if (downloadLink) {
            URL.revokeObjectURL(downloadLink);
        }

        if (!canvas) {
            return;
        }

        let string = dataConverter.serializeCanvas(canvas);
        try {
            const blob = fileService.createTextFile("output.txt", string);
            const link = URL.createObjectURL(blob);
            setDownloadLink(link);
        }
        catch (e) {
            setError(e.message)
        }
    }, [canvas]);

    async function handleFileSelected(file) {
        try {
            const result = await fileService.readTextFile(file);
            console.log(result)
            let objects = dataConverter.parseCommands(result);
            console.log(objects)
            objects.forEach((command) => {
                drawer.executeCommand(command);
            });
            setCanvas(drawer.canvas);
        }
        catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="main-screen">
            <div className="main-screen__content-wrapper">
                { canvas &&
                    <Canvas
                        className="main-screen__canvas"
                        canvas={canvas}
                    />
                }
                <div className="main-screen__controls-wrapper">
                    <UploadAction
                        className="main-screen__upload"
                        onChange={handleFileSelected}
                    >
                        upload file
                    </UploadAction>
                    <DownloadAction
                        href={downloadLink}
                        className="main-screen__download"
                        fileName="output.txt"
                        disabled={!canvas}
                    />
                </div>
                {error && <h3 className="main-screen__error-message">! Error: {error}</h3>}
            </div>
        </div>

    );
}

export default MainScreen;

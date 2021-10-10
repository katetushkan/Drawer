import React from "react";
import {Drawer} from "./Drawer/Drawer";
import {DataConverter} from "./DataConverter/DataConverter";

const DrawerContext = React.createContext();
const DataConverterContext = React.createContext();
const drawer = new Drawer();
const dataConverter = new DataConverter();

function useDrawerContext() {
    const context = React.useContext(DrawerContext)
    if (context === undefined) {
        throw Error('useDrawerContext require DrawerContextProvider')
    }

    return context
}

function useDataConverterContext() {
    const context = React.useContext(DataConverterContext)
    if (context === undefined) {
        throw Error('useDataConverterContext require DrawerContextProvider')
    }

    return context
}

function ServiceProvider({children}) {
    return (
        <DrawerContext.Provider value={drawer}>
            <DataConverterContext.Provider value={dataConverter}>
                {children}
            </DataConverterContext.Provider>
        </DrawerContext.Provider>
    )
}

export { ServiceProvider, useDataConverterContext, useDrawerContext};

import {FIELD_TYPES} from "../Drawer/Drawer.js";

export const COMMAND_TYPES = {
    CANVAS: "C",
    LINE: "L",
    RECTANGLE: "R",
    FILL: "B"
}

export const CHARS = {
    vBorder: "|",
    hBorder: "-",
    1: "x",
    0: " ",
}

export class DataConverter {
    parseCommands(text) {
        const lines = text.trim().split("\n");
        return lines.map((line) => {
            const chars = line.split(" ");
            return this.parseCommand(chars);
        });
    }

    serializeCanvas(canvas) {
        let finalStr = "";
        for (let row = 0; row < canvas[0].length + 2; row++) {
            for (let column = 0; column < canvas.length + 2; column++) {
                if (row === 0 || row === canvas[0].length + 1) {
                    finalStr = finalStr + this.createHorizontalBorder(canvas.length)
                    break
                }
                else {
                    if (column === 0 || column === canvas.length + 1) {
                        finalStr += this.createVerticalBorder()
                    }
                    else {

                        let char = canvas[column - 1][row - 1].type === FIELD_TYPES.FILL ? canvas[column - 1][row - 1].data.colour :CHARS[canvas[column - 1][row - 1].type]
                        finalStr += char
                    }
                }
            }

            finalStr += DataConverter.toTheNewLine()

        }

        return finalStr
    }

    static toTheNewLine() {
        return "\n";
    }

    createVerticalBorder() {
        return CHARS.vBorder;
    }

    createHorizontalBorder(length) {
        let horizontalBorder = "";
        for (let dash = 0; dash < length + 2; dash++){
            horizontalBorder = horizontalBorder + CHARS.hBorder;
        }
        return horizontalBorder;
    }

    parseCommand(chars) {
        const [type, ...values] = [...chars];
        switch (type) {
            case 'C':
                const width = Number.parseInt(values[0], 10);
                const height = Number.parseInt(values[1], 10);
                if (Number.isNaN(width) || Number.isNaN(height)) {
                    throw new TypeError(`Invalid command (type: ${type} args: ${JSON.stringify(values)})`);
                }

                return {
                    type: COMMAND_TYPES.CANVAS,
                    width,
                    height
                };
            case 'L':
                const x1 = Number.parseInt(values[0], 10);
                const y1 = Number.parseInt(values[1], 10);
                const x2 = Number.parseInt(values[2], 10);
                const y2 = Number.parseInt(values[3], 10);
                if (Number.isNaN(x1) || Number.isNaN(y1) || Number.isNaN(x2) || Number.isNaN(y2) ) {
                    throw new TypeError(`Invalid command (type: ${type} args: ${JSON.stringify(values)})`);
                }
                return {
                    type: COMMAND_TYPES.LINE,
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2
                };
            case 'R':
                const x1R = Number.parseInt(values[0], 10);
                const y1R = Number.parseInt(values[1], 10);
                const x2R = Number.parseInt(values[2], 10);
                const y2R = Number.parseInt(values[3], 10);
                if (Number.isNaN(x1R) || Number.isNaN(y1R) || Number.isNaN(x2R) || Number.isNaN(y2R) ) {
                    throw new TypeError(`Invalid command (type: ${type} args: ${JSON.stringify(values)})`);
                }
                return {
                    type: COMMAND_TYPES.RECTANGLE,
                    x1: x1R,
                    y1: y1R,
                    x2: x2R,
                    y2: y2R
                };
            case 'B': {
                const x = Number.parseInt(values[0], 10);
                const y = Number.parseInt(values[1], 10);
                if (Number.isNaN(x) || Number.isNaN(y)) {
                    throw new TypeError(`Invalid command (type: ${type} args: ${JSON.stringify(values)})`);
                }
                return {
                    type: COMMAND_TYPES.FILL,
                    x: x,
                    y: y,
                    colour: values[2]
                };
            }
            default:
                throw new Error(`Unsupported command type: ${type}`);
        }
    }
}

import {COMMAND_TYPES} from "../DataConverter/DataConverter.js";
export const FIELD_TYPES = {
    EMPTY: 0,
    LINE: 1,
    FILL: 2,
}
export class Drawer {

    canvas = null;

    executeCommand(command) {
        switch (command.type) {
            case COMMAND_TYPES.CANVAS: {
                const {width, height} = command
                this.createCanvas(width, height);
                break;
            }
            case COMMAND_TYPES.LINE: {
                const {x1, y1, x2, y2} = command
                this.createLine(x1, y1, x2, y2);
                break;
            }
            case COMMAND_TYPES.RECTANGLE: {
                const {x1, y1, x2, y2} = command
                this.createRectangle(x1, y1, x2, y2);
                break;
            }
            case COMMAND_TYPES.FILL: {
                const {x, y, colour} = command
                this.bucketFill(x, y, colour);
                break;
            }

        }
    }

    createCanvas(width, height) {
        if (this.canvas) {
            console.warn('Re-crating canvas');
        }

        this.canvas = [];

        for (let w = 0; w < width; w++) {
            this.canvas[w] = []
            for (let h = 0; h < height; h++) {
                this.canvas[w][h] = { type: FIELD_TYPES.EMPTY };
            }
        }
    }

    createLine(x1, y1, x2, y2) {
        if (!this.canvas) {
            throw new Error('Attempt to operate on non-existent canvas');
        }
        if (x1 < 0 || x1 > this.canvas.length) {
            throw new Error(`Point coordinate out of bound (x: ${x1})`);
        }
        if (y1 < 0 || y1 > this.canvas[0].length) {
            throw new Error(`Point coordinate out of bound (y: ${y1})`);
        }
        if (y2 < 0 || y2 > this.canvas[0].length) {
            throw new Error(`Point coordinate out of bound (y: ${y2})`);
        }
        if (x2 < 0 || x2 > this.canvas.length) {
            throw new Error(`Point coordinate out of bound (x: ${x2})`);
        }

        for (let x = x1 - 1; x < x2; x++) {
            for (let y = y1 - 1; y < y2; y++) {
                this.canvas[x][y] = { type: FIELD_TYPES.LINE }
            }
        }

    }

    createRectangle( x1, y1, x2, y2 ) {
        if (!this.canvas) {
            throw new Error('Attempt to operate on non-existent canvas');
        }
        if (x1 < 0 || x1 > this.canvas.length) {
            throw new Error(`Point coordinate out of bound (x: ${x1})`);
        }
        if (y1 < 0 || y1 > this.canvas[0].length) {
            throw new Error(`Point coordinate out of bound (y: ${y1})`);
        }
        if (y2 < 0 || y2 > this.canvas[0].length) {
            throw new Error(`Point coordinate out of bound (y: ${y2})`);
        }
        if (x2 < 0 || x2 > this.canvas.length) {
            throw new Error(`Point coordinate out of bound (x: ${x2})`);
        }

        for (let x = x1 - 1; x < x2; x++) {

            if (x === x1 - 1 || x === x2 - 1) {
                for (let y = y1 - 1; y < y2; y++) {
                    this.canvas[x][y] = { type: FIELD_TYPES.LINE };
                }
            }
            else {
                for (let y = y1 - 1; y < y2; y++) {
                    if (y === y1 - 1 || y === y2 - 1) {
                        this.canvas[x][y] = { type: FIELD_TYPES.LINE };
                    }
                    else {
                        this.canvas[x][y] = { type: FIELD_TYPES.EMPTY };
                    }

                }
            }
        }
    }

    bucketFill(x, y, colour) {
        if (!this.canvas) {
            throw new Error('Attempt to operate on non-existent canvas');
        }
        if (this.canvas[x-1][y-1].type === FIELD_TYPES.FILL) {
            return;
        }
        if (x < 0 || x >= this.canvas.length) {
            throw new Error(`Point coordinate out of bound (x: ${x})`);
        }
        if (y < 0 || y >= this.canvas[0].length) {
            throw new Error(`Point coordinate out of bound (y: ${y})`);
        }

        const fromColour = this.canvas[x-1][y-1].type;

        // this.fill(x-1, y-1, fromColour, colour)

        const cells = [{x: x - 1, y: y -1}]

        while (cells.length > 0) {

            const {x: X, y: Y} = cells.pop();

            if (X < 0 || X >= this.canvas.length) {
                continue;
            }
            if (Y < 0 || Y >= this.canvas[0].length) {
                continue;
            }
            if (fromColour !== this.canvas[X][Y].type) {
                continue;
            }

            this.canvas[X][Y] = { type: FIELD_TYPES.FILL, data: { colour: colour }};

            cells.push({x: X - 1, y: Y});
            cells.push({x: X + 1, y: Y});
            cells.push({x: X, y: Y + 1});
            cells.push({x: X, y: Y - 1});
        }
    }


    //recursive
    fill(x, y, fromColour, colour) {
        if (x < 0 || x >= this.canvas.length) {
            return
        }
        if (y < 0 || y >= this.canvas[0].length) {
            return;
        }
        if (fromColour !== this.canvas[x][y].type) {
            return;
        }
        this.canvas[x][y] = { type: FIELD_TYPES.FILL, data: { colour: colour }}
        this.fill(x-1, y, fromColour, colour)
        this.fill(x+1, y, fromColour, colour)
        this.fill(x, y+1, fromColour, colour)
        this.fill(x, y-1, fromColour, colour)
    }
}

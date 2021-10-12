import {Drawer, FIELD_TYPES} from "./Drawer";

let drawer;

beforeEach(() => {
    drawer = new Drawer();
})

test('create Drawer obj', () => {
    expect(drawer).toBeInstanceOf(Drawer)
})

test('canvas created in Drawer object', () => {
    drawer.createCanvas(10, 10);
    expect(drawer.canvas).not.toBe(null);
    expect(drawer.canvas.length).toEqual(10);
    expect(drawer.canvas[0].length).toEqual(10);
})

test('perform command before canvas is created', () => {
    expect(drawer.canvas).toBe(null);
    expect(() => {
        drawer.createRectangle(2,3,4,5)
    }).toThrow('Attempt to operate on non-existent canvas')
})

test('create line', () => {
    drawer.createCanvas(10, 10);
    expect(drawer.canvas).not.toBe(null);
    drawer.createLine(2,2,5,5)
    for (let x = 1; x < 5; x++) {
        for (let y = 1; y < 5; y++) {
            expect(drawer.canvas[x][y].type).toBe(FIELD_TYPES.LINE);
        }
    }
})

test("point coordinate (x1) out of bound during line creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createLine(-1,3,4,5)
    }).toThrow('Point coordinate out of bound (x: -1)')
})

test("point coordinate (y1) out of bound during line creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createLine(1,15,4,5)
    }).toThrow('Point coordinate out of bound (y: 15)')
})

test("point coordinate (x2) out of bound during line creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createLine(1,3,13,5)
    }).toThrow('Point coordinate out of bound (x: 13)')
})

test("point coordinate (y2) out of bound during line creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createLine(1,3,4,-5)
    }).toThrow('Point coordinate out of bound (y: -5)')
})

test('create rectangle', () => {
    drawer.createCanvas(10, 10);
    expect(drawer.canvas).not.toBe(null);
    drawer.createRectangle(2, 2, 5, 5)
    for (let x = 1; x < 5; x++) {

        if (x === 1 || x === 4) {
            for (let y = 1; y < 5; y++) {
                expect(drawer.canvas[x][y].type).toBe(FIELD_TYPES.LINE);
            }
        }
        else {
            for (let y = 1; y < 5; y++) {
                if (y === 1 || y === 4) {
                    expect(drawer.canvas[x][y].type).toBe(FIELD_TYPES.LINE);
                }
                else {
                    expect(drawer.canvas[x][y].type).toBe(FIELD_TYPES.EMPTY);
                }

            }
        }
    }
})

test("point coordinate (x1) out of bound during rectangle creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createRectangle(-1,3,4,5)
    }).toThrow('Point coordinate out of bound (x: -1)')
})

test("point coordinate (y1) out of bound during rectangle creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createRectangle(1,15,4,5)
    }).toThrow('Point coordinate out of bound (y: 15)')
})

test("point coordinate (x2) out of bound during rectangle creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createRectangle(1,3,13,5)
    }).toThrow('Point coordinate out of bound (x: 13)')
})

test("point coordinate (y2) out of bound during rectangle creation", () => {
    drawer.createCanvas(10,10);
    expect(() => {
        drawer.createRectangle(1,3,4,-5)
    }).toThrow('Point coordinate out of bound (y: -5)')
})

test('fill canvas with provided color', () => {
    drawer.createCanvas(10, 10);
    drawer.createRectangle(2, 2, 5, 5);
    drawer.bucketFill(3, 3, 'j');
    for (let x = 2; x < 4; x++) {
        for (let y = 2; y < 4; y++) {
            expect(drawer.canvas[x][y].type).toBe(FIELD_TYPES.FILL);
        }
    }
})

test("point coordinate (x) out of bound during filling", () => {
    drawer.createCanvas(10,10);
    drawer.createRectangle(2, 2, 5, 5);
    expect(() => {
        drawer.bucketFill(-1,3,"4,5")
    }).toThrow('Point coordinate out of bound (x: -1)')
})

test("point coordinate (y) out of bound during filling", () => {
    drawer.createCanvas(10,10);
    drawer.createRectangle(2, 2, 5, 5);
    expect(() => {
        drawer.bucketFill(1,15,"0")
    }).toThrow('Point coordinate out of bound (y: 15)')
})

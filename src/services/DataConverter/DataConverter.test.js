import {Drawer} from "../Drawer/Drawer";
import {COMMAND_TYPES, DataConverter} from "./DataConverter";

let dataConverter;

beforeAll(() => {
    dataConverter = new DataConverter();
})

test('parse line', () => {
    let commands = dataConverter.parseCommands('C 20 20')
    expect(commands).toEqual([{
        type: COMMAND_TYPES.CANVAS,
        width: 20,
        height: 20
    }])
})

test("parse command C with incorrect values", () => {
    let chars = ["C", "f", "20"]
    expect(() => {
        dataConverter.parseCommand(chars)
    }).toThrow(`Invalid command (type: C args: ${JSON.stringify(["f", "20"])})`)
})

test("parse command L with incorrect values", () => {
    let chars = ["L", "f", "20", "23", "25"]
    expect(() => {
        dataConverter.parseCommand(chars)
    }).toThrow(`Invalid command (type: L args: ${JSON.stringify(["f", "20", "23", "25"])})`)
})

test("parse command R with incorrect values", () => {
    let chars = ["R", "9", "20", "23", "i"]
    expect(() => {
        dataConverter.parseCommand(chars)
    }).toThrow(`Invalid command (type: R args: ${JSON.stringify(["9", "20", "23", "i"])})`)
})

test("parse command B with incorrect values", () => {
    let chars = ["B", "f", "20", "a"]
    expect(() => {
        dataConverter.parseCommand(chars)
    }).toThrow(`Invalid command (type: B args: ${JSON.stringify(["f", "20", "a", "25"])})`)
})

test("unsupported command type", () => {
    let chars = ["X", "f", "20", "23", "25"]
    expect(() => {
        dataConverter.parseCommand(chars)
    }).toThrow('Unsupported command type: X')
})

test('serialize canvas', () => {
    let drawer = new Drawer();
    drawer.createCanvas(10,10);
    drawer.createRectangle(2, 2, 5, 5);
    expect(dataConverter.serializeCanvas(drawer.canvas)).toEqual(`------------\n|          |\n| xxxx     |\n| x  x     |\n| x  x     |\n| xxxx     |\n|          |\n|          |\n|          |\n|          |\n|          |\n------------\n`);

})

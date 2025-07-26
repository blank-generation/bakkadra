import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";

export default defineNode({
    type: "Modulate",
    title: "Modulate",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        modulator: () => new NodeInterface("Modulator", ""),
        mode: () => new SelectInterface("Mode", "default", ["default", "rotate", "scale", "scrollX", "scrollY","pixelate","kaleid"]),
        amount: () => new NumberInterface("Amount", 0.1),
        parameter: () => new NumberInterface("Parameter", 0.1),
    
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, modulator, mode, amount, parameter }) {
        if (mode === "default") {
            return { output: `${input}.modulate(${modulator}, ${amount})` };
        } else if (mode === "rotate") {
            // modulateRotate( texture, multiple = 1, offset )
            return { output: `${input}.modulateRotate(${modulator}, ${amount}, ${parameter})` };
        } else if (mode === "scale") {
            // modulateScale( texture, multiple = 1, offset )
            return { output: `${input}.modulateScale(${modulator}, ${amount}, ${parameter})` };
        } else if (mode === "scrollX") {
            // modulateScrollX( texture, scrollX = 0.5, speed )
            return { output: `${input}.modulateScrollX(${modulator}, ${amount})` };
        } else if (mode === "scrollY") {
            // modulateScrollY( texture, scrollY = 0.5, speed )
            return { output: `${input}.modulateScrollY(${modulator}, ${amount})` };
        } else if (mode === "pixelate") {
            // modulatePixelate( texture, multiple = 10, offset = 3 )
            return { output: `${input}.modulatePixelate(${modulator}, ${amount}, ${parameter})` };
        }
        else if (mode === "kaleid") {
            // modulateKaleid( texture, nSides = 4 )
            return { output: `${input}.modulateKaleid(${modulator}, ${amount}, ${parameter})` };
        }
    },
}); 
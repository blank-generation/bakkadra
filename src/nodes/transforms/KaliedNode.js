import { defineNode, NodeInterface, NumberInterface } from "baklavajs";

export default defineNode({
    type: "Kaleidoscope",
    title: "Kaleidoscope",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        sides: () => new NumberInterface("Sides", 4),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, sides }) {
        return { output: `${input}.kaleid(${sides})` };
    },
}); 
import { defineNode, NodeInterface, NumberInterface } from "baklavajs";

export default defineNode({
    type: "Scale",
    title: "Scale",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        x: () => new NumberInterface("X Scale", 1),
        y: () => new NumberInterface("Y Scale", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, x, y }) {
        return { output: `${input}.scale(${x}, ${y})` };
    },
}); 
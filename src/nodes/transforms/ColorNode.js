import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";

export default defineNode({
    type: "Color",
    title: "Color",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        r: () => new NumberInterface("Red", 1),
        g: () => new NumberInterface("Green", 1),
        b: () => new NumberInterface("Blue", 1),
        a: () => new NumberInterface("Alpha", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, r, g, b, a }) {
        return { output: `${input}.color(${r}, ${g}, ${b}, ${a})` };
    },
}); 
import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";

export default defineNode({
    type: "Shape",
    title: "Shape",
    inputs: {
        sides: () => new NumberInterface("Sides", 4),
        radius: () => new NumberInterface("Radius", 0.5),
        smoothing: () => new NumberInterface("Smoothing", 0.01),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ sides, radius, smoothing }) {
        return { output: `shape(${sides}, ${radius}, ${smoothing})` };
    },
}); 
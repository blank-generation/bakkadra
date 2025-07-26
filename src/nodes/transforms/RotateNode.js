import { defineNode, NodeInterface, NumberInterface } from "baklavajs";

export default defineNode({
    type: "Rotate",
    title: "Rotate",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        angle: () => new NumberInterface("Angle", 0.1),
        speed: () => new NumberInterface("Speed", 0.1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, angle, speed }) {
        return { output: `${input}.rotate(${angle}, ${speed})` };
    },
}); 
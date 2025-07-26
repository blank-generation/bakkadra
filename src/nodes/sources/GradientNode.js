import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// gradient( speed )
export default defineNode({
    type: "Gradient",
    title: "Gradient",
    inputs: {
        speed: () => new NumberInterface("Speed", 0.1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ speed }) {
        return { output: `gradient(${speed})` };
    },
}); 
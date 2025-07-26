import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// src(o0)
export default defineNode({
    type: "OutputAsIn",
    title: "OutputAsIn",
    inputs: {
        input: () => new SelectInterface("Input", "o0", ["o0", "o1", "o2", "o3"]),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input }) {
        return { output: `src(${input})` };
    },
}); 
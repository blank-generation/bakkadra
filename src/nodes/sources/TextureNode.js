import { defineNode, NodeInterface, SelectInterface } from "baklavajs";
// src( index )
export default defineNode({
    type: "Texture",
    title: "Texture",
    inputs: {
        index: () => new SelectInterface("Index", "s0", ["s0", "s1", "s2", "s3", "s4"]),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ index }) {
        return { output: `src(${index})` };
    },
}); 
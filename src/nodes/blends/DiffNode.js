import { defineNode, NodeInterface } from "baklavajs";
// diff( texture )
export default defineNode({
    type: "Difference",
    title: "Difference",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        input2: () => new NodeInterface("Input2", ""),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, input2 }) {
        return { output: `${input}.diff(${input2})` };
    },
}); 
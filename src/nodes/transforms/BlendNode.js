import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// blend( texture, amount = 0.5 )
export default defineNode({
    type: "Blend",
    title: "Blend",
    inputs: {
        input1: () => new NodeInterface("Input 1", ""),
        input2: () => new NodeInterface("Input 2", ""),
        mode: () => new SelectInterface("Mode", "blend", ["blend", "add", "diff", "sub", "mult"]),
        amount: () => new NumberInterface("Amount", 0.5),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input1, input2, mode, amount }) {
        if (mode === "blend") {
            return { output: `${input1}.blend(${input2}, ${amount})` };
        } else if (mode === "add") {
            return { output: `${input1}.add(${input2}, ${amount})` };
        } else if (mode === "diff") {
            return { output: `${input1}.diff(${input2}, ${amount})` };
        } else if (mode === "sub") {
            return { output: `${input1}.sub(${input2}, ${amount})` };
        } else if (mode === "mult") {
            return { output: `${input1}.mult(${input2}, ${amount})` };
        }
    },
}); 
import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// sub( texture, amount = 1 )
export default defineNode({
    type: "Subtract",
    title: "Subtract",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        input2: () => new NodeInterface("Input2", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, input2, amount }) {
        return { output: `${input}.sub(${input2}, ${amount})` };
    },
}); 
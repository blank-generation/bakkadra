import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// sub( texture, amount = 1 )
export default defineNode({
    type: "Subtract",
    title: "Subtract",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, amount }) {
        return { output: `${input}.sub(${amount})` };
    },
}); 
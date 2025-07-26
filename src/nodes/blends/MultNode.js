import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// mult( texture, amount = 1 )
export default defineNode({
    type: "Multiply",
    title: "Multiply",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, amount }) {
        return { output: `${input}.mult(${amount})` };
    },
}); 
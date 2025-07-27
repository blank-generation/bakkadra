import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// mult( texture, amount = 1 )
export default defineNode({
    type: "Multiply",
    title: "Multiply",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        input2: () => new NodeInterface("Input2", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, input2, amount }) {
        return { output: `${input}.mult(${input2}, ${amount})` };
    },
}); 
import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// add( texture, amount = 1 )
export default defineNode({
    type: "Add",
    title: "Add",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        input2: () => new NodeInterface("Input2", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, input2, amount }) {
        return { output: `${input}.add(${input2}, ${amount})` };
    },
}); 
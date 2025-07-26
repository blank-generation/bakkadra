import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// add( texture, amount = 1 )
export default defineNode({
    type: "Add",
    title: "Add",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, amount }) {
        return { output: `${input}.add(${amount})` };
    },
}); 
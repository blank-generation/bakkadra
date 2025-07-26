import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// blend( texture, amount = 0.5 )
export default defineNode({
    type: "Blend",
    title: "Blend",
    inputs: {
        input1: () => new NodeInterface("Input 1", ""),
        input2: () => new NodeInterface("Input 2", ""),
        mode: () => new SelectInterface("Mode", "add", ["add", "diff", "mult", "div", "mod", "min", "max"]),
        amount: () => new NumberInterface("Amount", 0.5),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input1, input2, mode, amount }) {
        return { output: `${input1}.blend(${input2}, ${amount})` };
    },
}); 
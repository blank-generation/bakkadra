import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
//repeat( repeatX = 3, repeatY = 3, offsetX, offsetY )
export default defineNode({
    type: "Repeat",
    title: "Repeat",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        repeatX: () => new NumberInterface("RepeatX", 3),
        repeatY: () => new NumberInterface("RepeatY", 3),
        offsetX: () => new NumberInterface("OffsetX", 0),
        offsetY: () => new NumberInterface("OffsetY", 0),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, repeatX, repeatY, offsetX, offsetY }) {
        return { output: `${input}.repeat(${repeatX}, ${repeatY}, ${offsetX}, ${offsetY})` };
    },
}); 
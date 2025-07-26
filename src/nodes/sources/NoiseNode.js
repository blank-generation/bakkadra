import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// noise( scale = 10, offset = 0.1 )
export default defineNode({
    type: "Noise",
    title: "Noise",
    inputs: {
        scale: () => new NumberInterface("Scale", 10),
        offset: () => new NumberInterface("Offset", 0.1),
    },
    outputs: {  
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ scale, offset }) {
        let output = `noise(${scale}, ${offset})`
        return { output };
    },
});
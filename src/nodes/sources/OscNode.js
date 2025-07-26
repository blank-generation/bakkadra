
import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
export default defineNode({
    type: "Osc",
    title: "Osc",
    inputs: {
        frequency: () => new NumberInterface("Frequency", 60),
        sync: () => new NumberInterface("Sync", 0.1),
        offset: () => new NumberInterface("Offset", 0),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ frequency, sync, offset }) {
        let output = `osc(${frequency}, ${sync}, ${offset})`
        return { output };
    },
});
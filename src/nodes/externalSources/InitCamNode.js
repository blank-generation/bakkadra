import { defineNode, TextInterface, SelectInterface } from "baklavajs";
import HydraExecutor from "../../services/HydraExecutor";
// initCam( index )
export default defineNode({
    type: "InitCam",
    title: "InitCam",
    inputs: {
        index: () => new SelectInterface("Index", "s0", ["s0", "s1", "s2", "s3", "s4"]),
    },
    outputs: {
        output: () => new TextInterface("Output", ""),
    },
    calculate({ index }) {
        HydraExecutor.executeCode(`${index}.initCam()`);
        return { output: `${index}.initCam()` };
    },
}); 
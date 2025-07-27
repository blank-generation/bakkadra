import { defineNode, TextInterface, SelectInterface, ButtonInterface } from "baklavajs";
import HydraExecutor from "../../services/HydraExecutor";
// initCam( index )
let currentIndex = "s0";

export default defineNode({
    type: "InitCam",
    title: "InitCam",
    inputs: {
        index: () => new SelectInterface("Index", "s0", ["s0", "s1", "s2", "s3", "s4"]),
        button: () => new ButtonInterface("Activate", () => {
            HydraExecutor.executeCode(`${currentIndex}.initCam()`);
         }),
    },
    outputs: {
        output: () => new TextInterface("Output", ""),
    },
    calculate({ index }) {
        currentIndex = index;
        // HydraExecutor.executeCode(`${currentIndex}.initCam()`);
        return { output: `${index}.initCam()` };
    },
}); 
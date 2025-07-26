import { defineNode, TextInterface, SelectInterface } from "baklavajs";
import HydraExecutor from "../../services/HydraExecutor";
// initScreen( index )
export default defineNode({
    type: "InitScreen",
    title: "InitScreen",
    inputs: {
        index: () => new SelectInterface("Index", "s0", ["s0", "s1", "s2", "s3", "s4"]),
    },
    outputs: {
        output: () => new TextInterface("Output", ""),
    },
    calculate({ index }) {
        HydraExecutor.executeCode(`${index}.initScreen()`);
        return { output: `${index}.initScreen()` };
    },
}); 
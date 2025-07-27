import { defineNode, TextInterface, SelectInterface, ButtonInterface } from "baklavajs";
import HydraExecutor from "../../services/HydraExecutor";
// initScreen( index )
let currentIndex = "s0";
export default defineNode({
    type: "InitScreen",
    title: "InitScreen",
    inputs: {
        index: () => new SelectInterface("Index", "s0", ["s0", "s1", "s2", "s3", "s4"]),
        button: () => new ButtonInterface("Activate", () => {
            HydraExecutor.executeCode(`${currentIndex}.initScreen()`);
         }),
    },
    outputs: {
        output: () => new TextInterface("Output", ""),
        
    },
    calculate({ index }) {
        currentIndex = index;
        return { output: `${index}.initScreen()` };
    },
}); 
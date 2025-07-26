import { defineNode, NodeInterface, SelectInterface, TextInterface } from "baklavajs";
import HydraExecutor from '../../services/HydraExecutor';

export default defineNode({
    type: "Output",
    title: "Output",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        output: () => new SelectInterface("Output Buffer", "o0", ["o0", "o1", "o2", "o3"]),
    },
    outputs: {
        code: () => new TextInterface("Generated Code", ""),
    },
    calculate({ input, output }) {
        if (!input || input === '') {
            return { code: '' };
        }
        const code = `${input}.out(${output})`;
        HydraExecutor.executeCode(code);
        if (HydraExecutor.isPopupOpen()) {
            HydraExecutor.executeCodeInPopup(code);
        }
        return { code };
    },
}); 
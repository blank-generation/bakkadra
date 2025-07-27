import { defineNode, NodeInterface, NumberInterface } from "baklavajs";
// pixelate( pixelX = 20, pixelY = 20 )
export default defineNode({
    type: "Pixelate",
    title: "Pixelate",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        pixelX: () => new NumberInterface("PixelX", 20),
        pixelY: () => new NumberInterface("PixelY", 20),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, pixelX, pixelY }) {
        return { output: `${input}.pixelate(${pixelX}, ${pixelY})` };
    },
}); 
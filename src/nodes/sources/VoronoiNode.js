import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "baklavajs";
// voronoi( scale = 5, speed = 0.3, blending = 0.3 )
export default defineNode({
    type: "Voronoi",
    title: "Voronoi",
    inputs: {
        scale: () => new NumberInterface("Scale", 10),
        speed: () => new NumberInterface("Speed", 0.1),
        blending: () => new NumberInterface("Blending", 0.3),
    },
    outputs: {  
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ scale, speed, blending }) {
        let output = `voronoi(${scale}, ${speed}, ${blending})`
        return { output };
    },
});
<script setup>
import { onMounted, ref } from 'vue'
import { BaklavaEditor, useBaklava } from "@baklavajs/renderer-vue";
import "@baklavajs/themes/dist/syrup-dark.css";
import { DependencyEngine, applyResult } from '@baklavajs/engine';
// Import all nodes
import OscNode from './nodes/sources/OscNode'
import ShapeNode from './nodes/sources/ShapeNode'
import GradientNode from './nodes/sources/GradientNode'
import RotateNode from './nodes/transforms/RotateNode'
import ScaleNode from './nodes/transforms/ScaleNode'
import BlendNode from './nodes/transforms/BlendNode'
import ColorNode from './nodes/transforms/ColorNode'
import ModulateNode from './nodes/transforms/ModulateNode'
import OutputNode from './nodes/outputs/OutputNode'
import NoiseNode from './nodes/sources/NoiseNode'
import VoronoiNode from './nodes/sources/VoronoiNode'
import TextureNode from './nodes/sources/TextureNode'
import InitScreenNode from './nodes/externalSources/InitScreenNode'
import InitCamNode from './nodes/externalSources/InitCamNode'
import AddNode from './nodes/blends/AddNode'
import SubNode from './nodes/blends/SubNode'
import DiffNode from './nodes/blends/DiffNode'
import MultNode from './nodes/blends/MultNode'

// Import Hydra executor
import HydraExecutor from './services/HydraExecutor'
import OutputAsInNode from './nodes/sources/OutputAsInNode';

const baklava = useBaklava();

baklava.settings.sidebar.enabled = false;
baklava.settings.nodes.resizable = true;

const engine = new DependencyEngine(baklava.editor);



// baklava.settings.sidebar.resizable = true;
// baklava.settings.sidebar.width = 20;



// Register all node types
baklava.editor.registerNodeType(OscNode);
baklava.editor.registerNodeType(ShapeNode);
baklava.editor.registerNodeType(GradientNode);
baklava.editor.registerNodeType(NoiseNode);
baklava.editor.registerNodeType(VoronoiNode);
baklava.editor.registerNodeType(OutputAsInNode);
baklava.editor.registerNodeType(TextureNode);

baklava.editor.registerNodeType(InitScreenNode);
baklava.editor.registerNodeType(InitCamNode);

baklava.editor.registerNodeType(AddNode);
baklava.editor.registerNodeType(SubNode);
baklava.editor.registerNodeType(DiffNode);
baklava.editor.registerNodeType(MultNode);

baklava.editor.registerNodeType(RotateNode);
baklava.editor.registerNodeType(ScaleNode);
baklava.editor.registerNodeType(BlendNode);
baklava.editor.registerNodeType(ColorNode);
baklava.editor.registerNodeType(ModulateNode);
baklava.editor.registerNodeType(OutputNode);




// Reactive state for execution
const executionResult = ref('');
const isExecuting = ref(false);
const selectedPreset = ref('');
const usePopup = ref(false);
const popupStatus = ref('Closed');
const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });
    
engine.start();

// Add some nodes for demo purposes
function addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    }

// Add demo nodes
const node1 = addNodeWithCoordinates(OscNode, 300, 140);
const node2 = addNodeWithCoordinates(OutputNode, 550, 140);

// Add connection between the nodes
if (node1 && node2) {
  baklava.editor.graph.addConnection(
    node1.outputs.output,
    node2.inputs.input
  );
}

// Function to execute the node graph
const executeGraph = async () => {
    isExecuting.value = true;
    try {
        // Get the current graph
        const graph = baklava.editor.graph;
        
        // Find output nodes
        const outputNodes = graph.nodes.filter(node => node.type === 'Output');
        
        if (outputNodes.length === 0) {
            executionResult.value = 'No output nodes found. Add an Output node to execute the graph.';
            return;
        }

        // Execute each output node
        for (const outputNode of outputNodes) {
          console.log(`Output node:`, outputNode);
            try {
                // console.log(`Processing output node: ${outputNode?.id}`);
                // console.log(`Graph connections:`, graph.connections);
                // console.log(`Graph nodes:`, graph.nodes.map(n => ({ id: n?.id, type: n?.type, title: n?.title })));
                
                // Use the engine to run the graph
                const result =  outputNode.outputs.code._value;
                console.log(`Engine result:`, result);
                
                // Get the specific output node result
                // console.log(`Output node result:`, outputResult);

                if (usePopup.value) {
                    HydraExecutor.executeCodeInPopup(result);
                    executionResult.value = `Executed in popup: ${result}`;
                } else {
                    HydraExecutor.executeCode(result);
                    executionResult.value = `Executed: ${result}`;
                }
                
            } catch (error) {
                executionResult.value = `Error calculating node ${outputNode?.id}: ${error.message}`;
                console.error('Node calculation error:', error);
            }
        }
    } catch (error) {
        executionResult.value = `Error: ${error.message}`;
        console.error('Graph execution error:', error);
    } finally {
        isExecuting.value = false;
    }
};



// Function to clear Hydra outputs
const clearOutputs = () => {
    HydraExecutor.clear();
    executionResult.value = 'Cleared all outputs';
};

// Function to open popup window
const openPopup = () => {
    HydraExecutor.openPopupWindow();
    // Update popup status
    setTimeout(() => {
        popupStatus.value = HydraExecutor.isPopupOpen() ? 'Open' : 'Closed';
    }, 100);
};




onMounted(() => {
    // Get the canvas element
    const canvas = document.getElementById('canvas');
    
    // Initialize Hydra with the canvas
    HydraExecutor.initialize(canvas);
    
    // Debug: Log available engine methods
    console.log('Engine methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(engine)));
    console.log('Engine:', engine);
});
</script>

<template>
  <div style="display: flex; height: 100vh;">
        <!-- Node Editor -->
    <div style="flex: 1; border-right: 1px solid #333;">
      <BaklavaEditor :view-model="baklava" />
    </div>
    
    <!-- Floating Controls -->
    <div style="position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px;">
      <!-- <button 
        @click="executeGraph" 
        :disabled="isExecuting"
        style="padding: 15px 25px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"
      >
        {{ isExecuting ? 'Executing...' : 'Execute Graph' }}
      </button> -->
      
      <button 
        @click="clearOutputs"
        style="padding: 15px 25px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"
      >
        Clear Outputs
      </button>
      
      <button 
        @click="usePopup = !usePopup"
        :style="{ 
          padding: '15px 25px', 
          background: usePopup ? '#2196F3' : '#FF9800', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          fontSize: '16px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)' 
        }"
      >
        {{ usePopup ? 'Popup Mode' : 'Background Mode' }}
      </button>
      
              <button 
         @click="openPopup()"
          v-if="usePopup"
          :style="{ 
            padding: '15px 25px', 
            background: HydraExecutor.isPopupOpen() ? '#4CAF50' : '#9C27B0', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontSize: '16px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)' 
          }"
        >
          {{ HydraExecutor.isPopupOpen() ? 'Focus Popup' : 'Open Popup Window' }}
        </button>
      
      <!-- Status Display -->
      <div style="background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 8px; font-size: 12px; max-width: 200px;">
        <div><strong>Mode:</strong> {{ usePopup ? 'Popup' : 'Background' }}</div>
        <div><strong>Popup:</strong> {{ HydraExecutor.isPopupOpen() ? 'Open' : 'Closed' }}</div>
        <div><strong>Status:</strong> {{ executionResult || 'Ready' }}</div>
      </div>
    </div>
    
    
    <!-- Canvas for Hydra -->
     <!-- Check if popup is open -->
     <div v-if="usePopup && HydraExecutor.isPopupOpen()">
     </div>
     <!-- If popup is not open, show the canvas -->
     <div v-else>
      <canvas id="canvas"></canvas>
     </div>
   
  </div>
</template>

<style scoped>
/* Add any additional styles here */
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: #000;
}

/* Make sure the node editor has a semi-transparent background */
/* :deep(.baklava-editor) {
  background: rgba(26, 26, 26, 0.9) !important;
} */

</style>

class PresetManager {
    constructor() {
        this.presets = {
            'Simple Oscillator': {
                nodes: [
                    {
                        id: 'osc1',
                        type: 'Osc',
                        title: 'Osc',
                        position: { x: 100, y: 100 },
                        inputs: {
                            frequency: 60,
                            sync: 0.1,
                            offset: 0
                        }
                    },
                    {
                        id: 'output1',
                        type: 'Output',
                        title: 'Output',
                        position: { x: 400, y: 100 },
                        inputs: {
                            output: 'o0'
                        }
                    }
                ],
                connections: [
                    {
                        from: { nodeId: 'osc1', interfaceId: 'output' },
                        to: { nodeId: 'output1', interfaceId: 'input' }
                    }
                ]
            },
            'Rotating Shape': {
                nodes: [
                    {
                        id: 'shape1',
                        type: 'Shape',
                        title: 'Shape',
                        position: { x: 100, y: 100 },
                        inputs: {
                            sides: 4,
                            radius: 0.5,
                            smoothing: 0.01
                        }
                    },
                    {
                        id: 'rotate1',
                        type: 'Rotate',
                        title: 'Rotate',
                        position: { x: 300, y: 100 },
                        inputs: {
                            angle: 0.1,
                            speed: 0.1
                        }
                    },
                    {
                        id: 'output1',
                        type: 'Output',
                        title: 'Output',
                        position: { x: 500, y: 100 },
                        inputs: {
                            output: 'o0'
                        }
                    }
                ],
                connections: [
                    {
                        from: { nodeId: 'shape1', interfaceId: 'output' },
                        to: { nodeId: 'rotate1', interfaceId: 'input' }
                    },
                    {
                        from: { nodeId: 'rotate1', interfaceId: 'output' },
                        to: { nodeId: 'output1', interfaceId: 'input' }
                    }
                ]
            },
            'Blended Sources': {
                nodes: [
                    {
                        id: 'osc1',
                        type: 'Osc',
                        title: 'Osc',
                        position: { x: 100, y: 100 },
                        inputs: {
                            frequency: 60,
                            sync: 0.1,
                            offset: 0
                        }
                    },
                    {
                        id: 'shape1',
                        type: 'Shape',
                        title: 'Shape',
                        position: { x: 100, y: 300 },
                        inputs: {
                            sides: 6,
                            radius: 0.3,
                            smoothing: 0.01
                        }
                    },
                    {
                        id: 'blend1',
                        type: 'Blend',
                        title: 'Blend',
                        position: { x: 300, y: 200 },
                        inputs: {
                            mode: 'add',
                            amount: 0.5
                        }
                    },
                    {
                        id: 'output1',
                        type: 'Output',
                        title: 'Output',
                        position: { x: 500, y: 200 },
                        inputs: {
                            output: 'o0'
                        }
                    }
                ],
                connections: [
                    {
                        from: { nodeId: 'osc1', interfaceId: 'output' },
                        to: { nodeId: 'blend1', interfaceId: 'input1' }
                    },
                    {
                        from: { nodeId: 'shape1', interfaceId: 'output' },
                        to: { nodeId: 'blend1', interfaceId: 'input2' }
                    },
                    {
                        from: { nodeId: 'blend1', interfaceId: 'output' },
                        to: { nodeId: 'output1', interfaceId: 'input' }
                    }
                ]
            }
        };
    }

    getPreset(name) {
        return this.presets[name];
    }

    getPresetNames() {
        return Object.keys(this.presets);
    }

    loadPreset(editor, presetName) {
        const preset = this.getPreset(presetName);
        if (!preset) {
            throw new Error(`Preset "${presetName}" not found`);
        }

        // Clear current graph properly
        editor.graph.nodes.forEach(node => {
            editor.graph.removeNode(node.id);
        });

        // Add nodes and store their IDs for connections
        const nodeIdMap = {};
        
        preset.nodes.forEach(nodeData => {
            const nodeId = editor.graph.addNode(nodeData.type, nodeData.title);
            const node = editor.graph.nodes.find(n => n.id === nodeId);
            
            if (node) {
                // Store the mapping from preset ID to actual node ID
                if (nodeData.id) {
                    nodeIdMap[nodeData.id] = nodeId;
                }
                
                node.position = nodeData.position;
                
                // Set input values
                Object.keys(nodeData.inputs).forEach(inputKey => {
                    if (node.inputs[inputKey]) {
                        node.inputs[inputKey].value = nodeData.inputs[inputKey];
                    }
                });
            }
        });

        // Add connections using mapped IDs
        preset.connections.forEach(connData => {
            const fromNodeId = nodeIdMap[connData.from.nodeId] || connData.from.nodeId;
            const toNodeId = nodeIdMap[connData.to.nodeId] || connData.to.nodeId;
            
            editor.graph.addConnection(
                fromNodeId,
                connData.from.interfaceId,
                toNodeId,
                connData.to.interfaceId
            );
        });
    }
}

export default new PresetManager(); 
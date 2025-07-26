# Bakkadra 🎨

A visual node-based programming interface for [Hydra](https://hydra.ojack.xyz/), the livecoding visual synth library. Create stunning real-time visuals using a drag-and-drop node editor instead of writing code.

![Bakkadra Interface](https://img.shields.io/badge/Status-Working%20Prototype-green)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D)
![Hydra](https://img.shields.io/badge/Hydra-Synth-FF6B6B)
![BaklavaJS](https://img.shields.io/badge/BaklavaJS-2.x-9C27B0)

## ✨ Features

### 🎛️ **Visual Node Editor**
- **Drag & Drop Interface**: Connect nodes visually to create Hydra chains
- **Real-time Execution**: See your visuals update instantly as you modify the graph
- **Multiple Node Types**: Sources, transforms, blends, and outputs
- **Resizable Nodes**: Customize the interface to your workflow

### 🎨 **Hydra Integration**
- **Full Hydra Support**: All major Hydra functions available as nodes
- **String-based Code Generation**: Nodes generate Hydra code strings automatically
- **Live Execution**: Execute generated code in real-time
- **Multiple Output Buffers**: Use o0, o1, o2, o3 for complex compositions

### 🪟 **Flexible Display Modes**
- **Background Mode**: Hydra renders behind the node editor
- **Popup Window Mode**: Dedicated full-screen window for visuals
- **State Persistence**: Popup state saved in localStorage
- **Duplicate Prevention**: Smart popup management prevents multiple windows

### 📦 **Extensive Node Library**
- **Source Nodes**: Osc, Shape, Gradient, Noise, Voronoi, Texture
- **Transform Nodes**: Rotate, Scale, Color, Modulate
- **Blend Nodes**: Add, Subtract, Difference, Multiply
- **External Sources**: Screen, Camera inputs
- **Output Nodes**: Execute and render your chains

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bakkadra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Basic Workflow

1. **Create a Visual Chain**
   - Drag nodes from the left panel onto the canvas
   - Connect them by dragging from output ports to input ports
   - Configure parameters using the node controls

2. **Execute Your Visual**
   - Add an Output node to your chain
   - Click "Execute Graph" to run your visual program
   - See the result in real-time

3. **Choose Display Mode**
   - **Background Mode**: Visuals render behind the editor
   - **Popup Mode**: Click "Open Popup Window" for full-screen display

### Example: Simple Oscillator

1. Add an **Osc** node (source)
2. Add an **Output** node
3. Connect Osc → Output
4. Click "Execute Graph"
5. See a live oscillator pattern!

### Example: Rotating Shape

1. Add a **Shape** node
2. Add a **Rotate** node
3. Add an **Output** node
4. Connect: Shape → Rotate → Output
5. Execute to see a rotating shape!

## 🏗️ Architecture

### Core Components

- **BaklavaJS**: Node editor framework
- **Hydra-Synth**: Visual synthesis engine
- **Vue.js**: Frontend framework
- **DependencyEngine**: Graph calculation system

### Node System

Each node type follows this pattern:
```javascript
export default defineNode({
    type: "NodeType",
    title: "Node Title",
    inputs: {
        // Input interfaces
    },
    outputs: {
        // Output interfaces
    },
    calculate({ inputs }) {
        // Generate Hydra code string
        return { output: `hydraCode()` };
    },
});
```

### Execution Flow

1. **Node Calculation**: BaklavaJS engine calculates node outputs
2. **Code Generation**: Nodes generate Hydra code strings
3. **Execution**: Code is executed via `eval()` in Hydra context
4. **Rendering**: Hydra renders the visual result

## 🎨 Node Reference

### Source Nodes
- **Osc**: Oscillator with frequency, sync, offset
- **Shape**: Geometric shapes with sides, radius, smoothing
- **Gradient**: Animated gradients with speed control
- **Noise**: Perlin noise patterns
- **Voronoi**: Voronoi cell patterns
- **Texture**: Texture-based sources

### Transform Nodes
- **Rotate**: Rotation with angle and speed
- **Scale**: Scaling with X and Y factors
- **Color**: Color manipulation (RGB + Alpha)
- **Modulate**: Modulation effects

### Blend Nodes
- **Add**: Addition blending
- **Subtract**: Subtraction blending
- **Difference**: Difference blending
- **Multiply**: Multiplication blending

### Output Nodes
- **Output**: Execute chain with `.out()` to specified buffer

## 🔧 Configuration

### BaklavaJS Settings
```javascript
baklava.settings.sidebar.enabled = false;  // Hide sidebar
baklava.settings.nodes.resizable = true;   // Resizable nodes
```

### Hydra Configuration
```javascript
const hydra = new Hydra({
    canvas: canvas,
    width: 1280,
    height: 720,
    autoLoop: true,
    makeGlobal: true,
    detectAudio: false,
    numSources: 4,
    numOutputs: 4,
});
```

## 🛠️ Development

### Project Structure
```
src/
├── nodes/
│   ├── sources/          # Source nodes (Osc, Shape, etc.)
│   ├── transforms/       # Transform nodes (Rotate, Scale, etc.)
│   ├── blends/          # Blend nodes (Add, Subtract, etc.)
│   ├── outputs/         # Output nodes
│   └── externalSources/ # External input nodes
├── services/
│   ├── HydraExecutor.js # Hydra execution and popup management
│   └── PresetManager.js # Preset system (future)
└── App.vue              # Main application component
```

### Adding New Nodes

1. **Create node file** in appropriate directory
2. **Define node structure** with inputs, outputs, and calculate function
3. **Register node** in `App.vue`
4. **Test functionality**

Example:
```javascript
// src/nodes/transforms/MyNode.js
import { defineNode, NodeInterface, NumberInterface } from "baklavajs";

export default defineNode({
    type: "MyNode",
    title: "My Custom Node",
    inputs: {
        input: () => new NodeInterface("Input", ""),
        amount: () => new NumberInterface("Amount", 1),
    },
    outputs: {
        output: () => new NodeInterface("Output", ""),
    },
    calculate({ input, amount }) {
        return { output: `${input}.myEffect(${amount})` };
    },
});
```

## 🎯 Roadmap

### Planned Features
- [ ] **Preset System**: Save and load node configurations
- [ ] **Audio Integration**: Connect to Web Audio API
- [ ] **Export/Import**: Share node graphs
- [ ] **Performance Optimization**: WebGL acceleration
- [ ] **Collaboration**: Real-time multi-user editing
- [ ] **Mobile Support**: Touch-friendly interface

### Known Issues
- Popup windows may be blocked by browser security settings
- Some complex Hydra chains may need optimization
- Mobile browsers have limited WebGL support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hydra](https://hydra.ojack.xyz/) - The amazing visual synth library
- [BaklavaJS](https://baklava.tech/) - The node editor framework
- [Vue.js](https://vuejs.org/) - The reactive frontend framework

## 📞 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join the community discussions
- **Documentation**: Check the [Hydra documentation](https://hydra.ojack.xyz/docs/)

---

**Bakkadra** - 🎨✨
import Hydra from 'hydra-synth';

class HydraExecutor {
    constructor() {
        this.hydra = null;
        this.isInitialized = false;
        this.executionHistory = [];
        this.popupWindow = null;
        this.popupHydra = null;
        
        // Initialize popup state from localStorage
        this.popupState = this.loadPopupState();
        
        // Check if popup window still exists on page load
        this.checkExistingPopup();
    }

    initialize(canvas = null) {
        if (this.isInitialized) return;

        this.hydra = new Hydra({
            canvas: canvas,
            width: 1280,
            height: 720,
            autoLoop: true,
            makeGlobal: true,
            detectAudio: false, // Set to false to avoid microphone permission requests
            numSources: 4,
            numOutputs: 4,
        });

        this.isInitialized = true;
        console.log('Hydra initialized');
    }

    // Load popup state from localStorage
    loadPopupState() {
        try {
            const state = localStorage.getItem('hydra-popup-state');
            return state ? JSON.parse(state) : { isOpen: false, windowId: null };
        } catch (error) {
            console.error('Error loading popup state:', error);
            return { isOpen: false, windowId: null };
        }
    }

    // Save popup state to localStorage
    savePopupState(state) {
        try {
            localStorage.setItem('hydra-popup-state', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving popup state:', error);
        }
    }

    // Check if existing popup window is still valid
    checkExistingPopup() {
        if (this.popupState.isOpen && this.popupState.windowId) {
            try {
                // Try to access the existing popup window
                const existingWindow = window.open('', this.popupState.windowId);
                if (existingWindow && !existingWindow.closed) {
                    this.popupWindow = existingWindow;
                    this.popupHydra = existingWindow.hydra;
                    console.log('Reconnected to existing popup window');
                } else {
                    // Popup was closed, update state
                    this.popupState = { isOpen: false, windowId: null };
                    this.savePopupState(this.popupState);
                }
            } catch (error) {
                console.log('Existing popup not accessible, creating new one');
                this.popupState = { isOpen: false, windowId: null };
                this.savePopupState(this.popupState);
            }
        }
    }

    // Open Hydra in a popup window
    openPopupWindow() {
        // Check if popup is already open
        if (this.popupWindow && !this.popupWindow.closed) {
            this.popupWindow.focus();
            return;
        }

        // Check if we have a stored popup state and try to reconnect
        if (this.popupState.isOpen && this.popupState.windowId) {
            try {
                const existingWindow = window.open('', this.popupState.windowId);
                if (existingWindow && !existingWindow.closed) {
                    this.popupWindow = existingWindow;
                    this.popupHydra = existingWindow.hydra;
                    this.popupWindow.focus();
                    console.log('Reconnected to existing popup window');
                    return;
                }
            } catch (error) {
                console.log('Could not reconnect to existing popup, creating new one');
            }
        }

        // Generate unique window ID
        const windowId = 'hydra-visuals-' + Date.now();
        
        // Create popup window
        this.popupWindow = window.open(
            '',
            windowId,
            'width=1280,height=720,resizable=yes,scrollbars=no,status=no,location=no,toolbar=no,menubar=no'
        );

        if (!this.popupWindow) {
            console.error('Popup blocked by browser');
            return;
        }

        // Update popup state
        this.popupState = { isOpen: true, windowId: windowId };
        this.savePopupState(this.popupState);

        // Create HTML content for popup
        const popupHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Hydra Visuals</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: #000;
                        overflow: hidden;
                    }
                    canvas {
                        display: block;
                        width: 100vw;
                        height: 100vh;
                    }
                </style>
            </head>
            <body>
                <canvas id="hydra-canvas"></canvas>
                <script src="https://unpkg.com/hydra-synth"></script>
                <script>
                    // Initialize Hydra in popup
                    const canvas = document.getElementById('hydra-canvas');
                    const hydra = new Hydra({
                        canvas: canvas,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        autoLoop: true,
                        makeGlobal: true,
                        detectAudio: false,
                        numSources: 4,
                        numOutputs: 4,
                    });
                    
                    // Make hydra available globally for communication
                    window.hydra = hydra;
                    
                    // Handle window resize
                    window.addEventListener('resize', () => {
                        hydra.synth.width = window.innerWidth;
                        hydra.synth.height = window.innerHeight;
                    });
                    
                    // Notify parent window that popup is ready
                    if (window.opener) {
                        window.opener.postMessage({ type: 'popup-ready', windowId: '${windowId}' }, '*');
                    }
                </script>
            </body>
            </html>
        `;

        this.popupWindow.document.write(popupHTML);
        this.popupWindow.document.close();

        // Wait for popup to load, then initialize communication
        this.popupWindow.onload = () => {
            this.popupHydra = this.popupWindow.hydra;
            console.log('Hydra popup window ready');
        };

        // Handle popup close
        this.popupWindow.onbeforeunload = () => {
            this.popupWindow = null;
            this.popupHydra = null;
            // Update state when popup is closed
            this.popupState = { isOpen: false, windowId: null };
            this.savePopupState(this.popupState);
        };

        // Listen for messages from popup
        window.addEventListener('message', (event) => {
            if (event.data.type === 'popup-ready' && event.data.windowId === windowId) {
                console.log('Popup window confirmed ready');
            }
        });
    }

    // Execute code in popup window
    executeCodeInPopup(code) {
        if (!this.popupWindow || this.popupWindow.closed) {
            this.openPopupWindow();
            // Wait a bit for the popup to initialize
            setTimeout(() => {
                this.executeCodeInPopup(code);
            }, 1000);
            return;
        }

        try {
            // Execute code in popup window context
            this.popupWindow.eval(code);
            console.log('Executed Hydra code in popup:', code);
        } catch (error) {
            console.error('Error executing code in popup:', error);
        }
    }

    executeCode(code) {
        if (!this.isInitialized) {
            console.error('Hydra not initialized');
            return;
        }

        try {
            // Store the code in execution history
            this.executionHistory.push({
                code,
                timestamp: Date.now()
            });

            // Execute the code in the global scope where Hydra functions are available
            const result = eval(code);
            
            console.log('Executed Hydra code:', code);
            return result;
        } catch (error) {
            console.error('Error executing Hydra code:', error);
            console.error('Code that failed:', code);
            throw error;
        }
    }

    clear() {
        if (this.hydra) {
            // Clear all outputs
            this.hydra.synth.o0.clear();
            this.hydra.synth.o1.clear();
            this.hydra.synth.o2.clear();
            this.hydra.synth.o3.clear();
        }
        
        // Also clear popup if it exists
        if (this.popupHydra) {
            this.popupHydra.synth.o0.clear();
            this.popupHydra.synth.o1.clear();
            this.popupHydra.synth.o2.clear();
            this.popupHydra.synth.o3.clear();
        }
    }

    getExecutionHistory() {
        return this.executionHistory;
    }

    // Get current popup state
    getPopupState() {
        return this.popupState;
    }

    // Check if popup is currently open
    isPopupOpen() {
        return this.popupWindow && !this.popupWindow.closed;
    }

    destroy() {
        if (this.hydra) {
            // Clean up if needed
            this.hydra = null;
            this.isInitialized = false;
        }
        
        if (this.popupWindow && !this.popupWindow.closed) {
            this.popupWindow.close();
        }
    }
}

export default new HydraExecutor(); 
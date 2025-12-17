// Tree Manager - Radial Mind Map Geometry
class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        
        // Configuration for the radial layout
        this.config = {
            level1Radius: 250,    // Distance for categories
            level2Radius: 450,    // Distance for items
            level3Radius: 650,    // Distance for sub-items
            rootX: 0,
            rootY: 0
        };

        // Define colors per branch (Buzan style requires distinct colors)
        this.branchColors = {
            'b_cell_cat': '#e11d48', // Red/Pink
            't_cell_cat': '#059669', // Green
            'hodgkin_cat': '#7c3aed', // Purple
            'plasma_cat': '#d97706', // Orange
            'histio_cat': '#0891b2'  // Cyan
        };
    }

    // Main calculation function
    calculateLayout() {
        this.nodes = [];
        this.connections = [];
        
        // 1. Root
        this.nodes.push({
            id: 'root',
            x: 0, y: 0,
            type: 'root',
            title: this.data['root'].title,
            color: 'var(--c-root)'
        });

        // 2. Define Main Branches (Level 1)
        // We manually assign angles to spread them 360 degrees
        const mainBranches = [
            { key: 'b_cell_cat', angle: 220 }, // Bottom Left
            { key: 't_cell_cat', angle: 320 }, // Bottom Right
            { key: 'hodgkin_cat', angle: 140 }, // Top Left
            { key: 'plasma_cat', angle: 40 },   // Top Right
            { key: 'histio_cat', angle: 90 }    // Top
        ];

        mainBranches.forEach(branch => {
            if(!this.data[branch.key]) return;
            
            // Calculate Position
            const rad = branch.angle * (Math.PI / 180);
            const x = this.config.level1Radius * Math.cos(rad);
            const y = this.config.level1Radius * Math.sin(rad);
            const color = this.branchColors[branch.key];

            // Add Node
            this.nodes.push({
                id: branch.key,
                x: x, y: y,
                type: 'cat',
                title: this.data[branch.key].title,
                color: color
            });

            // Add Connection (Curved)
            this.connections.push({
                from: {x:0, y:0},
                to: {x:x, y:y},
                color: color,
                width: 4
            });

            // Process Children (Level 2)
            this.processChildren(branch.key, x, y, branch.angle, this.config.level2Radius, 60, color);
        });
    }

    processChildren(parentKey, pX, pY, pAngle, radius, spread, color) {
        // Find children in data structure. 
        // Note: We need a helper to find children since data.js is flat but we know the hierarchy from previous tree-manager versions.
        // For simplicity in this flat data structure, I will reconstruct hierarchy based on known keys.
        
        const children = this.getChildrenKeys(parentKey);
        if (children.length === 0) return;

        const startAngle = pAngle - (spread / 2);
        const step = spread / (children.length > 1 ? children.length - 1 : 1);

        children.forEach((childKey, index) => {
            if(!this.data[childKey]) return;

            // Calculate Angle
            const currentAngle = children.length === 1 ? pAngle : startAngle + (index * step);
            const rad = currentAngle * (Math.PI / 180);

            // Calculate Position
            // We use the parent's angle to project outward
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            this.nodes.push({
                id: childKey,
                x: x, y: y,
                type: 'item',
                title: this.data[childKey].title,
                color: color
            });

            this.connections.push({
                from: {x: pX, y: pY},
                to: {x: x, y: y},
                color: color,
                width: 2
            });

            // Process Level 3 (if any)
            this.processChildren(childKey, x, y, currentAngle, radius + 200, 30, color);
        });
    }

    // Helper to Map Hierarchy (Hardcoded for structure based on data.js)
    getChildrenKeys(key) {
        const map = {
            'b_cell_cat': ['small_b_cat', 'aggressive_b_cat'],
            'small_b_cat': ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy'],
            'aggressive_b_cat': ['dlbcl', 'hgbl', 'burkitt'],
            'plasma_cat': ['myeloma'],
            't_cell_cat': ['ptcl', 'aitl', 'alcl', 'mf', 'sezary'],
            'hodgkin_cat': ['chl', 'nlphl'],
            'histio_cat': ['lch']
        };
        return map[key] || [];
    }

    render(nodeContainer, connectionContainer) {
        this.calculateLayout();

        // 1. Render Connections (SVG)
        let svgHtml = '';
        this.connections.forEach(conn => {
            // Bezier Curve Logic
            // Control point is halfway between, but pulled towards center to make it organic
            const cpX = (conn.from.x + conn.to.x) / 2;
            const cpY = (conn.from.y + conn.to.y) / 2;
            
            svgHtml += `
                <path d="M ${conn.from.x} ${conn.from.y} Q ${cpX} ${cpY} ${conn.to.x} ${conn.to.y}" 
                      stroke="${conn.color}" 
                      stroke-width="${conn.width}" 
                      fill="none" 
                      stroke-linecap="round"
                      opacity="0.6" />
            `;
        });
        connectionContainer.innerHTML = svgHtml;

        // 2. Render Nodes (HTML)
        nodeContainer.innerHTML = this.nodes.map(node => {
            const style = `
                left: ${node.x}px; 
                top: ${node.y}px; 
                ${node.type === 'cat' ? `background-color:${node.color};` : `border-color:${node.color};`}
            `;
            
            return `
                <div class="mind-node ${node.type === 'root' ? 'root' : ''}" 
                     data-key="${node.id}" 
                     data-type="${node.type}"
                     style="left: ${node.x}px; top: ${node.y}px; ${node.type==='cat'?`background:${node.color}`:`border-color:${node.color}`}">
                    ${node.title}
                </div>
            `;
        }).join('');

        this.setupListeners();
    }

    setupListeners() {
        document.querySelectorAll('.mind-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent drag start
                const key = node.dataset.key;
                this.selectNode(key);
                document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
            });
        });
    }

    selectNode(key) {
        document.querySelectorAll('.mind-node').forEach(n => n.classList.remove('selected'));
        const target = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(target) target.classList.add('selected');
    }

    highlightNode(key, highlight) {
        const target = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(target) {
            highlight ? target.classList.add('highlighted') : target.classList.remove('highlighted');
        }
    }

    clearHighlights() {
        document.querySelectorAll('.highlighted').forEach(n => n.classList.remove('highlighted'));
    }
    
    getAllNodeKeys() {
        return this.nodes.map(n => n.id);
    }
}
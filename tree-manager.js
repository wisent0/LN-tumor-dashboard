// Tree Manager - Radial Mind Map Geometry
class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        
        // Configuration for the radial layout
        this.config = {
            level1Radius: 300,    // Distance for categories (increased for better spacing)
            level2Radius: 500,    // Distance for items
            level3Radius: 700,    // Distance for sub-items
            rootX: 0,
            rootY: 0
        };

        // Define colors per branch (Buzan style requires distinct colors)
        this.branchColors = {
            'b_cell_cat': '#e11d48', // Red/Pink
            't_cell_cat': '#059669', // Green
            'hodgkin_cat': '#7c3aed', // Purple
            'plasma_cat': '#d97706'  // Orange
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
            { key: 'plasma_cat', angle: 40 }   // Top Right
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

            // Add Connection (Curved - Using cubic Bezier for smoother curves)
            const controlX = (x) * 0.5;
            const controlY = (y) * 0.5;
            
            this.connections.push({
                from: {x:0, y:0},
                to: {x:x, y:y},
                controlX: controlX,
                controlY: controlY,
                color: color,
                width: 4
            });

            // Process Children (Level 2)
            this.processChildren(branch.key, x, y, branch.angle, this.config.level2Radius, 60, color);
        });
    }

    processChildren(parentKey, pX, pY, pAngle, radius, spread, color) {
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
            const x = pX + (radius - this.config.level1Radius) * Math.cos(rad);
            const y = pY + (radius - this.config.level1Radius) * Math.sin(rad);

            this.nodes.push({
                id: childKey,
                x: x, y: y,
                type: 'item',
                title: this.data[childKey].title,
                color: color
            });

            // Calculate control point for Bezier curve (midpoint between parent and child)
            const midX = (pX + x) / 2;
            const midY = (pY + y) / 2;
            
            this.connections.push({
                from: {x: pX, y: pY},
                to: {x: x, y: y},
                controlX: midX,
                controlY: midY,
                color: color,
                width: 2
            });

            // Process Level 3 (if any)
            const grandChildren = this.getChildrenKeys(childKey);
            if (grandChildren.length > 0) {
                this.processChildren(childKey, x, y, currentAngle, radius + 200, 40, color);
            }
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
            'hodgkin_cat': ['chl', 'nlphl']
        };
        return map[key] || [];
    }

    render(nodeContainer, connectionContainer) {
        this.calculateLayout();

        // 1. Render Connections (SVG) - Using cubic Bezier curves
        let svgHtml = '';
        this.connections.forEach(conn => {
            // Cubic Bezier Curve: M start C control1 control2 end
            // Using control points calculated in layout
            svgHtml += `
                <path d="M ${conn.from.x} ${conn.from.y} 
                         C ${conn.controlX || (conn.from.x + conn.to.x)/2} ${conn.controlY || (conn.from.y + conn.to.y)/2}
                           ${conn.controlX || (conn.from.x + conn.to.x)/2} ${conn.controlY || (conn.from.y + conn.to.y)/2}
                           ${conn.to.x} ${conn.to.y}" 
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
            const color = node.color;
            const isCat = node.type === 'cat';
            const isRoot = node.type === 'root';
            
            const style = `left: ${node.x}px; top: ${node.y}px;`;
            const className = `mind-node ${node.type} ${isRoot ? 'root' : ''}`;
            const bgStyle = isCat ? `background:${color}; color:white;` : 
                          isRoot ? `background:${color}; color:white;` : 
                          `border-color:${color}; background:white;`;
            
            return `
                <div class="${className}" 
                     data-key="${node.id}" 
                     data-type="${node.type}"
                     style="${style} ${bgStyle}">
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
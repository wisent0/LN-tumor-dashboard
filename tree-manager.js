// Tree Manager - Buzan-style Mind Map Layout
class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        
        // Buzan-style mind map configuration
        this.config = {
            centerRadius: 0,
            level1Radius: 280,    // First level categories - increased
            level2Radius: 450,    // Second level items - increased
            level3Radius: 620,    // Third level items - increased
            centerX: 0,
            centerY: 0,
            minAngleBetween: 20   // Increased minimum angle to prevent overlap
        };

        // Branch colors - Buzan style requires distinct, vibrant colors
        this.branchColors = {
            'b_cell_cat': '#e11d48', // Vibrant red
            't_cell_cat': '#059669', // Emerald green
            'hodgkin_cat': '#7c3aed', // Purple
            'plasma_cat': '#d97706'  // Amber
        };
    }

    // Calculate organic curved connections (Buzan style)
    calculateCurvePath(x1, y1, x2, y2, branchAngle, depth) {
        // Calculate midpoint
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        
        // Calculate distance
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate perpendicular direction for curve
        const angle = Math.atan2(dy, dx);
        const perpendicular = angle + Math.PI / 2;
        
        // Curve intensity based on distance and depth
        const curveIntensity = Math.min(distance * 0.3, 100);
        
        // Control points for organic curve
        const cp1x = x1 + Math.cos(angle) * distance * 0.5 + Math.cos(perpendicular) * curveIntensity;
        const cp1y = y1 + Math.sin(angle) * distance * 0.5 + Math.sin(perpendicular) * curveIntensity;
        
        return {
            start: { x: x1, y: y1 },
            control: { x: cp1x, y: cp1y },
            end: { x: x2, y: y2 }
        };
    }

    // Calculate positions to avoid overlap
    calculateRadialPositions(parentKey, parentX, parentY, parentAngle, radius, items, branchColor) {
        const positions = [];
        const totalItems = items.length;
        
        if (totalItems === 0) return positions;
        
        // Calculate spread based on number of items (more items = wider spread)
        // Increased minimum spread to prevent overlap
        const spread = Math.min(140, Math.max(60, totalItems * 30));
        const startAngle = parentAngle - (spread / 2);
        const angleStep = totalItems === 1 ? 0 : spread / (totalItems - 1);
        
        items.forEach((itemKey, index) => {
            const angle = totalItems === 1 ? parentAngle : startAngle + (index * angleStep);
            const rad = angle * (Math.PI / 180);
            
            // Calculate position with more spacing
            const x = parentX + radius * Math.cos(rad);
            const y = parentY + radius * Math.sin(rad);
            
            positions.push({
                key: itemKey,
                x: x,
                y: y,
                angle: angle,
                rad: rad
            });
        });
        
        return positions;
    }

    // Check if two nodes are too close
    nodesTooClose(node1, node2, minDistance = 80) {
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
    }

    // Adjust node position to avoid overlap
    adjustNodePosition(node, existingNodes, index) {
        const minDistance = 90; // Increased minimum distance
        let attempts = 0;
        const maxAttempts = 100;
        
        while (attempts < maxAttempts) {
            let overlap = false;
            
            for (let i = 0; i < existingNodes.length; i++) {
                if (i === index) continue;
                
                if (this.nodesTooClose(node, existingNodes[i], minDistance)) {
                    overlap = true;
                    // Move away from overlapping node
                    const dx = node.x - existingNodes[i].x;
                    const dy = node.y - existingNodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    
                    // Move node away
                    const moveX = (dx / distance) * (minDistance - distance);
                    const moveY = (dy / distance) * (minDistance - distance);
                    
                    node.x += moveX * 1.2;
                    node.y += moveY * 1.2;
                    
                    break;
                }
            }
            
            if (!overlap) break;
            attempts++;
        }
        
        return node;
    }

    // Main calculation function
    calculateLayout() {
        this.nodes = [];
        this.connections = [];
        
        // 1. Root Node (Center)
        this.nodes.push({
            id: 'root',
            x: this.config.centerX,
            y: this.config.centerY,
            type: 'root',
            branch: 'root',
            title: this.data['root'].title,
            color: 'var(--c-root)'
        });

        // 2. Main Branches (Level 1) - Arranged in a circle with better spacing
        const mainBranches = [
            { key: 'b_cell_cat', angle: 180 },   // Left
            { key: 'plasma_cat', angle: 90 },    // Top
            { key: 't_cell_cat', angle: 270 },   // Bottom
            { key: 'hodgkin_cat', angle: 0 }     // Right
        ];

        mainBranches.forEach(branch => {
            if (!this.data[branch.key]) return;
            
            const branchColor = this.branchColors[branch.key];
            const rad = branch.angle * (Math.PI / 180);
            
            // Calculate position
            const x = this.config.centerX + this.config.level1Radius * Math.cos(rad);
            const y = this.config.centerY + this.config.level1Radius * Math.sin(rad);
            
            // Add Category Node
            const categoryNode = {
                id: branch.key,
                x: x,
                y: y,
                type: 'cat',
                branch: branch.key,
                title: this.data[branch.key].title,
                color: branchColor
            };
            
            this.nodes.push(categoryNode);
            
            // Add Connection from Root to Category
            const curve = this.calculateCurvePath(
                this.config.centerX, this.config.centerY,
                x, y,
                branch.angle,
                1
            );
            
            this.connections.push({
                from: { x: this.config.centerX, y: this.config.centerY },
                to: { x: x, y: y },
                control: curve.control,
                color: branchColor,
                width: 4,
                branch: branch.key
            });
            
            // Process Children (Level 2)
            const children = this.getChildrenKeys(branch.key);
            if (children.length > 0) {
                const childPositions = this.calculateRadialPositions(
                    branch.key, x, y, branch.angle,
                    this.config.level2Radius - this.config.level1Radius,
                    children,
                    branchColor
                );
                
                childPositions.forEach((pos, childIndex) => {
                    if (!this.data[pos.key]) return;
                    
                    // Add Child Node
                    const childNode = {
                        id: pos.key,
                        x: pos.x,
                        y: pos.y,
                        type: 'item',
                        branch: branch.key,
                        title: this.data[pos.key].title,
                        color: branchColor
                    };
                    
                    // Adjust position to avoid overlap
                    const adjustedNode = this.adjustNodePosition(childNode, this.nodes, this.nodes.length);
                    
                    this.nodes.push(adjustedNode);
                    
                    // Add Connection from Parent to Child
                    const childCurve = this.calculateCurvePath(
                        x, y,
                        adjustedNode.x, adjustedNode.y,
                        pos.angle,
                        2
                    );
                    
                    this.connections.push({
                        from: { x: x, y: y },
                        to: { x: adjustedNode.x, y: adjustedNode.y },
                        control: childCurve.control,
                        color: branchColor,
                        width: 2.5,
                        branch: branch.key
                    });
                    
                    // Process Grandchildren (Level 3)
                    const grandchildren = this.getChildrenKeys(pos.key);
                    if (grandchildren.length > 0) {
                        const grandchildPositions = this.calculateRadialPositions(
                            pos.key, adjustedNode.x, adjustedNode.y, pos.angle,
                            this.config.level3Radius - this.config.level2Radius,
                            grandchildren,
                            branchColor
                        );
                        
                        grandchildPositions.forEach((grandPos, grandIndex) => {
                            if (!this.data[grandPos.key]) return;
                            
                            // Add Grandchild Node
                            const grandchildNode = {
                                id: grandPos.key,
                                x: grandPos.x,
                                y: grandPos.y,
                                type: 'item',
                                branch: branch.key,
                                title: this.data[grandPos.key].title,
                                color: branchColor
                            };
                            
                            // Adjust position to avoid overlap
                            const adjustedGrandNode = this.adjustNodePosition(grandchildNode, this.nodes, this.nodes.length);
                            
                            this.nodes.push(adjustedGrandNode);
                            
                            // Add Connection from Child to Grandchild
                            const grandCurve = this.calculateCurvePath(
                                adjustedNode.x, adjustedNode.y,
                                adjustedGrandNode.x, adjustedGrandNode.y,
                                grandPos.angle,
                                3
                            );
                            
                            this.connections.push({
                                from: { x: adjustedNode.x, y: adjustedNode.y },
                                to: { x: adjustedGrandNode.x, y: adjustedGrandNode.y },
                                control: grandCurve.control,
                                color: branchColor,
                                width: 2,
                                branch: branch.key
                            });
                        });
                    }
                });
            }
        });
    }

    // Helper to Map Hierarchy
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

        // 1. Render Connections (SVG) - Buzan-style organic curves
        let svgHtml = '';
        this.connections.forEach(conn => {
            // Quadratic Bezier curve for organic feel
            svgHtml += `
                <path d="M ${conn.from.x} ${conn.from.y} 
                         Q ${conn.control.x} ${conn.control.y}
                           ${conn.to.x} ${conn.to.y}" 
                      stroke="${conn.color}" 
                      stroke-width="${conn.width}" 
                      fill="none" 
                      stroke-linecap="round"
                      opacity="0.8"
                      class="connection-glow ${conn.branch}_conn" />
            `;
        });
        connectionContainer.innerHTML = svgHtml;

        // 2. Render Nodes
        nodeContainer.innerHTML = this.nodes.map(node => {
            const isRoot = node.type === 'root';
            const isCat = node.type === 'cat';
            const isItem = node.type === 'item';
            
            let className = 'mind-node';
            
            if (isRoot) {
                className += ' root';
            } else if (isCat) {
                className += ' cat';
            } else {
                className += ' item';
            }
            
            // Don't set color in style attribute - let CSS handle it
            const style = `left: ${node.x}px; top: ${node.y}px;`;
            
            return `
                <div class="${className}" 
                     data-key="${node.id}" 
                     data-type="${node.type}"
                     data-branch="${node.branch}"
                     style="${style}"
                     title="${node.title}">
                    ${node.title}
                </div>
            `;
        }).join('');

        this.setupListeners();
    }

    setupListeners() {
        document.querySelectorAll('.mind-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
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
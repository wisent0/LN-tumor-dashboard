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
            level1Radius: 300,    // Increased for more categories
            level2Radius: 500,    
            level3Radius: 700,    
            centerX: 0,
            centerY: 0,
            minAngleBetween: 20   
        };

        // Branch colors - Distinct vibrant colors
        this.branchColors = {
            'precursor_cat': '#db2777', // Pink
            'b_cell_cat': '#e11d48',    // Red
            'plasma_cat': '#d97706',    // Orange
            't_cell_cat': '#059669',    // Green
            'hodgkin_cat': '#7c3aed',   // Purple
            'histio_cat': '#0891b2'     // Cyan
        };
    }

    // Calculate organic curved connections
    calculateCurvePath(x1, y1, x2, y2, branchAngle, depth) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const perpendicular = angle + Math.PI / 2;
        const curveIntensity = Math.min(distance * 0.25, 120);
        
        const cp1x = x1 + Math.cos(angle) * distance * 0.5 + Math.cos(perpendicular) * curveIntensity;
        const cp1y = y1 + Math.sin(angle) * distance * 0.5 + Math.sin(perpendicular) * curveIntensity;
        
        return { start: {x:x1, y:y1}, control: {x:cp1x, y:cp1y}, end: {x:x2, y:y2} };
    }

    // Calculate radial positions
    calculateRadialPositions(parentKey, parentX, parentY, parentAngle, radius, items, branchColor) {
        const positions = [];
        const totalItems = items.length;
        if (totalItems === 0) return positions;
        
        // Dynamic spread based on item count
        const spread = Math.min(160, Math.max(60, totalItems * 25));
        const startAngle = parentAngle - (spread / 2);
        const angleStep = totalItems === 1 ? 0 : spread / (totalItems - 1);
        
        items.forEach((itemKey, index) => {
            const angle = totalItems === 1 ? parentAngle : startAngle + (index * angleStep);
            const rad = angle * (Math.PI / 180);
            const x = parentX + radius * Math.cos(rad);
            const y = parentY + radius * Math.sin(rad);
            positions.push({ key: itemKey, x: x, y: y, angle: angle, rad: rad });
        });
        return positions;
    }

    // Adjust positions to avoid overlap
    adjustNodePosition(node, existingNodes) {
        const minDistance = 100;
        let attempts = 0;
        while (attempts < 50) {
            let overlap = false;
            for (let other of existingNodes) {
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < minDistance && dist > 0) {
                    overlap = true;
                    const moveX = (dx/dist) * (minDistance - dist) * 1.5;
                    const moveY = (dy/dist) * (minDistance - dist) * 1.5;
                    node.x += moveX;
                    node.y += moveY;
                }
            }
            if (!overlap) break;
            attempts++;
        }
        return node;
    }

    calculateLayout() {
        this.nodes = [];
        this.connections = [];
        
        // 1. Root
        this.nodes.push({
            id: 'root', x: this.config.centerX, y: this.config.centerY,
            type: 'root', branch: 'root', title: this.data['root'].title, color: 'var(--c-root)'
        });

        // 2. Main Categories (Spread 360 degrees)
        const categories = [
            { key: 'precursor_cat', angle: 220 },
            { key: 'b_cell_cat', angle: 160 },
            { key: 'plasma_cat', angle: 100 },
            { key: 'hodgkin_cat', angle: 40 },
            { key: 't_cell_cat', angle: 320 },
            { key: 'histio_cat', angle: 270 }
        ];

        categories.forEach(cat => {
            if (!this.data[cat.key]) return;
            const branchColor = this.branchColors[cat.key];
            const rad = cat.angle * (Math.PI / 180);
            const x = this.config.centerX + this.config.level1Radius * Math.cos(rad);
            const y = this.config.centerY + this.config.level1Radius * Math.sin(rad);

            // Add Cat Node
            this.nodes.push({
                id: cat.key, x: x, y: y, type: 'cat', branch: cat.key,
                title: this.data[cat.key].title, color: branchColor
            });

            // Add Connection to Root
            const curve = this.calculateCurvePath(this.config.centerX, this.config.centerY, x, y, cat.angle, 1);
            this.connections.push({
                from: {x:this.config.centerX, y:this.config.centerY}, to: {x:x, y:y},
                control: curve.control, color: branchColor, width: 4, branch: cat.key
            });

            // Process Children
            const children = this.getChildrenKeys(cat.key);
            if (children.length > 0) {
                const childPositions = this.calculateRadialPositions(
                    cat.key, x, y, cat.angle, 
                    this.config.level2Radius - this.config.level1Radius, children, branchColor
                );

                childPositions.forEach(pos => {
                    if (!this.data[pos.key]) return;
                    let node = {
                        id: pos.key, x: pos.x, y: pos.y, type: 'item', branch: cat.key,
                        title: this.data[pos.key].title, color: branchColor
                    };
                    node = this.adjustNodePosition(node, this.nodes);
                    this.nodes.push(node);
                    
                    const childCurve = this.calculateCurvePath(x, y, node.x, node.y, pos.angle, 2);
                    this.connections.push({
                        from: {x:x, y:y}, to: {x:node.x, y:node.y},
                        control: childCurve.control, color: branchColor, width: 2.5, branch: cat.key
                    });

                    // Grandchildren (Level 3)
                    const grandKids = this.getChildrenKeys(pos.key);
                    if (grandKids.length > 0) {
                        const grandPositions = this.calculateRadialPositions(
                            pos.key, node.x, node.y, pos.angle,
                            this.config.level3Radius - this.config.level2Radius, grandKids, branchColor
                        );
                        grandPositions.forEach(gp => {
                            if (!this.data[gp.key]) return;
                            let gNode = {
                                id: gp.key, x: gp.x, y: gp.y, type: 'item', branch: cat.key,
                                title: this.data[gp.key].title, color: branchColor
                            };
                            gNode = this.adjustNodePosition(gNode, this.nodes);
                            this.nodes.push(gNode);
                            
                            const gCurve = this.calculateCurvePath(node.x, node.y, gNode.x, gNode.y, gp.angle, 3);
                            this.connections.push({
                                from: {x:node.x, y:node.y}, to: {x:gNode.x, y:gNode.y},
                                control: gCurve.control, color: branchColor, width: 2, branch: cat.key
                            });
                        });
                    }
                });
            }
        });
    }

    // Mapping Parent -> Children (CRITICAL: Must match data.js)
    getChildrenKeys(key) {
        const map = {
            'precursor_cat': ['b_all', 't_all'],
            'b_cell_cat': ['small_b_cat', 'aggressive_b_cat'],
            'small_b_cat': ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy'],
            'aggressive_b_cat': ['dlbcl', 'hgbl', 'burkitt', 'pbl', 'mediastinal_b'],
            'plasma_cat': ['myeloma', 'plasmacytoma'],
            't_cell_cat': ['nodal_t_cat', 'extranodal_t_cat', 'cut_t_cat'],
            'nodal_t_cat': ['ptcl', 'aitl', 'alcl'],
            'extranodal_t_cat': ['nkt', 'eatl', 'meitl', 'hepatosplenic', 'atll'],
            'cut_t_cat': ['mf', 'sezary', 'pc_alcl'],
            'hodgkin_cat': ['chl', 'nlphl'],
            'histio_cat': ['lch', 'rosai', 'fdcs']
        };
        return map[key] || [];
    }

    render(nodeContainer, connectionContainer) {
        this.calculateLayout();
        
        let svgHtml = '';
        this.connections.forEach(conn => {
            svgHtml += `<path d="M ${conn.from.x} ${conn.from.y} Q ${conn.control.x} ${conn.control.y} ${conn.to.x} ${conn.to.y}" 
                stroke="${conn.color}" stroke-width="${conn.width}" fill="none" stroke-linecap="round" opacity="0.8" />`;
        });
        connectionContainer.innerHTML = svgHtml;

        nodeContainer.innerHTML = this.nodes.map(node => {
            const style = `left: ${node.x}px; top: ${node.y}px;`;
            let className = `mind-node ${node.type}`;
            if (node.type === 'cat') style += `background: ${node.color}`;
            return `<div class="${className}" data-key="${node.id}" data-type="${node.type}" 
                data-branch="${node.branch}" style="${style}">${node.title}</div>`;
        }).join('');

        this.setupListeners();
    }

    setupListeners() {
        document.querySelectorAll('.mind-node').forEach(n => {
            n.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = n.dataset.key;
                this.selectNode(key);
                document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
            });
        });
    }

    selectNode(key) {
        document.querySelectorAll('.mind-node').forEach(n => n.classList.remove('selected'));
        const t = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(t) t.classList.add('selected');
    }
    
    highlightNode(key, on) {
        const t = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(t) on ? t.classList.add('highlighted') : t.classList.remove('highlighted');
    }
    
    clearHighlights() {
        document.querySelectorAll('.highlighted').forEach(n => n.classList.remove('highlighted'));
    }
    
    getAllNodeKeys() { return this.nodes.map(n => n.id); }
}
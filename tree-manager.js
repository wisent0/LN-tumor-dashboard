class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.config = AppConfig.layout; // Use central config
    }

    // [Previous calculateCurvePath method remains the same]
    calculateCurvePath(x1, y1, x2, y2, branchAngle, depth) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const perpendicular = angle + Math.PI / 2;
        const curveIntensity = Math.min(distance * 0.3, 100);
        const cp1x = x1 + Math.cos(angle) * distance * 0.5 + Math.cos(perpendicular) * curveIntensity;
        const cp1y = y1 + Math.sin(angle) * distance * 0.5 + Math.sin(perpendicular) * curveIntensity;
        return { start: { x: x1, y: y1 }, control: { x: cp1x, y: cp1y }, end: { x: x2, y: y2 } };
    }

    calculateRadialPositions(parentKey, parentX, parentY, parentAngle, radius, items, branchColor) {
        const positions = [];
        const totalItems = items.length;
        if (totalItems === 0) return positions;
        const spread = Math.min(140, Math.max(60, totalItems * 30));
        const startAngle = parentAngle - (spread / 2);
        const angleStep = totalItems === 1 ? 0 : spread / (totalItems - 1);
        
        items.forEach((itemKey, index) => {
            const angle = totalItems === 1 ? parentAngle : startAngle + (index * angleStep);
            const rad = angle * (Math.PI / 180);
            positions.push({
                key: itemKey,
                x: parentX + radius * Math.cos(rad),
                y: parentY + radius * Math.sin(rad),
                angle: angle
            });
        });
        return positions;
    }

    adjustNodePosition(node, existingNodes) {
        const minDistance = 90;
        let attempts = 0;
        while (attempts < 50) {
            let overlap = false;
            for (const other of existingNodes) {
                if (node.id === other.id) continue;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < minDistance) {
                    overlap = true;
                    // Push away
                    node.x += (dx/dist || 1) * 10;
                    node.y += (dy/dist || 1) * 10;
                    break;
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
        
        // Root
        this.nodes.push({
            id: 'root', x: 0, y: 0, type: 'root', branch: 'root',
            title: this.data['root'].title, color: 'var(--c-root)'
        });

        const mainBranches = [
            { key: 'b_cell_cat', angle: 180 },
            { key: 'plasma_cat', angle: 90 },
            { key: 't_cell_cat', angle: 270 },
            { key: 'hodgkin_cat', angle: 0 }
        ];

        mainBranches.forEach(branch => {
            if (!this.data[branch.key]) return;
            // Use config colors
            const branchColor = AppConfig.branches[branch.key]?.color || '#000';
            const rad = branch.angle * (Math.PI / 180);
            const x = this.config.level1Radius * Math.cos(rad);
            const y = this.config.level1Radius * Math.sin(rad);
            
            this.nodes.push({
                id: branch.key, x, y, type: 'cat', branch: branch.key,
                title: this.data[branch.key].title, color: branchColor
            });
            
            // Connection
            const curve = this.calculateCurvePath(0, 0, x, y, branch.angle, 1);
            this.connections.push({
                from: {x:0, y:0}, to: {x,y}, control: curve.control,
                color: branchColor, width: 4, branch: branch.key
            });

            // Children
            const children = this.getChildrenKeys(branch.key);
            const childPositions = this.calculateRadialPositions(
                branch.key, x, y, branch.angle,
                this.config.level2Radius - this.config.level1Radius,
                children, branchColor
            );

            childPositions.forEach(pos => {
                if(!this.data[pos.key]) return;
                const childNode = {
                    id: pos.key, x: pos.x, y: pos.y, type: 'item',
                    branch: branch.key, title: this.data[pos.key].title, color: branchColor
                };
                const adjusted = this.adjustNodePosition(childNode, this.nodes);
                this.nodes.push(adjusted);
                
                const cCurve = this.calculateCurvePath(x, y, adjusted.x, adjusted.y, pos.angle, 2);
                this.connections.push({
                    from: {x,y}, to: {x: adjusted.x, y: adjusted.y}, control: cCurve.control,
                    color: branchColor, width: 2.5, branch: branch.key
                });

                // Grandchildren
                const grandChildren = this.getChildrenKeys(pos.key);
                const grandPositions = this.calculateRadialPositions(
                    pos.key, adjusted.x, adjusted.y, pos.angle,
                    this.config.level3Radius - this.config.level2Radius,
                    grandChildren, branchColor
                );

                grandPositions.forEach(gPos => {
                    if(!this.data[gPos.key]) return;
                    const gNode = {
                        id: gPos.key, x: gPos.x, y: gPos.y, type: 'item',
                        branch: branch.key, title: this.data[gPos.key].title, color: branchColor
                    };
                    const adjG = this.adjustNodePosition(gNode, this.nodes);
                    this.nodes.push(adjG);

                    const gCurve = this.calculateCurvePath(adjusted.x, adjusted.y, adjG.x, adjG.y, gPos.angle, 3);
                    this.connections.push({
                        from: {x:adjusted.x,y:adjusted.y}, to: {x: adjG.x, y: adjG.y}, control: gCurve.control,
                        color: branchColor, width: 2, branch: branch.key
                    });
                });
            });
        });
    }

    getChildrenKeys(key) {
        const branchDef = AppConfig.branches[key];
        if(branchDef) return branchDef.children;

        // Hardcoded Level 2 mappings (kept for specific structure)
        const map = {
            'small_b_cat': ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy'],
            'aggressive_b_cat': ['dlbcl', 'hgbl', 'burkitt']
        };
        return map[key] || [];
    }

    render(nodeContainer, connectionContainer) {
        this.calculateLayout();
        
        let svgHtml = '';
        this.connections.forEach(conn => {
            svgHtml += `
                <path d="M ${conn.from.x} ${conn.from.y} 
                         Q ${conn.control.x} ${conn.control.y}
                           ${conn.to.x} ${conn.to.y}" 
                      stroke="${conn.color}" stroke-width="${conn.width}" fill="none" 
                      stroke-linecap="round" opacity="0.8" class="connection-glow" />`;
        });
        connectionContainer.innerHTML = svgHtml;

        nodeContainer.innerHTML = this.nodes.map(node => {
            const classes = `mind-node ${node.type}`;
            return `<div class="${classes}" data-key="${node.id}" data-branch="${node.branch}"
                     style="left: ${node.x}px; top: ${node.y}px;" title="${node.title}">
                    ${SecurityManager.sanitizeHTML(node.title)}
                </div>`;
        }).join('');

        this.setupListeners();
    }
    
    // [Listeners and helper methods same as before]
    setupListeners() {
        document.querySelectorAll('.mind-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(node.dataset.key);
                document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: node.dataset.key } }));
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
        if(target) highlight ? target.classList.add('highlighted') : target.classList.remove('highlighted');
    }
    clearHighlights() {
        document.querySelectorAll('.highlighted').forEach(n => n.classList.remove('highlighted'));
    }
    getAllNodeKeys() { return this.nodes.map(n => n.id); }
}
// tree-manager.js
class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.config = AppConfig.layout;
        this.spatialHash = new Map();
        this.cellSize = 120;
        
        // Bind for event delegation
        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    addToSpatialHash(node) {
        const key = `${Math.floor(node.x / this.cellSize)},${Math.floor(node.y / this.cellSize)}`;
        if (!this.spatialHash.has(key)) this.spatialHash.set(key, []);
        this.spatialHash.get(key).push(node);
    }

    getNearbyNodes(x, y) {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        let nearby = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const key = `${cx + i},${cy + j}`;
                if (this.spatialHash.has(key)) nearby = nearby.concat(this.spatialHash.get(key));
            }
        }
        return nearby;
    }

    getChildrenKeys(key) {
        // 1. Check Config (Level 1)
        if (AppConfig.branches[key]) return AppConfig.branches[key].children;
        // 2. Fallback Map for Data Levels (Level 2+)
        const map = {
            'small_b_cat': ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy'],
            'aggressive_b_cat': ['dlbcl', 'hgbl', 'burkitt'],
            'nodal_t_cat': ['ptcl', 'aitl', 'alcl'],
            'cut_t_cat': ['mf', 'sezary'],
            'histio_cat': ['lch', 'erdheim_chester'],
            'id_cat': ['ptld', 'hiv_related'],
            'precursor_cat': ['b_all', 't_all'],
            'plasma_cat': ['myeloma']
        };
        return map[key] || [];
    }

    calculateLayout() {
        this.nodes = [];
        this.connections = [];
        this.spatialHash.clear();

        const rootNode = {
            id: 'root', x: 0, y: 0, type: 'root', branch: 'root',
            title: this.data['root'].title, color: 'var(--c-root)'
        };
        this.nodes.push(rootNode);
        this.addToSpatialHash(rootNode);

        const mainBranches = Object.keys(AppConfig.branches);
        const angleStep = 360 / mainBranches.length;

        mainBranches.forEach((branchKey, index) => {
            if (!this.data[branchKey]) return;
            const angle = index * angleStep;
            const color = AppConfig.branches[branchKey].color;
            this.processNodeRecursive(branchKey, 0, 0, angle, 1, branchKey, color);
        });
    }

    processNodeRecursive(key, parentX, parentY, angle, depth, branchId, color) {
        const radius = this.config.baseRadius + ((depth - 1) * this.config.radiusStep);
        const rad = angle * (Math.PI / 180);
        
        // Level 1: Absolute Polar; Level 2+: Relative Polar
        let x = depth === 1 ? radius * Math.cos(rad) : parentX + this.config.radiusStep * Math.cos(rad);
        let y = depth === 1 ? radius * Math.sin(rad) : parentY + this.config.radiusStep * Math.sin(rad);

        const node = {
            id: key, x, y, type: depth === 1 ? 'cat' : 'item',
            branch: branchId, title: this.data[key]?.title || key, color: color
        };

        const adjusted = this.resolveCollisions(node);
        this.nodes.push(adjusted);
        this.addToSpatialHash(adjusted);

        const curve = this.calculateCurvePath(parentX, parentY, adjusted.x, adjusted.y);
        this.connections.push({
            from: {x: parentX, y: parentY}, to: {x: adjusted.x, y: adjusted.y},
            control: curve.control, color: color, width: Math.max(1, 5 - depth)
        });

        const children = this.getChildrenKeys(key);
        if (children.length > 0) {
            const spread = Math.max(20, 120 / depth); 
            const startAngle = angle - (spread / 2);
            const step = children.length > 1 ? spread / (children.length - 1) : 0;
            children.forEach((child, i) => {
                if (!this.data[child]) return;
                const childAngle = children.length === 1 ? angle : startAngle + (i * step);
                this.processNodeRecursive(child, adjusted.x, adjusted.y, childAngle, depth + 1, branchId, color);
            });
        }
    }

    resolveCollisions(node) {
        let attempts = 0;
        while (attempts < 10) {
            let collision = false;
            const nearby = this.getNearbyNodes(node.x, node.y);
            for (const other of nearby) {
                if (node.id === other.id) continue;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 90) {
                    collision = true;
                    node.x += (dx/dist || 1) * 15;
                    node.y += (dy/dist || 1) * 15;
                }
            }
            if (!collision) break;
            attempts++;
        }
        return node;
    }

    calculateCurvePath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        return {
            start: {x: x1, y: y1}, end: {x: x2, y: y2},
            control: { x: midX, y: midY } // Simple quadratic for performance
        };
    }

    render(nodeContainer, connectionContainer) {
        this.spatialHash.clear();
        this.calculateLayout();
        
        connectionContainer.innerHTML = this.connections.map(c => 
            `<path d="M ${c.from.x} ${c.from.y} Q ${c.control.x} ${c.control.y} ${c.to.x} ${c.to.y}" 
                   stroke="${c.color}" stroke-width="${c.width}" fill="none" opacity="0.7" />`
        ).join('');

        nodeContainer.innerHTML = this.nodes.map(n => 
            `<div class="mind-node ${n.type}" data-key="${n.id}" 
                  style="left:${n.x}px; top:${n.y}px; border-color: ${n.color};" 
                  role="button" tabindex="0" aria-label="${n.title}">
                ${SecurityManager.sanitizeHTML(n.title)}
            </div>`
        ).join('');

        this.setupDelegatedListeners(nodeContainer);
    }

    setupDelegatedListeners(container) {
        container.removeEventListener('click', this.handleNodeClick);
        container.addEventListener('click', this.handleNodeClick);
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('mind-node')) this.handleNodeClick(e);
        });
    }

    handleNodeClick(e) {
        const nodeEl = e.target.closest('.mind-node');
        if (!nodeEl) return;
        e.stopPropagation();
        this.selectNode(nodeEl.dataset.key);
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: nodeEl.dataset.key } }));
    }

    selectNode(key) {
        document.querySelectorAll('.mind-node.selected').forEach(n => n.classList.remove('selected'));
        const target = document.querySelector(`.mind-node[data-key="${key}"]`);
        if (target) target.classList.add('selected');
    }

    highlightNode(key, highlight) {
        const target = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(target) highlight ? target.classList.add('highlighted') : target.classList.remove('highlighted');
    }
    clearHighlights() { document.querySelectorAll('.highlighted').forEach(n => n.classList.remove('highlighted')); }
    getAllNodeKeys() { return this.nodes.map(n => n.id); }
}
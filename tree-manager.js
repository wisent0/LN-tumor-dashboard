// Tree Manager - Smart Sector Radial Layout
class TreeManager {
    constructor(data) {
        this.data = data;
        this.nodes = [];
        this.connections = [];
        this.config = {
            centerX: 0,
            centerY: 0,
            level1Radius: 320,  // Distance for Categories
            level2Radius: 550,  // Distance for Items
            level3Radius: 750   // Distance for Sub-items
        };

        this.branchColors = {
            'precursor_cat': '#db2777', // Pink
            'b_cell_cat': '#e11d48',    // Red
            'plasma_cat': '#d97706',    // Orange
            't_cell_cat': '#059669',    // Green
            'hodgkin_cat': '#7c3aed',   // Purple
            'histio_cat': '#0891b2',    // Cyan
            'id_cat': '#4b5563'         // Grey
        };
    }

    // Recursively count nodes to assign sector size
    countDescendants(key) {
        const children = this.getChildrenKeys(key);
        let count = children.length;
        children.forEach(child => count += this.countDescendants(child));
        return count;
    }

    calculateLayout() {
        this.nodes = [];
        this.connections = [];

        // 1. Root
        this.nodes.push({
            id: 'root', x: 0, y: 0, type: 'root', 
            title: this.data['root'].title, color: 'var(--c-root)'
        });

        // 2. Define Main Branches
        const mainBranches = [
            'b_cell_cat', 'plasma_cat', 't_cell_cat', 
            'hodgkin_cat', 'histio_cat', 'id_cat', 'precursor_cat'
        ];

        let totalWeight = 0;
        const branchWeights = mainBranches.map(key => {
            const weight = Math.max(4, this.countDescendants(key)); // Minimum weight prevents tiny slices
            totalWeight += weight;
            return { key, weight };
        });

        let currentAngle = 0; // Start angle
        
        branchWeights.forEach(branch => {
            if(!this.data[branch.key]) return;

            // Assign sector proportional to number of children
            const sectorSize = (branch.weight / totalWeight) * 360;
            const branchMidAngle = currentAngle + (sectorSize / 2);
            
            const rad = branchMidAngle * (Math.PI / 180);
            const bx = this.config.level1Radius * Math.cos(rad);
            const by = this.config.level1Radius * Math.sin(rad);
            const color = this.branchColors[branch.key];

            // Add Category Node
            this.nodes.push({
                id: branch.key, x: bx, y: by, type: 'cat', branch: branch.key,
                title: this.data[branch.key].title, color: color
            });

            // Connect to Root
            const rootCurve = this.calculateCurvePath(0, 0, bx, by);
            this.connections.push({
                from: {x:0,y:0}, to: {x:bx,y:by}, control: rootCurve.control, 
                color: color, width: 4
            });

            // Process Children (Level 2)
            const children = this.getChildrenKeys(branch.key);
            if(children.length > 0) {
                // Distribute children within 85% of the sector to allow gaps between branches
                const childSpread = sectorSize * 0.85; 
                const startChildAngle = branchMidAngle - (childSpread / 2);
                const step = children.length > 1 ? childSpread / (children.length - 1) : 0;

                children.forEach((childKey, idx) => {
                    if(!this.data[childKey]) return;
                    
                    const ang = children.length === 1 ? branchMidAngle : startChildAngle + (idx * step);
                    const cRad = ang * (Math.PI / 180);
                    const cx = this.config.level2Radius * Math.cos(cRad);
                    const cy = this.config.level2Radius * Math.sin(cRad);

                    this.nodes.push({
                        id: childKey, x: cx, y: cy, type: 'item', branch: branch.key,
                        title: this.data[childKey].title, color: color
                    });

                    const childCurve = this.calculateCurvePath(bx, by, cx, cy);
                    this.connections.push({
                        from: {x:bx,y:by}, to: {x:cx,y:cy}, control: childCurve.control,
                        color: color, width: 2
                    });

                    // Grandchildren (Level 3)
                    const grandKids = this.getChildrenKeys(childKey);
                    if(grandKids.length > 0) {
                        const grandSpread = 15; // Fixed small spread for sub-items
                        const startGrandAngle = ang - ((grandKids.length-1)*grandSpread)/2;
                        
                        grandKids.forEach((gkKey, gkIdx) => {
                            if(!this.data[gkKey]) return;
                            const gAng = startGrandAngle + (gkIdx * grandSpread);
                            const gRad = gAng * (Math.PI / 180);
                            const gx = this.config.level3Radius * Math.cos(gRad);
                            const gy = this.config.level3Radius * Math.sin(gRad);

                            this.nodes.push({
                                id: gkKey, x: gx, y: gy, type: 'item', branch: branch.key,
                                title: this.data[gkKey].title, color: color
                            });

                            const gCurve = this.calculateCurvePath(cx, cy, gx, gy);
                            this.connections.push({
                                from: {x:cx,y:cy}, to: {x:gx,y:gy}, control: gCurve.control,
                                color: color, width: 1.5
                            });
                        });
                    }
                });
            }
            currentAngle += sectorSize;
        });
    }

    calculateCurvePath(x1, y1, x2, y2) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        return { control: { x: mx, y: my } };
    }

    getChildrenKeys(key) {
        const map = {
            'b_cell_cat': ['small_b_cat', 'aggressive_b_cat'],
            'small_b_cat': ['cll_sll', 'mantle', 'follicular', 'marginal_nodal', 'malt', 'splenic_mzl', 'lpl', 'hairy'],
            'aggressive_b_cat': ['dlbcl_nos', 'hgbl_dh', 'hgbl_11q', 'burkitt', 'mediastinal_b', 'pbl', 'pcns_dlbcl', 'ivlbcl', 'pel'],
            'plasma_cat': ['myeloma', 'plasmacytoma'],
            't_cell_cat': ['nodal_t_cat', 'extranodal_t_cat', 'leukemic_t_cat', 'cut_t_cat'],
            'nodal_t_cat': ['ptcl_nos', 'aitl', 'alcl_alk_pos', 'alcl_alk_neg'],
            'extranodal_t_cat': ['nkt', 'eatl', 'meitl', 'hstcl', 'atll'],
            'leukemic_t_cat': ['tlgl', 'tpll'],
            'cut_t_cat': ['mf', 'sezary', 'pc_alcl', 'lyp'],
            'hodgkin_cat': ['chl', 'nlphl'],
            'histio_cat': ['lch', 'rosai', 'fdcs'],
            'precursor_cat': ['b_all', 't_all'],
            'id_cat': ['ptld']
        };
        return map[key] || [];
    }

    render(nodeContainer, connectionContainer) {
        this.calculateLayout();
        
        let svg = '';
        this.connections.forEach(c => {
            svg += `<path d="M${c.from.x},${c.from.y} Q${c.control.x},${c.control.y} ${c.to.x},${c.to.y}" 
                    stroke="${c.color}" stroke-width="${c.width}" fill="none" opacity="0.6"/>`;
        });
        connectionContainer.innerHTML = svg;

        nodeContainer.innerHTML = this.nodes.map(n => `
            <div class="mind-node ${n.type}" 
                 style="left:${n.x}px; top:${n.y}px; ${n.type==='cat'?`background:${n.color}`:`border-color:${n.color}`}"
                 data-key="${n.id}">
                ${n.title}
            </div>
        `).join('');

        this.setupListeners();
    }

    setupListeners() {
        document.querySelectorAll('.mind-node').forEach(n => {
            n.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(n.dataset.key);
                document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: n.dataset.key } }));
            });
        });
    }

    selectNode(key) {
        document.querySelectorAll('.mind-node').forEach(n => n.classList.remove('selected'));
        const target = document.querySelector(`.mind-node[data-key="${key}"]`);
        if(target) target.classList.add('selected');
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
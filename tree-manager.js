// Tree Manager Module - ALWAYS EXPANDED (Radial Mind Map Style)
class TreeManager {
    constructor(data) {
        this.data = data;
        this.treeStructure = this.buildTreeStructure();
        this.selectedNode = null;
        // No expandedNodes Set needed because everything is expanded by default
    }

    buildTreeStructure() {
        return {
            root: {
                key: 'root',
                children: [
                    // 1. B-CELL
                    {
                        key: 'b_cell_cat',
                        children: [
                            {
                                key: 'small_b_cat',
                                children: [ { key: 'cll_sll' }, { key: 'mantle' }, { key: 'follicular' }, { key: 'marginal' }, { key: 'lpl' }, { key: 'hairy' } ]
                            },
                            {
                                key: 'aggressive_b_cat',
                                children: [ { key: 'dlbcl' }, { key: 'hgbl' }, { key: 'burkitt' } ]
                            },
                            {
                                key: 'plasma_cat',
                                children: [ { key: 'myeloma' } ]
                            }
                        ]
                    },
                    // 2. T-CELL
                    {
                        key: 't_cell_cat',
                        children: [
                            {
                                key: 'nodal_t_cat',
                                children: [ { key: 'ptcl' }, { key: 'aitl' }, { key: 'alcl' } ]
                            },
                            {
                                key: 'cut_t_cat',
                                children: [ { key: 'mf' }, { key: 'sezary' } ]
                            }
                        ]
                    },
                    // 3. HODGKIN
                    {
                        key: 'hodgkin_cat',
                        children: [ { key: 'chl' }, { key: 'nlphl' } ]
                    }
                ]
            }
        };
    }

    render(container) {
        if (!container) return;
        container.innerHTML = `<ul class="tree">${this.generateTreeHTML(this.treeStructure.root)}</ul>`;
        this.setupEventListeners();
        
        // Restore highlight
        if (this.selectedNode) {
            const btn = document.querySelector(`.node-btn[data-key="${this.selectedNode}"]`);
            if (btn) btn.classList.add('selected');
        }
    }

    generateTreeHTML(node) {
        const item = this.data[node.key];
        if (!item) return '';

        const hasChildren = node.children && node.children.length > 0;
        
        // No toggle icon needed
        let html = `<li>
            <button class="node-btn" 
                    data-key="${node.key}">
                <span>${item.title}</span>
            </button>`;

        if (hasChildren) {
            // ALWAYS Render Children (No 'hidden' class)
            html += `<ul>
                        ${node.children.map(child => this.generateTreeHTML(child)).join('')}
                     </ul>`;
        }
        
        html += `</li>`;
        return html;
    }

    setupEventListeners() {
        document.querySelectorAll('.node-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = btn.dataset.key;
                this.selectNode(key);
                document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
            });
        });
    }

    selectNode(key) {
        // Remove previous selection
        if (this.selectedNode) {
            const prev = document.querySelector(`.node-btn[data-key="${this.selectedNode}"]`);
            if (prev) prev.classList.remove('selected');
        }
        
        // Add new selection
        const curr = document.querySelector(`.node-btn[data-key="${key}"]`);
        if (curr) curr.classList.add('selected');
        this.selectedNode = key;
    }

    highlightNode(key, highlight = true) {
        const btn = document.querySelector(`.node-btn[data-key="${key}"]`);
        if (btn) {
            if (highlight) btn.classList.add('highlighted');
            else btn.classList.remove('highlighted');
        }
    }

    clearHighlights() {
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    }

    getAllNodeKeys() {
        const keys = [];
        const collect = (node) => {
            keys.push(node.key);
            if (node.children) node.children.forEach(collect);
        };
        collect(this.treeStructure.root);
        return keys;
    }
}
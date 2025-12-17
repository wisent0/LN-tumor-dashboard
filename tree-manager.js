// Tree Manager - Lymphoma Structure
class TreeManager {
    constructor(data) {
        this.data = data;
        this.treeStructure = this.buildTreeStructure();
        this.selectedNode = null;
        this.expandedNodes = new Set(['root']); 
    }

    buildTreeStructure() {
        return {
            root: {
                key: 'root',
                children: [
                    // 1. MATURE B-CELL
                    {
                        key: 'b_cell_cat',
                        children: [
                            {
                                key: 'small_b_cat',
                                children: [ 
                                    { key: 'cll_sll' }, 
                                    { key: 'mantle' }, 
                                    { key: 'follicular' }, 
                                    { key: 'marginal' },
                                    { key: 'lpl' }
                                ]
                            },
                            {
                                key: 'aggressive_b_cat',
                                children: [ 
                                    { key: 'dlbcl' }, 
                                    { key: 'burkitt' },
                                    { key: 'hgbl' }
                                ]
                            }
                        ]
                    },
                    // 2. MATURE T-CELL
                    {
                        key: 't_cell_cat',
                        children: [ 
                            { key: 'ptcl' }, 
                            { key: 'alcl' },
                            { key: 'aitl' }
                        ]
                    },
                    // 3. HODGKIN
                    {
                        key: 'hodgkin_cat',
                        children: [ 
                            { key: 'chl' },
                            { key: 'nlphl' }
                        ]
                    },
                    // 4. PLASMA CELL
                    {
                        key: 'plasma_cat',
                        children: [ 
                            { key: 'myeloma' } 
                        ]
                    }
                ]
            }
        };
    }

    render(container) {
        if (!container) return;
        container.innerHTML = `<ul class="tree">${this.generateTreeHTML(this.treeStructure.root)}</ul>`;
        this.setupEventListeners();
        
        if (this.selectedNode) {
            const btn = document.querySelector(`.node-btn[data-key="${this.selectedNode}"]`);
            if (btn) btn.classList.add('selected');
        }
    }

    generateTreeHTML(node) {
        const item = this.data[node.key];
        if (!item) return '';

        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = this.expandedNodes.has(node.key);
        
        let icon = '';
        if (hasChildren) {
            icon = `<i class="fas ${isExpanded ? 'fa-minus' : 'fa-plus'}" style="margin-right:5px; font-size:0.8em; opacity:0.7;"></i>`;
        }

        let html = `<li>
            <button class="node-btn ${isExpanded ? 'expanded' : ''}" 
                    data-key="${node.key}">
                ${icon}
                <span>${item.title}</span>
            </button>`;

        if (hasChildren) {
            html += `<ul class="${isExpanded ? '' : 'hidden'}">
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
                this.handleNodeClick(key);
            });
        });
    }

    handleNodeClick(key) {
        this.selectedNode = key;
        
        if (this.expandedNodes.has(key)) {
            this.expandedNodes.delete(key);
        } else {
            this.expandedNodes.add(key);
        }
        
        this.render(document.getElementById('treeContent'));
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
    }
}
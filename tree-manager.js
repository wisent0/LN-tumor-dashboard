// Tree Manager - Butterfly Layout (Left/Right Split)
class TreeManager {
    constructor(data) {
        this.data = data;
        this.treeStructure = this.buildTreeStructure();
        this.selectedNode = null;
        this.highlightedNodes = new Set();
    }

    buildTreeStructure() {
        return {
            root: {
                key: 'root',
                // Define Explicit Groups for Balance
                leftChildren: [
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
                    }
                ],
                rightChildren: [
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
                    {
                        key: 'hodgkin_cat',
                        children: [ { key: 'chl' }, { key: 'nlphl' } ]
                    },
                    {
                        key: 'histio_cat',
                        children: [ { key: 'lch' } ]
                    }
                ]
            }
        };
    }

    render(container) {
        if (!container) return;
        
        // Render Butterfly Structure
        const rootNode = this.treeStructure.root;
        const rootItem = this.data['root'];

        let html = `
        <div class="mindmap">
            <div class="wing wing-left">
                ${rootNode.leftChildren.map(child => this.generateBranchHTML(child, 'left')).join('')}
            </div>

            <button class="node-btn node-root" data-key="root">
                ${rootItem.title}
            </button>

            <div class="wing wing-right">
                ${rootNode.rightChildren.map(child => this.generateBranchHTML(child, 'right')).join('')}
            </div>
        </div>
        `;

        container.innerHTML = html;
        this.setupEventListeners();
        
        // Restore selection
        if (this.selectedNode) {
            const btn = document.querySelector(`.node-btn[data-key="${this.selectedNode}"]`);
            if (btn) btn.classList.add('selected');
        }
    }

    // Recursive function to generate branches
    generateBranchHTML(node, side) {
        const item = this.data[node.key];
        if (!item) return '';

        const hasChildren = node.children && node.children.length > 0;
        
        // Determine style classes
        const branchClass = side === 'left' ? 'branch-left' : 'branch-right';
        const isCategory = node.key.includes('_cat');
        const nodeClass = isCategory ? 'node-cat' : 'node-item';

        let html = `
            <div class="branch ${branchClass}">
                <button class="node-btn ${nodeClass}" data-key="${node.key}">
                    ${item.title}
                </button>
        `;

        if (hasChildren) {
            html += `<div class="children-group">
                        ${node.children.map(child => this.generateBranchHTML(child, side)).join('')}
                     </div>`;
        }

        html += `</div>`; // Close branch
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
        if (this.selectedNode) {
            const prev = document.querySelector(`.node-btn[data-key="${this.selectedNode}"]`);
            if (prev) prev.classList.remove('selected');
        }
        const curr = document.querySelector(`.node-btn[data-key="${key}"]`);
        if (curr) curr.classList.add('selected');
        this.selectedNode = key;
    }

    highlightNode(key, highlight = true) {
        const btn = document.querySelector(`.node-btn[data-key="${key}"]`);
        if (btn) {
            if (highlight) {
                btn.classList.add('highlighted');
                // Auto scroll to highlighted node if searched
                btn.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            } else {
                btn.classList.remove('highlighted');
            }
        }
    }

    clearHighlights() {
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    }

    getAllNodeKeys() {
        // Helper to crawl the complex structure
        const keys = ['root'];
        const traverse = (nodes) => {
            nodes.forEach(node => {
                keys.push(node.key);
                if (node.children) traverse(node.children);
            });
        };
        traverse(this.treeStructure.root.leftChildren);
        traverse(this.treeStructure.root.rightChildren);
        return keys;
    }
}
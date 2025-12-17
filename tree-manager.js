// Tree Manager Module - Lymphoma Version
class TreeManager {
    constructor(data) {
        this.data = data;
        this.treeStructure = this.buildTreeStructure();
        this.selectedNode = null;
        this.highlightedNodes = new Set();
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
                                    { key: 'mbl' },
                                    { key: 'mantle' },
                                    { key: 'follicular' },
                                    { key: 'marginal' },
                                    { key: 'lpl' }
                                ]
                            },
                            {
                                key: 'aggressive_b_cat',
                                children: [
                                    { key: 'dlbcl_nos' },
                                    { key: 'hgbl_dh' },
                                    { key: 'hgbl_11q' },
                                    { key: 'burkitt' }
                                ]
                            },
                            {
                                key: 'plasma_cat',
                                children: [
                                    { key: 'myeloma' }
                                ]
                            }
                        ]
                    },
                    // 2. MATURE T-CELL
                    {
                        key: 't_cell_cat',
                        children: [
                            {
                                key: 'nodal_t_cat',
                                children: [
                                    { key: 'ntfh_ail' },
                                    { key: 'alcl' }
                                ]
                            },
                            {
                                key: 'cutaneous_t_cat',
                                children: [
                                    { key: 'mf' },
                                    { key: 'sezary' }
                                ]
                            }
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
                    // 4. HISTIOCYTIC
                    {
                        key: 'histio_cat',
                        children: [
                            { key: 'lch' }
                        ]
                    }
                ]
            }
        };
    }

    render(container) {
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

        const themeClass = this.getThemeClass(item.color);
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = this.expandedNodes.has(node.key);
        
        let iconHtml = hasChildren ? `<i class="fas ${isExpanded ? 'fa-minus-circle' : 'fa-plus-circle'} toggle-icon"></i>` : '';

        let html = `<li>
            <button class="node-btn ${themeClass} ${isExpanded ? 'expanded' : ''}" 
                    data-key="${node.key}"
                    role="treeitem"
                    aria-expanded="${isExpanded}"
                    tabindex="0">
                ${iconHtml}
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

    getThemeClass(color) {
        if (color.includes('node-center')) return 'node-btn'; 
        return 'theme-adult'; // Maps to standard blue bubble style
    }

    setupEventListeners() {
        const tree = document.querySelector('.tree');
        if (!tree) return;

        tree.addEventListener('click', (e) => {
            const btn = e.target.closest('.node-btn');
            if (btn) {
                const key = btn.dataset.key;
                this.handleNodeInteraction(key);
            }
        });

        tree.addEventListener('keydown', (e) => {
            const btn = e.target.closest('.node-btn');
            if (!btn) return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const key = btn.dataset.key;
                this.handleNodeInteraction(key);
            }
        });
    }

    handleNodeInteraction(key) {
        this.selectNode(key);
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
        if (this.hasChildren(key)) {
            this.toggleNode(key);
        }
    }

    toggleNode(key) {
        if (this.expandedNodes.has(key)) this.expandedNodes.delete(key);
        else this.expandedNodes.add(key);
        this.render(document.getElementById('treeContent'));
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
        if (highlight) this.expandParents(key);
        const btn = document.querySelector(`.node-btn[data-key="${key}"]`);
        if (btn) highlight ? btn.classList.add('highlighted') : btn.classList.remove('highlighted');
    }

    expandParents(key) {
        const findPath = (node, targetKey, path = []) => {
            if (node.key === targetKey) return path;
            if (node.children) {
                for (let child of node.children) {
                    const result = findPath(child, targetKey, [...path, node.key]);
                    if (result) return result;
                }
            }
            return null;
        };
        const path = findPath(this.treeStructure.root, key);
        if (path) {
            path.forEach(k => this.expandedNodes.add(k));
            this.render(document.getElementById('treeContent'));
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

    hasChildren(key) {
        const check = (node) => {
            if (node.key === key) return node.children && node.children.length > 0;
            if (node.children) {
                for (let child of node.children) if (check(child)) return true;
            }
            return false;
        };
        return check(this.treeStructure.root);
    }
}
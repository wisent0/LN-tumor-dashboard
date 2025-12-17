// Search Manager Module
class SearchManager {
    constructor(data, treeManager) {
        this.data = data;
        this.treeManager = treeManager;
        this.resultsContainer = document.getElementById('searchResults');
        this.searchInput = document.getElementById('searchInput');
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        // Debounce search to improve performance
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, 300);
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && 
                !this.resultsContainer.contains(e.target)) {
                this.hideResults();
            }
        });

        // Handle keyboard navigation in search
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideResults();
                this.searchInput.value = '';
                this.treeManager.clearHighlights();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const firstResult = this.resultsContainer.querySelector('.search-result-item');
                if (firstResult) firstResult.focus();
            }
        });
    }

    search(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (!normalizedQuery) {
            this.hideResults();
            this.treeManager.clearHighlights();
            return;
        }

        const results = [];
        const allKeys = this.treeManager.getAllNodeKeys();

        // Search in titles, tags, and content
        allKeys.forEach(key => {
            const item = this.data[key];
            if (!item) return;

            const searchText = `
                ${item.title.toLowerCase()}
                ${item.tags.join(' ').toLowerCase()}
                ${item.content.toLowerCase().replace(/<[^>]*>/g, ' ')}
            `;

            if (searchText.includes(normalizedQuery)) {
                const matchScore = this.calculateMatchScore(item, normalizedQuery);
                results.push({ key, item, score: matchScore });
            }
        });

        // Sort by relevance
        results.sort((a, b) => b.score - a.score);

        this.displayResults(results);
        this.highlightResults(results);
    }

    calculateMatchScore(item, query) {
        let score = 0;
        
        // Title matches are most important
        if (item.title.toLowerCase().includes(query)) {
            score += 100;
            // Exact title match gets bonus
            if (item.title.toLowerCase() === query) {
                score += 50;
            }
        }

        // Tag matches are important
        item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(query)) {
                score += 30;
            }
        });

        // Content matches
        const content = item.content.toLowerCase().replace(/<[^>]*>/g, ' ');
        if (content.includes(query)) {
            score += 10;
            // Multiple occurrences in content
            const occurrences = (content.match(new RegExp(query, 'g')) || []).length;
            score += occurrences * 5;
        }

        return score;
    }

    displayResults(results) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = '<div class="no-results">No matching lymphomas found</div>';
            this.resultsContainer.classList.add('show');
            return;
        }

        const html = results.slice(0, 10).map(result => { // Limit to 10 results
            const { key, item } = result;
            const category = this.getCategoryFromKey(key);
            
            return `
                <div class="search-result-item" 
                     data-key="${key}"
                     role="option"
                     tabindex="0">
                    <span class="search-result-category">${category}</span>
                    <div>
                        <strong>${item.title}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                            ${item.tags.slice(0, 3).map(t => `<span class="tag cat" style="margin-right: 4px;">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.resultsContainer.innerHTML = html;
        this.resultsContainer.classList.add('show');
        this.setupResultListeners();
    }

    getCategoryFromKey(key) {
        // Determine category based on key patterns
        if (key === 'root') return 'Root';
        if (key.includes('_cat')) return 'Category';
        if (key.includes('b_cell') || ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy', 'dlbcl', 'hgbl', 'burkitt'].includes(key)) return 'B-Cell';
        if (key.includes('t_cell') || ['ptcl', 'aitl', 'alcl', 'mf', 'sezary'].includes(key)) return 'T-Cell';
        if (key.includes('hodgkin') || ['chl', 'nlphl'].includes(key)) return 'Hodgkin';
        if (key.includes('plasma') || key === 'myeloma') return 'Plasma Cell';
        return 'Other';
    }

    setupResultListeners() {
        const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
        
        resultItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectResult(item.dataset.key);
            });

            item.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.selectResult(item.dataset.key);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        const next = resultItems[index + 1];
                        if (next) next.focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        const prev = resultItems[index - 1];
                        if (prev) prev.focus();
                        else this.searchInput.focus();
                        break;
                    case 'Escape':
                        this.hideResults();
                        this.searchInput.focus();
                        break;
                }
            });
        });
    }

    selectResult(key) {
        this.hideResults();
        this.searchInput.value = '';
        this.treeManager.clearHighlights();
        this.treeManager.selectNode(key);
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key } }));
    }

    highlightResults(results) {
        this.treeManager.clearHighlights();
        results.forEach(result => {
            this.treeManager.highlightNode(result.key, true);
        });
    }

    hideResults() {
        this.resultsContainer.classList.remove('show');
    }
}
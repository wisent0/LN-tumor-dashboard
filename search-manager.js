// Search Manager Module - Optimized
class SearchManager {
    constructor(data, treeManager) {
        this.data = data;
        this.treeManager = treeManager;
        this.resultsContainer = document.getElementById('searchResults');
        this.searchInput = document.getElementById('searchInput');
        this.searchIndex = this.buildSearchIndex();
        this.setupSearchListeners();
    }

    buildSearchIndex() {
        const index = {
            titles: new Map(),
            tags: new Map()
        };
        
        Object.entries(this.data).forEach(([key, item]) => {
            // Index titles
            const titleWords = item.title.toLowerCase().split(/\W+/);
            titleWords.forEach(word => {
                if (word.length > 2) {
                    const list = index.titles.get(word) || [];
                    list.push(key);
                    index.titles.set(word, list);
                }
            });
            
            // Index tags
            item.tags.forEach(tag => {
                const normalized = tag.toLowerCase();
                const list = index.tags.get(normalized) || [];
                list.push(key);
                index.tags.set(normalized, list);
            });
        });
        
        return index;
    }

    setupSearchListeners() {
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, AppConfig.search.debounceTime);
        });

        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && 
                !this.resultsContainer.contains(e.target)) {
                this.hideResults();
            }
        });
        
        // Keyboard nav
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideResults();
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const first = this.resultsContainer.querySelector('.search-result-item');
                if(first) first.focus();
            }
        });
    }

    search(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (!normalizedQuery || normalizedQuery.length < AppConfig.search.minQueryLength) {
            this.hideResults();
            this.treeManager.clearHighlights();
            return;
        }

        const resultSet = new Set();
        
        // Fast Index Lookup
        this.searchIndex.titles.forEach((keys, word) => {
            if(word.includes(normalizedQuery)) keys.forEach(k => resultSet.add(k));
        });
        
        this.searchIndex.tags.forEach((keys, tag) => {
            if(tag.includes(normalizedQuery)) keys.forEach(k => resultSet.add(k));
        });

        // Content Fallback (slower, but comprehensive)
        if (resultSet.size < 5) {
            const allKeys = this.treeManager.getAllNodeKeys();
            allKeys.forEach(key => {
                const item = this.data[key];
                if (item && item.content.toLowerCase().includes(normalizedQuery)) {
                    resultSet.add(key);
                }
            });
        }

        // Scoring
        const results = Array.from(resultSet).map(key => ({
            key,
            item: this.data[key],
            score: this.calculateMatchScore(this.data[key], normalizedQuery)
        })).sort((a, b) => b.score - a.score);

        this.displayResults(results);
        this.highlightResults(results);
    }

    calculateMatchScore(item, query) {
        let score = 0;
        if (item.title.toLowerCase() === query) score += 100;
        else if (item.title.toLowerCase().includes(query)) score += 50;
        
        item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(query)) score += 30;
        });
        
        // Content Check
        const cleanContent = item.content.replace(/<[^>]*>/g, ' ').toLowerCase();
        if (cleanContent.includes(query)) score += 10;
        
        return score;
    }

    displayResults(results) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = '<div class="no-results">No matching lymphomas found</div>';
            this.resultsContainer.classList.add('show');
            return;
        }

        const html = results.slice(0, AppConfig.search.maxResults).map(result => {
            const { key, item } = result;
            const category = this.getCategoryFromKey(key);
            
            // Safe rendering
            return `
                <div class="search-result-item" 
                     data-key="${key}"
                     role="option"
                     tabindex="0">
                    <span class="search-result-category">${SecurityManager.sanitizeHTML(category)}</span>
                    <div>
                        <strong>${SecurityManager.sanitizeHTML(item.title)}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                            ${item.tags.slice(0, 3).map(t => `<span class="tag cat" style="margin-right: 4px;">${SecurityManager.sanitizeHTML(t)}</span>`).join('')}
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
        if (key === 'root') return 'Triage';
        if (key.includes('b_cell') || AppConfig.branches.b_cell_cat.children.includes(key) || ['cll_sll', 'mantle', 'follicular', 'marginal', 'lpl', 'hairy', 'dlbcl', 'hgbl', 'burkitt'].includes(key)) return 'B-Cell';
        if (key.includes('t_cell') || AppConfig.branches.t_cell_cat.children.includes(key)) return 'T-Cell';
        return 'Other';
    }

    setupResultListeners() {
        const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
        resultItems.forEach((item, index) => {
            item.addEventListener('click', () => this.selectResult(item.dataset.key));
            item.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') this.selectResult(item.dataset.key);
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
        results.forEach(result => this.treeManager.highlightNode(result.key, true));
    }

    hideResults() {
        this.resultsContainer.classList.remove('show');
    }
}
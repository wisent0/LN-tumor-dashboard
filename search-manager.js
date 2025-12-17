// search-manager.js
class SearchManager {
    constructor(data, treeManager) {
        this.data = data;
        this.treeManager = treeManager;
        this.resultsContainer = document.getElementById('searchResults');
        this.searchInput = document.getElementById('searchInput');
        this.index = this.buildIndex();
        this.setupListeners();
    }

    buildIndex() {
        const index = { titles: new Map(), tags: new Map() };
        Object.entries(this.data).forEach(([key, item]) => {
            if (!item.title) return;
            const tokens = item.title.toLowerCase().split(/\W+/);
            tokens.forEach(t => {
                if (t.length > 2) {
                    if (!index.titles.has(t)) index.titles.set(t, []);
                    index.titles.get(t).push(key);
                }
            });
            if (item.tags) {
                item.tags.forEach(tag => {
                    const nt = tag.toLowerCase();
                    if (!index.tags.has(nt)) index.tags.set(nt, []);
                    index.tags.get(nt).push(key);
                });
            }
        });
        return index;
    }

    setupListeners() {
        let timeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.search(e.target.value), AppConfig.search.debounceTime);
        });
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.resultsContainer.contains(e.target)) {
                this.resultsContainer.classList.remove('show');
            }
        });
    }

    search(query) {
        const q = query.toLowerCase().trim();
        if (q.length < AppConfig.search.minQueryLength) {
            this.resultsContainer.classList.remove('show');
            this.treeManager.clearHighlights();
            return;
        }

        const matches = new Set();
        // O(1) Index Lookup
        this.index.titles.forEach((keys, token) => { if(token.includes(q)) keys.forEach(k => matches.add(k)); });
        this.index.tags.forEach((keys, tag) => { if(tag.includes(q)) keys.forEach(k => matches.add(k)); });

        const results = Array.from(matches).map(key => ({
            key, item: this.data[key],
            score: (this.data[key].title.toLowerCase() === q ? 100 : 0) + 10
        })).sort((a,b) => b.score - a.score).slice(0, AppConfig.search.maxResults);

        this.renderResults(results);
        this.treeManager.clearHighlights();
        results.forEach(r => this.treeManager.highlightNode(r.key, true));
    }

    renderResults(results) {
        if (!results.length) {
            this.resultsContainer.innerHTML = '<div class="no-results">No matches found</div>';
        } else {
            this.resultsContainer.innerHTML = results.map(r => `
                <div class="search-result-item" data-key="${r.key}" role="option" tabindex="0">
                    <strong>${SecurityManager.sanitizeHTML(r.item.title)}</strong>
                    <div style="font-size:0.8em;color:#666">
                        ${(r.item.tags||[]).slice(0,3).join(', ')}
                    </div>
                </div>
            `).join('');
            
            this.resultsContainer.querySelectorAll('.search-result-item').forEach(el => {
                el.addEventListener('click', () => {
                    this.treeManager.selectNode(el.dataset.key);
                    document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: el.dataset.key } }));
                    this.resultsContainer.classList.remove('show');
                });
            });
        }
        this.resultsContainer.classList.add('show');
    }
}
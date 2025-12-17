// Accessibility Manager Module
class AccessibilityManager {
    constructor() {
        this.currentFocusIndex = 0;
        this.focusableElements = [];
    }

    setupKeyboardNavigation() {
        // Update all buttons with proper accessibility attributes
        document.querySelectorAll('.node-btn').forEach((btn, index) => {
            btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
            btn.setAttribute('role', 'treeitem');
            
            const ariaLabel = this.generateAriaLabel(btn);
            btn.setAttribute('aria-label', ariaLabel);
        });

        // Track focusable elements
        this.focusableElements = Array.from(document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));

        // Setup global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in search input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Ctrl+F to focus search
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }

            // Escape to close search results
            if (e.key === 'Escape') {
                const searchResults = document.getElementById('searchResults');
                if (searchResults?.classList.contains('show')) {
                    searchResults.classList.remove('show');
                    document.getElementById('searchInput')?.focus();
                }
            }
        });

        // Announce dynamic content changes
        this.setupLiveRegions();
    }

    generateAriaLabel(button) {
        const text = button.textContent.trim();
        const theme = Array.from(button.classList).find(c => c.startsWith('theme-'));
        const isDecision = button.classList.contains('is-decision');
        
        let label = text;
        if (theme) {
            const category = theme.replace('theme-', '').replace(/-/g, ' ');
            label += `, ${category} category`;
        }
        if (isDecision) {
            label += ', decision node';
        }
        
        return label;
    }

    setupLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);

        // Listen for node selection events
        document.addEventListener('node-selected', (e) => {
            const key = e.detail.key;
            const item = medicalData[key];
            if (item) {
                this.announce(`Loaded details for ${item.title}. ${item.tags.join(', ')}`);
            }
        });
    }

    announce(message) {
        const liveRegion = document.querySelector('[aria-live]');
        if (liveRegion) {
            liveRegion.textContent = message;
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    setFocus(element) {
        if (element) {
            element.focus();
            this.announce(`${element.textContent} focused`);
        }
    }

    // Skip to main content for screen readers
    addSkipToContentLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#detailPanel';
        skipLink.className = 'sr-only sr-only-focusable';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}
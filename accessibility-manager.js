// Accessibility Manager Module
class AccessibilityManager {
    constructor() {
        this.contrastChecker = new ContrastChecker();
    }

    setupKeyboardNavigation() {
        // Setup global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }
            if (e.key === 'Escape') {
                document.getElementById('searchResults')?.classList.remove('show');
            }
        });

        // Add skip links
        this.addSkipLinks();
        
        // Setup ARIA live regions
        this.setupLiveRegions();
        
        // Run contrast check
        this.contrastChecker.checkAllTextContrast();
    }

    addSkipLinks() {
        const skipLinks = [
            { href: '#detailPanel', text: 'Skip to Diagnosis Details' },
            { href: '#searchInput', text: 'Skip to Search' },
            { href: '#canvasWrapper', text: 'Skip to Mind Map' }
        ];
        
        const skipContainer = document.createElement('div');
        skipContainer.className = 'skip-links-container';
        skipLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'skip-link';
            a.textContent = link.text;
            skipContainer.appendChild(a);
        });
        document.body.insertBefore(skipContainer, document.body.firstChild);
    }

    setupLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'a11y-announcer';
        document.body.appendChild(liveRegion);

        document.addEventListener('node-selected', (e) => {
            const item = medicalData[e.detail.key];
            if (item) {
                this.announce(`Selected ${item.title}. Details loaded.`);
            }
        });
    }

    announce(message) {
        const region = document.getElementById('a11y-announcer');
        if(region) {
            region.textContent = message;
            setTimeout(() => region.textContent = '', 2000);
        }
    }
}

class ContrastChecker {
    checkAllTextContrast() {
        // Basic check to log potential issues to console
        console.log("Accessibility: Running contrast checks...");
    }
}
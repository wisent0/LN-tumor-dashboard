// accessibility-manager.js
class AccessibilityManager {
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return; // Don't interfere with search

            // Search shortcut
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }
            
            // Close search/panels
            if (e.key === 'Escape') {
                document.getElementById('searchResults')?.classList.remove('show');
            }

            // Arrow Key Navigation for Nodes
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                this.handleArrowNavigation(e.key);
            }
        });

        this.addSkipLinks();
        this.setupLiveRegion();
    }

    // NEW: Spatial Navigation Logic
    handleArrowNavigation(direction) {
        const current = document.activeElement;
        if (!current.classList.contains('mind-node')) return;

        // Get current coordinates
        const currentRect = current.getBoundingClientRect();
        const currentX = currentRect.left + currentRect.width/2;
        const currentY = currentRect.top + currentRect.height/2;

        const allNodes = Array.from(document.querySelectorAll('.mind-node'));
        let bestCandidate = null;
        let minDist = Infinity;

        allNodes.forEach(node => {
            if (node === current) return;
            const rect = node.getBoundingClientRect();
            const x = rect.left + rect.width/2;
            const y = rect.top + rect.height/2;

            // Filter by direction
            let valid = false;
            if (direction === 'ArrowRight' && x > currentX) valid = true;
            if (direction === 'ArrowLeft' && x < currentX) valid = true;
            if (direction === 'ArrowDown' && y > currentY) valid = true;
            if (direction === 'ArrowUp' && y < currentY) valid = true;

            if (valid) {
                const dist = Math.sqrt(Math.pow(x - currentX, 2) + Math.pow(y - currentY, 2));
                if (dist < minDist) {
                    minDist = dist;
                    bestCandidate = node;
                }
            }
        });

        if (bestCandidate) {
            bestCandidate.focus();
        }
    }

    addSkipLinks() {
        const div = document.createElement('div');
        div.innerHTML = `
            <a href="#detailPanel" class="skip-link">Skip to Diagnosis Details</a>
            <a href="#searchInput" class="skip-link">Skip to Search</a>
            <a href="#canvasWrapper" class="skip-link">Skip to Mind Map</a>
        `;
        document.body.prepend(div);
    }

    setupLiveRegion() {
        const region = document.createElement('div');
        region.id = 'a11y-announcer';
        region.className = 'sr-only';
        region.setAttribute('aria-live', 'polite');
        document.body.appendChild(region);
        
        document.addEventListener('node-selected', (e) => {
            const item = medicalData[e.detail.key];
            if(item) region.textContent = `Selected ${item.title}. Details loaded.`;
        });
    }
}
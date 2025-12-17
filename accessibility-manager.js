// accessibility-manager.js
class AccessibilityManager {
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
            }
            if (e.key === 'Escape') document.getElementById('searchResults')?.classList.remove('show');
        });
        this.addSkipLinks();
        this.setupLiveRegion();
    }

    addSkipLinks() {
        const div = document.createElement('div');
        div.innerHTML = `
            <a href="#detailPanel" class="skip-link">Skip to Diagnosis</a>
            <a href="#searchInput" class="skip-link">Skip to Search</a>
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
            if(item) region.textContent = `Selected ${item.title}`;
        });
    }
}
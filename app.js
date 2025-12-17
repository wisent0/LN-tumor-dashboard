// Main Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize zoom controls
    const treeContent = document.getElementById('treeContent');
    let zoomLevel = 1;
    const zoomStep = 0.15;
    const minZoom = 0.5;
    const maxZoom = 2;
    const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');

    function updateZoomDisplay() {
        zoomLevelDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
        treeContent.style.transform = `scale(${zoomLevel})`;
    }

    updateZoomDisplay();

    document.getElementById('zoomIn').addEventListener('click', () => {
        zoomLevel = Math.min(maxZoom, zoomLevel + zoomStep);
        updateZoomDisplay();
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        zoomLevel = Math.max(minZoom, zoomLevel - zoomStep);
        updateZoomDisplay();
    });

    document.getElementById('zoomReset').addEventListener('click', () => {
        zoomLevel = 1;
        updateZoomDisplay();
    });

    // Optional: Add mouse wheel zoom on tree panel
    const treePanel = document.getElementById('treePanel');
    treePanel.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
            zoomLevel = Math.max(minZoom, Math.min(maxZoom, zoomLevel + delta));
            updateZoomDisplay();
        }
    }, { passive: false });

    // Initialize managers
    const treeManager = new TreeManager(medicalData);
    const searchManager = new SearchManager(medicalData, treeManager);
    const accessibilityManager = new AccessibilityManager();
    
    // Render the tree
    treeManager.render(treeContent);
    
    // Setup accessibility
    accessibilityManager.setupKeyboardNavigation();
    accessibilityManager.addSkipToContentLink();
    
    // Handle node selection
    document.addEventListener('node-selected', (e) => {
        const key = e.detail.key;
        const item = medicalData[key];
        
        if (item) {
            const detailPanel = document.getElementById('detailPanel');
            detailPanel.innerHTML = `
                <div class="content-container">
                    <div class="detail-hero">
                        <div>
                            <h1 class="detail-title">${item.title}</h1>
                            <div class="detail-subtitle">
                                WHO 5th Edition Classification
                            </div>
                            <div class="tag-group">
                                ${item.tags.map(tag => {
                                    let type = 'cat';
                                    if (tag.includes('Grade')) type = 'grade';
                                    if (tag.includes('IHC')) type = 'ihc';
                                    return `<span class="tag ${type}">${tag}</span>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                    ${item.content}
                </div>
            `;
            
            // --- AUTO SCROLL LOGIC FOR MOBILE ---
            // If the user is on a mobile screen (width <= 768px)
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                // On laptop, just reset the scroll bar to the top
                detailPanel.scrollTop = 0;
            }
            // ------------------------------------
            
            // Announce the change for screen readers
            accessibilityManager.announce(`Loaded ${item.title} details`);
        }
    });

    // Click root node by default to load initial content
    setTimeout(() => {
        treeManager.selectNode('root');
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: 'root' } }));
    }, 100);
});
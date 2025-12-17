document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Managers
    const treeManager = new TreeManager(medicalData);
    const treeContainer = document.getElementById('treeContent'); // This is the .zoom-layer
    treeManager.render(treeContainer);

    const searchManager = new SearchManager(medicalData, treeManager);
    const accessibilityManager = new AccessibilityManager();
    accessibilityManager.setupKeyboardNavigation();

    // 2. Select Root by default
    setTimeout(() => {
        treeManager.selectNode('root');
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: 'root' } }));
    }, 100);

    // 3. Detail Panel Logic
    document.addEventListener('node-selected', (e) => {
        const key = e.detail.key;
        const item = medicalData[key];
        const detailPanel = document.getElementById('detailPanel');
        
        if (item) {
            detailPanel.innerHTML = `
                <div class="content-container">
                    <h2 class="detail-title">${item.title}</h2>
                    <div class="tag-group">
                        ${item.tags.map(tag => {
                            let type = 'gen';
                            if(tag.includes('+')) type = 'pos';
                            if(tag.includes('-')) type = 'neg';
                            return `<span class="tag ${type}">${tag}</span>`;
                        }).join('')}
                    </div>
                    ${item.content}
                </div>
            `;
            detailPanel.scrollTop = 0;
            accessibilityManager.announce(`Loaded ${item.title}`);
        }
    });

    // 4. ZOOM & PAN LOGIC
    let zoomLevel = 1.0;
    const zoomLayer = document.getElementById('treeContent');
    const zoomDisplay = document.getElementById('zoomLevelDisplay');

    function updateZoom() {
        zoomLayer.style.transform = `scale(${zoomLevel})`;
        zoomDisplay.innerText = `${Math.round(zoomLevel * 100)}%`;
    }

    document.getElementById('zoomIn').addEventListener('click', () => {
        zoomLevel += 0.1;
        updateZoom();
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
        zoomLevel = Math.max(0.4, zoomLevel - 0.1);
        updateZoom();
    });
    document.getElementById('zoomReset').addEventListener('click', () => {
        zoomLevel = 1.0;
        updateZoom();
    });

    // Mouse Wheel Zoom
    const treePanel = document.getElementById('treePanel');
    treePanel.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            zoomLevel = Math.max(0.4, Math.min(3.0, zoomLevel + delta));
            updateZoom();
        }
    });
});
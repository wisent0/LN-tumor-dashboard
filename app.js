document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Error Handling & Security Validation
    ErrorBoundary.init();
    if(!SecurityManager.validateDataStructure(medicalData)) {
        ErrorBoundary.showErrorToast('Data Error', 'Medical data structure is invalid.');
        return;
    }

    // 1. Initialize Managers
    const treeManager = new TreeManager(medicalData);
    const nodeLayer = document.getElementById('nodeLayer');
    const connectionLayer = document.getElementById('connectionLayer');
    
    // 2. Render
    treeManager.render(nodeLayer, connectionLayer);
    
    // 3. Setup accessibility & Search
    const accessibilityManager = new AccessibilityManager();
    accessibilityManager.setupKeyboardNavigation();
    
    const searchManager = new SearchManager(medicalData, treeManager);

    // 4. Zoom & Pan Logic
    let state = {
        scale: 0.9,
        panning: false,
        x: 0, y: 0,
        startX: 0, startY: 0
    };
    
    const wrapper = document.getElementById('canvasWrapper');
    const world = document.getElementById('canvasWorld');

    const centerMindMap = () => {
        state.x = wrapper.offsetWidth / 2;
        state.y = wrapper.offsetHeight / 2;
        state.scale = 0.9;
        updateTransform();
    };

    function updateTransform() {
        world.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
        document.getElementById('zoomLevelDisplay').innerText = `${Math.round(state.scale * 100)}%`;
    }

    // [Previous Event Listeners for Pan/Zoom remain the same]
    // ... Copy the Pan/Zoom event listeners from your original app.js here ...
    // Just ensure they use the `state` object defined above.

    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('mind-node')) return;
        state.panning = true;
        state.startX = e.clientX - state.x;
        state.startY = e.clientY - state.y;
        wrapper.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
        state.panning = false;
        wrapper.style.cursor = 'grab';
    });
    window.addEventListener('mousemove', (e) => {
        if (!state.panning) return;
        e.preventDefault();
        state.x = e.clientX - state.startX;
        state.y = e.clientY - state.startY;
        updateTransform();
    });
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        state.scale = Math.min(Math.max(AppConfig.layout.minZoom, state.scale * delta), AppConfig.layout.maxZoom);
        updateTransform();
    });

    // Button controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        state.scale = Math.min(state.scale * 1.2, AppConfig.layout.maxZoom);
        updateTransform();
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
        state.scale = Math.max(state.scale / 1.2, AppConfig.layout.minZoom);
        updateTransform();
    });
    document.getElementById('recenterBtn').addEventListener('click', centerMindMap);

    // Initial Center
    setTimeout(centerMindMap, 100);

    // 5. Secure Detail Panel Rendering
    document.addEventListener('node-selected', (e) => {
        const item = medicalData[e.detail.key];
        const detailPanel = document.getElementById('detailPanel');
        
        if (item) {
            // Use SecurityManager to sanitize content
            const content = SecurityManager.sanitizeHTML(item.content);
            const title = SecurityManager.sanitizeHTML(item.title);
            const tags = item.tags.map(tag => {
                let type = 'gen';
                if(tag.includes('+')) type = 'pos';
                if(tag.includes('-')) type = 'neg';
                return `<span class="tag ${type}">${SecurityManager.sanitizeHTML(tag)}</span>`;
            }).join('');

            detailPanel.innerHTML = `
                <div class="content-container">
                    <h2 class="detail-title">${title}</h2>
                    <div class="tag-group">${tags}</div>
                    <div class="medical-content">${content}</div>
                </div>
            `;
            detailPanel.scrollTop = 0;
        }
    });
});
// app.js
document.addEventListener('DOMContentLoaded', () => {
    try {
        ErrorBoundary.init();
        if (!SecurityManager.validateDataStructure(medicalData)) throw new Error("Data integrity check failed.");
        
        document.getElementById('versionDisplay').textContent = `v${medicalData.metadata.version}`;

        const treeManager = new TreeManager(medicalData);
        const nodeLayer = document.getElementById('nodeLayer');
        const connectionLayer = document.getElementById('connectionLayer');
        treeManager.render(nodeLayer, connectionLayer);

        const a11y = new AccessibilityManager();
        a11y.setupKeyboardNavigation();
        new SearchManager(medicalData, treeManager);

        // --- Zoom/Pan Logic ---
        let state = { scale: 0.9, x: 0, y: 0, panning: false, startX:0, startY:0 };
        const wrapper = document.getElementById('canvasWrapper');
        const world = document.getElementById('canvasWorld');

        const updateTransform = () => {
            requestAnimationFrame(() => {
                world.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
                document.getElementById('zoomLevelDisplay').textContent = `${Math.round(state.scale*100)}%`;
            });
        };
        
        // Initial Center
        state.x = wrapper.offsetWidth / 2; 
        state.y = wrapper.offsetHeight / 2;
        updateTransform();

        // Mouse Events
        wrapper.addEventListener('mousedown', e => {
            if(e.target.closest('.mind-node')) return;
            state.panning = true;
            state.startX = e.clientX - state.x;
            state.startY = e.clientY - state.y;
            wrapper.style.cursor = 'grabbing';
        });
        window.addEventListener('mouseup', () => { state.panning = false; wrapper.style.cursor = 'grab'; });
        window.addEventListener('mousemove', e => {
            if(!state.panning) return;
            state.x = e.clientX - state.startX;
            state.y = e.clientY - state.startY;
            updateTransform();
        });
        
        // Wheel Zoom
        wrapper.addEventListener('wheel', e => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1.1 : 0.9;
            state.scale = Math.min(Math.max(AppConfig.layout.minZoom, state.scale * delta), AppConfig.layout.maxZoom);
            updateTransform();
        });

        // --- CRITICAL FIX: Zoom Button Event Listeners ---
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const recenterBtn = document.getElementById('recenterBtn');

        if (zoomInBtn) zoomInBtn.addEventListener('click', () => {
            state.scale = Math.min(state.scale * 1.2, AppConfig.layout.maxZoom);
            updateTransform();
        });

        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => {
            state.scale = Math.max(state.scale / 1.2, AppConfig.layout.minZoom);
            updateTransform();
        });

        if (recenterBtn) recenterBtn.addEventListener('click', () => {
             state.x = wrapper.offsetWidth / 2;
             state.y = wrapper.offsetHeight / 2;
             state.scale = 0.9;
             updateTransform();
        });

        // Detail Panel Rendering
        document.addEventListener('node-selected', (e) => {
            const item = medicalData[e.detail.key];
            const panel = document.getElementById('detailPanel');
            if (item) {
                // Determine color based on config (Fixes data/config conflict)
                const branchColor = AppConfig.branches[item.branchId]?.color || '#666';
                
                panel.innerHTML = `
                    <div class="content-container" style="border-top: 4px solid ${SecurityManager.sanitizeColor(branchColor)}">
                        <h2 class="detail-title">${SecurityManager.sanitizeHTML(item.title)}</h2>
                        <div class="tag-group">${(item.tags||[]).map(t => `<span class="tag">${SecurityManager.sanitizeHTML(t)}</span>`).join('')}</div>
                        <div class="medical-content">${SecurityManager.sanitizeHTML(item.content)}</div>
                    </div>`;
                panel.scrollTop = 0;
                
                // Accessibility Focus
                panel.focus();
            }
        });

    } catch (e) {
        console.error(e);
        if(window.ErrorBoundary) ErrorBoundary.showErrorToast("Init Error", e.message);
    }
});
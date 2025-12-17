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

        new AccessibilityManager().setupKeyboardNavigation();
        new SearchManager(medicalData, treeManager);

        // Zoom/Pan Logic
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
        wrapper.addEventListener('wheel', e => {
            e.preventDefault();
            state.scale = Math.min(Math.max(0.3, state.scale * (e.deltaY < 0 ? 1.1 : 0.9)), 3);
            updateTransform();
        });
        document.getElementById('recenterBtn').addEventListener('click', () => {
             state.x = wrapper.offsetWidth / 2;
             state.y = wrapper.offsetHeight / 2;
             state.scale = 0.9;
             updateTransform();
        });

        // Detail Panel
        document.addEventListener('node-selected', (e) => {
            const item = medicalData[e.detail.key];
            const panel = document.getElementById('detailPanel');
            if (item) {
                panel.innerHTML = `
                    <div class="content-container">
                        <h2 class="detail-title">${SecurityManager.sanitizeHTML(item.title)}</h2>
                        <div class="tag-group">${(item.tags||[]).map(t => `<span class="tag">${SecurityManager.sanitizeHTML(t)}</span>`).join('')}</div>
                        <div class="medical-content">${SecurityManager.sanitizeHTML(item.content)}</div>
                    </div>`;
                panel.scrollTop = 0;
            }
        });

    } catch (e) {
        console.error(e);
        if(window.ErrorBoundary) ErrorBoundary.showErrorToast("Init Error", e.message);
    }
});
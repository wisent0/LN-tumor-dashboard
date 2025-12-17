document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Managers
    const treeManager = new TreeManager(medicalData);
    const nodeLayer = document.getElementById('nodeLayer');
    const connectionLayer = document.getElementById('connectionLayer');
    const wrapper = document.getElementById('canvasWrapper');
    const world = document.getElementById('canvasWorld');

    treeManager.render(nodeLayer, connectionLayer);

    // 2. Pan & Zoom State
    let state = {
        scale: 0.8,
        x: wrapper.offsetWidth / 2,
        y: wrapper.offsetHeight / 2,
        isDragging: false,
        startX: 0, startY: 0
    };

    const updateTransform = () => {
        world.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
        document.getElementById('zoomLevelDisplay').innerText = `${Math.round(state.scale * 100)}%`;
    };

    // Center on load
    updateTransform();

    // 3. Interactions
    document.getElementById('zoomIn').onclick = () => { state.scale *= 1.2; updateTransform(); };
    document.getElementById('zoomOut').onclick = () => { state.scale /= 1.2; updateTransform(); };
    document.getElementById('recenterBtn').onclick = () => {
        state.scale = 0.8;
        state.x = wrapper.offsetWidth / 2;
        state.y = wrapper.offsetHeight / 2;
        updateTransform();
    };

    // Drag Logic
    wrapper.onmousedown = (e) => {
        if(e.target.classList.contains('mind-node')) return;
        state.isDragging = true;
        state.startX = e.clientX - state.x;
        state.startY = e.clientY - state.y;
        wrapper.style.cursor = 'grabbing';
    };
    
    window.onmousemove = (e) => {
        if(!state.isDragging) return;
        e.preventDefault();
        state.x = e.clientX - state.startX;
        state.y = e.clientY - state.startY;
        updateTransform();
    };
    
    window.onmouseup = () => { state.isDragging = false; wrapper.style.cursor = 'grab'; };

    // Scroll Zoom
    wrapper.onwheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        state.scale *= delta;
        updateTransform();
    };

    // 4. Search & Accessibility
    new SearchManager(medicalData, treeManager);
    new AccessibilityManager().setupKeyboardNavigation();

    // 5. Detail Panel Logic
    document.addEventListener('node-selected', (e) => {
        const item = medicalData[e.detail.key];
        const detailPanel = document.getElementById('detailPanel');
        
        if(item) {
            // Check if content is already formatted in boxes (starts with div) or needs wrapping
            let contentHtml = item.content;
            
            // If it's the old format (just text/ul), wrap it in a generic box
            if(!contentHtml.trim().startsWith('<div')) {
                contentHtml = `<div class="detail-box box-diagnosis"><h3>Details</h3>${contentHtml}</div>`;
            }

            detailPanel.innerHTML = `
                <div class="content-container">
                    <h2 class="detail-title">${item.title}</h2>
                    <div class="tag-group">
                        ${item.tags.map(t => {
                            let type = 'gen';
                            if(t.includes('+')) type = 'pos';
                            if(t.includes('-')) type = 'neg';
                            return `<span class="tag ${type}">${t}</span>`;
                        }).join('')}
                    </div>
                    ${contentHtml}
                </div>`;
            detailPanel.scrollTop = 0;
        }
    });
});
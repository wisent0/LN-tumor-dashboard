document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize
    const treeManager = new TreeManager(medicalData);
    const nodeLayer = document.getElementById('nodeLayer');
    const connLayer = document.getElementById('connectionLayer');
    const wrapper = document.getElementById('canvasWrapper');
    const world = document.getElementById('canvasWorld');

    treeManager.render(nodeLayer, connLayer);

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
        document.getElementById('zoomLevelDisplay').innerText = `${Math.round(state.scale*100)}%`;
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

    wrapper.onwheel = (e) => {
        e.preventDefault();
        state.scale *= e.deltaY > 0 ? 0.9 : 1.1;
        updateTransform();
    };

    // 4. Search & Details
    new SearchManager(medicalData, treeManager);
    new AccessibilityManager().setupKeyboardNavigation();

    document.addEventListener('node-selected', (e) => {
        const item = medicalData[e.detail.key];
        if(item) {
            document.getElementById('detailPanel').innerHTML = `
                <div class="content-container">
                    <h2 class="detail-title">${item.title}</h2>
                    <div class="tag-group">${item.tags.map(t => `<span class="tag gen">${t}</span>`).join('')}</div>
                    ${item.content}
                </div>`;
        }
    });
});
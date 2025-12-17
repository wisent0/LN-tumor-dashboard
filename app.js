document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Managers
    const treeManager = new TreeManager(medicalData);
    const nodeLayer = document.getElementById('nodeLayer');
    const connectionLayer = document.getElementById('connectionLayer');
    
    treeManager.render(nodeLayer, connectionLayer);

    const searchManager = new SearchManager(medicalData, treeManager);
    const accessibilityManager = new AccessibilityManager();
    accessibilityManager.setupKeyboardNavigation();

    // 2. PAN & ZOOM LOGIC
    const wrapper = document.getElementById('canvasWrapper');
    const world = document.getElementById('canvasWorld');
    
    let state = {
        scale: 0.8,      // Start slightly zoomed out to see structure
        panning: false,
        pointX: 0,
        pointY: 0,
        startX: 0,
        startY: 0,
        x: wrapper.offsetWidth / 2, // Start centered
        y: wrapper.offsetHeight / 2
    };

    function updateTransform() {
        world.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
        document.getElementById('zoomLevelDisplay').innerText = `${Math.round(state.scale * 100)}%`;
    }
    
    // Set Initial Center
    updateTransform();

    // Mouse Down (Start Pan)
    wrapper.addEventListener('mousedown', (e) => {
        state.panning = true;
        state.startX = e.clientX - state.x;
        state.startY = e.clientY - state.y;
        wrapper.style.cursor = 'grabbing';
    });

    // Mouse Up (End Pan)
    window.addEventListener('mouseup', () => {
        state.panning = false;
        wrapper.style.cursor = 'grab';
    });

    // Mouse Move (Pan)
    window.addEventListener('mousemove', (e) => {
        if (!state.panning) return;
        e.preventDefault();
        state.x = e.clientX - state.startX;
        state.y = e.clientY - state.startY;
        updateTransform();
    });

    // Wheel (Zoom)
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const xs = (e.clientX - state.x) / state.scale;
        const ys = (e.clientY - state.y) / state.scale;
        const delta = -e.deltaY;

        (delta > 0) ? (state.scale *= 1.1) : (state.scale /= 1.1);
        
        // Limits
        state.scale = Math.min(Math.max(0.1, state.scale), 4);

        state.x = e.clientX - xs * state.scale;
        state.y = e.clientY - ys * state.scale;

        updateTransform();
    });

    // Zoom Buttons
    document.getElementById('zoomIn').addEventListener('click', () => {
        state.scale *= 1.2;
        updateTransform();
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
        state.scale /= 1.2;
        updateTransform();
    });
    document.getElementById('recenterBtn').addEventListener('click', () => {
        state.scale = 0.8;
        state.x = wrapper.offsetWidth / 2;
        state.y = wrapper.offsetHeight / 2;
        updateTransform();
    });

    // 3. Select Root Default
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: 'root' } }));
    }, 100);

    // 4. Detail Panel Update
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
});
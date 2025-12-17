document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Managers
    const treeManager = new TreeManager(medicalData);
    const nodeLayer = document.getElementById('nodeLayer');
    const connectionLayer = document.getElementById('connectionLayer');
    
    // 2. Get wrapper and world elements
    const wrapper = document.getElementById('canvasWrapper');
    const world = document.getElementById('canvasWorld');
    
    // 3. Initial render
    treeManager.render(nodeLayer, connectionLayer);
    
    // 4. Setup accessibility
    const accessibilityManager = new AccessibilityManager();
    accessibilityManager.setupKeyboardNavigation();
    
    // 5. Setup search
    const searchManager = new SearchManager(medicalData, treeManager);

    // 6. PAN & ZOOM LOGIC
    let state = {
        scale: 1,
        panning: false,
        pointX: 0,
        pointY: 0,
        startX: 0,
        startY: 0,
        x: wrapper.offsetWidth / 2,
        y: wrapper.offsetHeight / 2
    };

    // Center the mind map initially
    const centerMindMap = () => {
        state.scale = 1;
        state.x = wrapper.offsetWidth / 2;
        state.y = wrapper.offsetHeight / 2;
        updateTransform();
    };

    function updateTransform() {
        // Center the world properly
        const transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
        world.style.transform = transform;
        document.getElementById('zoomLevelDisplay').innerText = `${Math.round(state.scale * 100)}%`;
    }

    // Set initial center
    setTimeout(centerMindMap, 100);

    // Mouse Down (Start Pan)
    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('mind-node')) return;
        
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
        
        // Get mouse position relative to wrapper
        const rect = wrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Convert to world coordinates
        const worldX = (mouseX - state.x) / state.scale;
        const worldY = (mouseY - state.y) / state.scale;
        
        // Calculate zoom
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        state.scale *= delta;
        
        // Limit zoom
        state.scale = Math.min(Math.max(0.3, state.scale), 3);
        
        // Adjust pan to zoom around mouse
        state.x = mouseX - worldX * state.scale;
        state.y = mouseY - worldY * state.scale;
        
        updateTransform();
    });

    // Zoom Buttons
    document.getElementById('zoomIn').addEventListener('click', () => {
        state.scale *= 1.2;
        state.scale = Math.min(state.scale, 3);
        updateTransform();
    });
    
    document.getElementById('zoomOut').addEventListener('click', () => {
        state.scale /= 1.2;
        state.scale = Math.max(state.scale, 0.3);
        updateTransform();
    });
    
    document.getElementById('recenterBtn').addEventListener('click', centerMindMap);

    // 7. Select Root by Default
    setTimeout(() => {
        treeManager.selectNode('root');
        document.dispatchEvent(new CustomEvent('node-selected', { detail: { key: 'root' } }));
    }, 200);

    // 8. Detail Panel Update
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

    // 9. Handle window resize
    window.addEventListener('resize', () => {
        // Re-center on resize
        state.x = wrapper.offsetWidth / 2;
        state.y = wrapper.offsetHeight / 2;
        updateTransform();
    });
});
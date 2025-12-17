document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Tree
    const treeManager = new TreeManager(medicalData);
    const treeContainer = document.getElementById('treeContent');
    treeManager.render(treeContainer);

    // 2. Select Root by default to fix "Blank Screen"
    setTimeout(() => {
        treeManager.handleNodeClick('root');
    }, 100);

    // 3. Listen for selection to update Details
    document.addEventListener('node-selected', (e) => {
        const key = e.detail.key;
        const item = medicalData[key];
        const detailPanel = document.getElementById('detailPanel');
        
        if (item) {
            detailPanel.innerHTML = `
                <div class="content-container">
                    <h2 class="detail-title">${item.title}</h2>
                    <div style="margin-bottom:15px;">
                        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    ${item.content}
                </div>
            `;
        }
    });

    // 4. Zoom Controls
    let zoom = 1;
    document.getElementById('zoomIn').addEventListener('click', () => {
        zoom += 0.1;
        treeContainer.style.transform = `scale(${zoom})`;
        document.getElementById('zoomLevelDisplay').innerText = Math.round(zoom*100) + '%';
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
        zoom = Math.max(0.5, zoom - 0.1);
        treeContainer.style.transform = `scale(${zoom})`;
        document.getElementById('zoomLevelDisplay').innerText = Math.round(zoom*100) + '%';
    });
});
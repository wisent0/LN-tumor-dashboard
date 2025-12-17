[file name]: data.js
[file content begin]
// Lymphoma Data Module - Comprehensive WHO 5th Ed (2022)
// Citations: Alaggio et al. Leukemia 2022; Swerdlow et al. WHO Blue Book.

const medicalData = {
    root: {
        title: "Lymphoma Triage",
        tags: ["WHO 5th Ed"],
        color: "var(--c-root)",
        content: `
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">Diagnostic Approach</div>
                    <div class="card-body">
                        <p>The <b>WHO 5th Edition (2022)</b> classifies lymphoid neoplasms using a multiparametric approach:</p>
                        <ul>
                            <li><b>Morphology:</b> Cell size (Small/Large), Nuclear shape (Cleaved/Round), Pattern (Follicular/Diffuse).</li>
                            <li><b>Immunophenotype:</b> B-cell (CD19/20/79a), T-cell (CD3/5), NK-cell (CD56).</li>
                            <li><b>Genetics:</b> Essential for definition (e.g., <i>MYC</i>, <i>BCL2</i>, <i>ALK</i>, <i>BRAF</i>).</li>
                            <li><b>Clinical:</b> Nodal vs Extranodal vs Cutaneous vs Leukemic.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="reference-section">
                <div class="ref-title">Primary Reference</div>
                <p>Alaggio R, et al. The 5th Edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia.</i> 2022 Jul;36(7):1720-1748.</p>
            </div>
        `
    },

    // ===============================================
    // 1. MATURE B-CELL NEOPLASMS
    // ===============================================
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+", "PAX5+"], color: "var(--c-cat)", content: "<div>Neoplasms of mature B-cells. Includes Pre-GC, Germinal Center, and Post-GC/Memory B-cells.</div>" },

    // --- SMALL B-CELL (Indolent) ---
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<div><b>Differential Diagnosis:</b><br>CD5+ (CLL, Mantle)<br>CD10+ (Follicular)<br>CD5-/CD10- (Marginal, LPL, Hairy Cell)</div>" },
    
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Morphology:</b> Small lymphocytes, clumped chromatin ("soccer ball"), proliferation centers (pathognomonic).</li><li><b>IHC Pos:</b> CD5, CD23, LEF1, CD200 (Bright), CD20 (Dim).</li><li><b>IHC Neg:</b> Cyclin D1, FMC7, CD10.</li><li><b>Genetics:</b> del(13q) (good), del(17p)/TP53 (bad).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    mantle: {
        title: "Mantle Cell (MCL)",
        tags: ["CD5+", "CycD1+", "SOX11+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC Pos:</b> CD5, Cyclin D1 (Nuclear), SOX11, CD20 (Bright).</li><li><b>IHC Neg:</b> CD23, CD200, CD10.</li><li><b>Genetics:</b> t(11;14)(q13;q32) <i>CCND1::IGH</i>.</li><li><b>Variants:</b> Blastoid/Pleomorphic (High Grade), Leukemic Non-Nodal (Indolent, often SOX11-).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    follicular: {
        title: "Follicular (FL)",
        tags: ["CD10+", "BCL2+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC Pos:</b> CD10, BCL6, BCL2, HGAL, LMO2.</li><li><b>IHC Neg:</b> CD5, Cyclin D1.</li><li><b>Genetics:</b> t(14;18) <i>BCL2::IGH</i> (90%).</li><li><b>Grading:</b> Based on centroblast count (1-3A: Low grade, 3B: High grade).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    marginal: {
        title: "Marginal Zone (MZL)",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Types</div><div class="card-body">1. <b>Extranodal (MALT):</b> H. pylori (Gastric), t(11;18).<br>2. <b>Nodal:</b> Monocytoid B-cells.<br>3. <b>Splenic:</b> Villous lymphocytes, intrasinusoidal growth.</div></div><div class="card"><div class="card-header">IHC Profile</div><div class="card-body">CD20+, BCL2+. <b>Negative for:</b> CD5, CD10, CD23, Cyclin D1. (Diagnosis of exclusion).</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    lpl: {
        title: "Lymphoplasmacytic (LPL)",
        tags: ["MYD88", "IgM"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Waldenström Macroglobulinemia (IgM spike).</li><li><b>Micro:</b> Small lymphs, plasmacytoid lymphs, plasma cells, Dutcher bodies.</li><li><b>Genetics:</b> <i>MYD88</i> L265P (>90%).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    hairy: {
        title: "Hairy Cell Leukemia",
        tags: ["BRAF V600E", "CD103+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> "Fried egg" appearance in BM, "Hairy" projections.</li><li><b>IHC Pos:</b> CD103, CD25, CD11c, Annexin A1, Cyclin D1 (Weak).</li><li><b>Genetics:</b> <i>BRAF</i> V600E mutation (100%).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- AGGRESSIVE B-CELL ---
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<div>Large cells, diffuse growth, high Ki67.</div>" },
    dlbcl: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Classification</div><div class="card-body"><b>Cell of Origin (Hans Algorithm):</b><br>1. CD10+ (GCB)<br>2. CD10-/BCL6- (ABC)<br>3. CD10-/BCL6+/MUM1+ (ABC)<br>4. CD10-/BCL6+/MUM1- (GCB)</div></div><div class="card"><div class="card-header">Molecular</div><div class="card-body">Check MYC and BCL2 by IHC ("Double Expressor"). Check t(14;18) and 3q27 (BCL6).</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    hgbl: {
        title: "High Grade B-Cell (HGBL)",
        tags: ["Double Hit"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">HGBL with Rearrangements</div><div class="card-body"><b>"Double Hit":</b> Concurrent <i>MYC</i> and <i>BCL2</i> translocations (FISH required). Aggressive course.</div></div><div class="card"><div class="card-header">HGBL-11q</div><div class="card-body">Resembles Burkitt but lacks MYC rearrangement. Has 11q aberrations.</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["t(8;14)", "MYC"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> "Starry Sky", squared-off nuclei, lipid vacuoles.</li><li><b>IHC:</b> CD10+, BCL6+, BCL2 (-), Ki67 ~100%.</li><li><b>Genetics:</b> <i>MYC</i> translocation t(8;14).</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], color: "var(--c-cat)", content: "<div>Terminally differentiated B-cells.</div>" },
    myeloma: {
        title: "Plasma Cell Myeloma",
        tags: ["CRAB"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnostic Criteria</div><div class="card-body">Clonal marrow plasma cells >10% OR Plasmacytoma + <b>CRAB</b> (HyperCalcemia, Renal, Anemia, Bone lesions).</div></div><div class="card"><div class="card-header">IHC</div><div class="card-body">CD138+, CD38+, MUM1+, CD56 (Aberrant). Cyto Kappa/Lambda restriction.</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },

    // ===============================================
    // 2. MATURE T-CELL NEOPLASMS
    // ===============================================
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+"], color: "var(--c-cat)", content: "<div>Post-thymic T-cells. Often show loss of pan-T antigens (CD5/7).</div>" },

    // --- NODAL T-CELL ---
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Aggressive"], color: "var(--c-cat)", content: "<div>Primary involvement of lymph nodes.</div>" },
    ptcl: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Diagnosis of exclusion. CD4+ usually. Variable loss of CD5/CD7. Heterogeneous morphology. Poor prognosis.</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    aitl: {
        title: "Angioimmunoblastic (nTFH)",
        tags: ["TFH", "CD10+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Features</div><div class="card-body">Clear cells, High Endothelial Venules (HEV), FDC meshwork expansion. EBV+ B-cells in background.</div></div><div class="card"><div class="card-header">TFH Markers</div><div class="card-body">CD10+, BCL6+, PD1+, CXCL13+, ICOS+.</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    alcl: {
        title: "ALCL (Anaplastic)",
        tags: ["CD30+", "Hallmark"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Large "Hallmark" cells (kidney nuclei), sinusoidal.</li><li><b>IHC:</b> CD30 (Strong/Diffuse), EMA+. CD3 (-/variable).</li><li><b>ALK+:</b> t(2;5) <i>NPM1::ALK</i>. Young patients. Good prognosis.</li><li><b>ALK-:</b> Older patients. Worse prognosis.</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- CUTANEOUS T-CELL ---
    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], color: "var(--c-cat)", content: "<div>Primary skin involvement.</div>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Cerebriform nuclei. Pautrier microabscesses. Epidermotropism. <br><b>IHC:</b> CD3+, CD4+, CD8-, CD7- (loss is early sign).</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Leukemic"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Triad</div><div class="card-body">1. Erythroderma.<br>2. Generalized Lymphadenopathy.<br>3. Circulating Sézary cells (Clone in blood).</div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },

    // ===============================================
    // 3. HODGKIN LYMPHOMA
    // ===============================================
    hodgkin_cat: { title: "Hodgkin", tags:["Reed-Sternberg"], color: "var(--c-cat)", content: "<div>Defined by RS cells in inflammatory background.</div>" },
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>RS Cells:</b> Binucleate, inclusion-like nucleoli.</li><li><b>IHC Pos:</b> CD30 (Golgi/Membrane), CD15, PAX5 (Dim), MUM1.</li><li><b>IHC Neg:</b> CD45, CD20 (usually), CD3, EMA.</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>LP Cells:</b> "Popcorn" cells (multilobated).</li><li><b>IHC Pos:</b> CD20 (Strong), CD45, OCT2, BOB1, BCL6.</li><li><b>IHC Neg:</b> CD30, CD15.</li><li><b>Note:</b> Preserves B-cell program. T-cell rosettes (PD1+) surround tumor cells.</li></ul></div></div></div><div class="reference-section"><p>WHO 5th Ed (2022).</p></div>`
    }
};
[file content end]
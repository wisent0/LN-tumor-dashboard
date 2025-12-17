// Lymphoma Data Module
// Source: WHO Classification of Haematolymphoid Tumours (5th Ed, 2022)

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
                        <p><b>WHO 5th Edition (2022) Classification:</b></p>
                        <ul>
                            <li><b>Lineage:</b> B-Cell (CD20) vs T-Cell (CD3).</li>
                            <li><b>Size:</b> Small (Indolent) vs Large (Aggressive).</li>
                            <li><b>Genetics:</b> Driven by specific translocations (e.g., MYC, BCL2).</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="reference-section">
                <div class="ref-title">Reference</div>
                <p>Alaggio, R., et al. "The 5th Edition of the WHO Classification of Haematolymphoid Tumours." <i>Leukemia</i> 36 (2022).</p>
            </div>
        `
    },

    // --- 1. MATURE B-CELL ---
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+"], color: "var(--c-cat)", content: "<div>Mature B-cell neoplasms.</div>" },
    
    // Indolent
    small_b_cat: { title: "Indolent / Small Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<div>Small cell size, low proliferation.</div>" },
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Markers:</b> CD5(+), CD23(+), LEF1(+), CD200(+).</li><li><b>Negative:</b> Cyclin D1, FMC7, CD10.</li><li><b>Pathology:</b> Proliferation centers (pseudofollicles).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    mantle: {
        title: "Mantle Cell",
        tags: ["Cyclin D1+", "SOX11"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Markers:</b> CD5(+), Cyclin D1(+), SOX11(+).</li><li><b>Negative:</b> CD23, CD10.</li><li><b>Genetics:</b> t(11;14) <i>CCND1::IGH</i>.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    follicular: {
        title: "Follicular",
        tags: ["BCL2+", "CD10+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Markers:</b> CD10(+), BCL6(+), BCL2(+), HGAL(+).</li><li><b>Genetics:</b> t(14;18) <i>BCL2::IGH</i>.</li><li><b>Grading:</b> Based on centroblast count (Grade 1-3A/3B).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    marginal: {
        title: "Marginal Zone",
        tags: ["MALT", "Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Markers:</b> CD20(+), BCL2(+).</li><li><b>Negative:</b> CD5, CD10, Cyclin D1.</li><li><b>Sites:</b> Stomach (H. pylori), Salivary Gland, Lung.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    lpl: {
        title: "Lymphoplasmacytic",
        tags: ["MYD88", "Waldenström"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Genetics:</b> <i>MYD88</i> L265P mutation (>90%).</li><li><b>Clinical:</b> IgM Paraprotein spike.</li><li><b>Micro:</b> Plasmacytoid lymphocytes, Dutcher bodies.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },

    // Aggressive
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<div>Large cells, rapid growth.</div>" },
    dlbcl: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Hans Algorithm</div><div class="card-body">Used to determine Cell of Origin (COO):<br>1. CD10 (+) &rarr; GCB.<br>2. CD10 (-) / BCL6 (-) &rarr; ABC.<br>3. CD10 (-) / BCL6 (+) / MUM1 (+) &rarr; ABC.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["Starry Sky", "MYC"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Markers:</b> CD10(+), BCL6(+), BCL2(-), Ki67 (~100%).</li><li><b>Genetics:</b> <i>MYC</i> translocation t(8;14). Simple karyotype.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    hgbl: {
        title: "High Grade B-Cell",
        tags: ["Double Hit"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition</div><div class="card-body"><b>HGBL with MYC and BCL2 rearrangements:</b> The classic "Double Hit". Aggressive behavior. Requires FISH for diagnosis.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- 2. T-CELL ---
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+"], color: "var(--c-cat)", content: "<div>Post-thymic T-cell neoplasms.</div>" },
    ptcl: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">"Wastebasket" diagnosis. CD4(+) usually. Loss of CD5 or CD7 is common.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    alcl: {
        title: "ALCL",
        tags: ["CD30+", "Hallmark Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Large cells with kidney-shaped nuclei ("Hallmark cells"). Strong CD30(+). ALK(+) confers better prognosis.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    aitl: {
        title: "Angioimmunoblastic (nTFH)",
        tags: ["CD10+", "PD1+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">New Name</div><div class="card-body"><b>Nodal TFH cell lymphoma, angioimmunoblastic-type.</b></div></div><div class="card"><div class="card-header">Markers</div><div class="card-body">CD10(+), BCL6(+), PD1(+), CXCL13(+). Expanded FDC meshworks.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- 3. HODGKIN ---
    hodgkin_cat: { title: "Hodgkin", tags:["Reed-Sternberg"], color: "var(--c-cat)", content: "<div>Classic Hodgkin Lymphoma.</div>" },
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Reed-Sternberg cells. CD30(+), CD15(+), PAX5(dim). CD45(-).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">"Popcorn" cells. CD20(+), CD45(+), OCT2(+). CD30(-).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    },

    // --- 4. PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], color: "var(--c-cat)", content: "<div>Terminally differentiated B-cells.</div>" },
    myeloma: {
        title: "Myeloma",
        tags: ["CRAB"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Clonal plasma cells + <b>CRAB</b> (Calcium, Renal, Anemia, Bone). CD138(+), CD38(+), MUM1(+).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022).</p></div>`
    }
};
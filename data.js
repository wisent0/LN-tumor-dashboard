// Lymphoma Data Module - Comprehensive WHO 5th Ed (2022)
// APA Reference Style implemented.

const medicalData = {
    root: {
        title: "Lymphoma Triage",
        tags: ["WHO 5th Ed", "2022"],
        color: "var(--c-root)",
        content: `
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">Diagnostic Approach</div>
                    <div class="card-body">
                        <p>The <b>WHO 5th Edition (2022)</b> classifies lymphoid neoplasms using a multiparametric approach involving morphology, immunophenotype, genetics, and clinical features.</p>
                        <ul>
                            <li><b>Precursor vs. Mature:</b> Blasts (TdT+) vs. Peripheral cells.</li>
                            <li><b>Lineage:</b> B-cell (PAX5/CD19), T-cell (CD3), NK-cell (CD56).</li>
                            <li><b>Architecture:</b> Follicular, Diffuse, Intrasinusoidal, etc.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="reference-section">
                <div class="ref-title">Primary Reference</div>
                <p>Alaggio, R., Amador, C., Anagnostopoulos, I., et al. (2022). The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, <i>36</i>(7), 1720–1748. https://doi.org/10.1038/s41375-022-01620-2</p>
            </div>
        `
    },

    // ===============================================
    // 1. PRECURSOR LYMPHOID NEOPLASMS
    // ===============================================
    precursor_cat: { title: "Precursor Neoplasms", tags:["Blasts", "TdT+"], color: "var(--c-cat)", content: "<div>Neoplasms of lymphoblasts (B or T lineage). Distingushed by expression of TdT and CD34.</div>" },
    
    b_all: {
        title: "B-Lymphoblastic Leukemia/Lymphoma (B-ALL)",
        tags: ["TdT+", "CD19+", "CD10+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Morphology:</b> Monomorphous blasts, high N:C ratio, dispersed chromatin, inconspicuous nucleoli.</li><li><b>IHC Pos:</b> TdT, CD19, CD79a, CD10, PAX5, CD34.</li><li><b>IHC Neg:</b> Surface Ig, CD3, MPO.</li><li><b>Genetics:</b> <i>BCR::ABL1</i>, <i>KMT2A</i> rearrangements, or Hypodiploidy.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). The 5th edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    t_all: {
        title: "T-Lymphoblastic Leukemia/Lymphoma (T-ALL)",
        tags: ["TdT+", "CD3+", "Mediastinal"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Often mediastinal mass in adolescents/young adults.</li><li><b>IHC Pos:</b> TdT, CD3 (cyto), CD7, CD5, CD1a, CD99.</li><li><b>IHC Neg:</b> CD20, MPO.</li><li><b>Genetics:</b> <i>NOTCH1</i> mutations, <i>TLX1</i> or <i>TLX3</i> rearrangements.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). The 5th edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // ===============================================
    // 2. MATURE B-CELL NEOPLASMS
    // ===============================================
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+", "PAX5+"], color: "var(--c-cat)", content: "<div>Neoplasms of mature B-cells. Includes Pre-GC, Germinal Center, and Post-GC/Memory B-cells.</div>" },

    // --- SMALL B-CELL ---
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<div><b>Differential:</b> CD5+ (CLL, MCL), CD10+ (FL), CD5-/CD10- (MZL, LPL).</div>" },
    
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Proliferation centers (pseudofollicles) with paraimmunoblasts.</li><li><b>IHC:</b> CD5+, CD23+, LEF1+, CD200 (bright). Cyclin D1 (-).</li><li><b>Genetics:</b> del(13q), del(11q), del(17p).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). The 5th edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    mantle: {
        title: "Mantle Cell (MCL)",
        tags: ["CD5+", "CycD1+", "t(11;14)"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD5+, Cyclin D1+, SOX11+, CD23(-).</li><li><b>Genetics:</b> t(11;14) <i>CCND1::IGH</i>.</li><li><b>Variants:</b> Blastoid (high grade), Pleomorphic, Leukemic non-nodal (indolent).</li></ul></div></div></div><div class="reference-section"><p>Swerdlow, S. H., et al. (2017). WHO classification of tumours of haematopoietic and lymphoid tissues (Revised 4th ed.). IARC.</p></div>`
    },
    follicular: {
        title: "Follicular (FL)",
        tags: ["CD10+", "BCL2+", "t(14;18)"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD10+, BCL6+, BCL2+, HGAL+, LMO2+.</li><li><b>Genetics:</b> t(14;18) <i>BCL2::IGH</i>.</li><li><b>Types:</b> Classic FL, FL with blastoid features, Duodenal-type FL (indolent).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    marginal: {
        title: "Marginal Zone (MZL)",
        tags: ["MALT", "Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Subtypes</div><div class="card-body"><ul><li><b>MALT:</b> Extranodal, associated with chronic inflammation (H. pylori).</li><li><b>Nodal:</b> Diagnosis of exclusion.</li><li><b>Splenic:</b> Villous lymphocytes, intrasinusoidal growth, CD103(-).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    lpl: {
        title: "Lymphoplasmacytic (LPL)",
        tags: ["MYD88", "IgM", "Waldenström"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Features</div><div class="card-body"><ul><li><b>Micro:</b> Plasmacytoid lymphocytes, Dutcher bodies.</li><li><b>IHC:</b> CD20+, CD138+ (plasma cells), CD5-, CD10-.</li><li><b>Genetics:</b> <i>MYD88</i> L265P mutation (>90%).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    hairy: {
        title: "Hairy Cell Leukemia",
        tags: ["BRAF V600E", "CD103+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD103+, CD25+, CD11c+, Annexin A1+, Cyclin D1 (weak).</li><li><b>Genetics:</b> <i>BRAF</i> V600E (100% of classic HCL).</li><li><b>Note:</b> HCL-variant is now "Splenic B-cell lymphoma/leukemia with prominent nucleoli".</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // --- AGGRESSIVE B-CELL ---
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<div>Large cells, diffuse architecture, high proliferation index.</div>" },
    
    dlbcl: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Hans Algorithm</div><div class="card-body">1. CD10+ (GCB) <br>2. CD10-/BCL6- (ABC) <br>3. CD10-/BCL6+/MUM1+ (ABC)</div></div><div class="card"><div class="card-header">Markers</div><div class="card-body">CD20+, CD79a+, PAX5+. Ki67 typically >40%. Check MYC/BCL2 ("Double Expressor").</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    hgbl: {
        title: "High Grade B-Cell",
        tags: ["Double Hit", "11q"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Subtypes</div><div class="card-body"><ul><li><b>HGBL with rearrangements:</b> <i>MYC</i> and <i>BCL2</i> (and/or <i>BCL6</i>) translocations. "Double Hit".</li><li><b>HGBL, NOS:</b> High grade morphology but no double hit genetics.</li><li><b>HGBL-11q:</b> Burkitt-like morphology, 11q aberration, NO MYC rearrangement.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["t(8;14)", "Starry Sky"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Monomorphic medium cells, squared-off borders, tangible body macrophages.</li><li><b>IHC:</b> CD10+, BCL6+, BCL2(-), Ki67 ~100%, c-MYC+.</li><li><b>Genetics:</b> <i>MYC</i> translocation (IG partner).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    pbl: {
        title: "Plasmablastic Lymphoma",
        tags: ["CD20-", "EBER+", "HIV"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Features</div><div class="card-body"><ul><li><b>Clinical:</b> Oral cavity, HIV+ or immunosuppressed.</li><li><b>IHC:</b> CD20(-), PAX5(-), CD138+, MUM1+, CD38+, EBER+.</li><li><b>Genetics:</b> <i>MYC</i> rearrangement common.</li></ul></div></div></div><div class="reference-section"><p>Castillo, J. J., & Bibas, M. (2015). Plasmablastic lymphoma. <i>Expert Review of Hematology</i>.</p></div>`
    },
    mediastinal_b: {
        title: "Primary Mediastinal Large B-Cell",
        tags: ["Mediastinum", "CD30+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Young females, anterior mediastinal mass.</li><li><b>IHC:</b> CD20+, CD30+ (variable/weak), MAL+, CD23+, CD10(-).</li><li><b>Genetics:</b> <i>REL</i> and <i>JAK2</i> gains (9p24). Related to Hodgkin Lymphoma.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // --- PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell", tags:["CD138+", "Secretory"], color: "var(--c-cat)", content: "<div>Terminally differentiated B-cells secreting immunoglobulins.</div>" },
    
    myeloma: {
        title: "Plasma Cell Myeloma",
        tags: ["CRAB", "Bone Marrow"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnostic Criteria</div><div class="card-body">Clonal plasma cells >10% in marrow OR Plasmacytoma + <b>CRAB</b> (HyperCalcemia, Renal failure, Anemia, Bone lesions).</div></div><div class="card"><div class="card-header">IHC</div><div class="card-body">CD138+, CD38+, MUM1+, CD56 (Aberrant), Cyclin D1 (subset). Cyto Kappa/Lambda restriction.</div></div></div><div class="reference-section"><p>Rajkumar, S. V., et al. (2014). International Myeloma Working Group updated criteria. <i>The Lancet Oncology</i>, 15(12), e538-e548.</p></div>`
    },
    plasmacytoma: {
        title: "Solitary Plasmacytoma",
        tags: ["Bone/Soft Tissue"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition</div><div class="card-body">Single lesion of clonal plasma cells (Bone or Extraosseous). NO CRAB features. Marrow <10% plasma cells.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // ===============================================
    // 3. MATURE T-CELL & NK-CELL NEOPLASMS
    // ===============================================
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+", "Aggressive"], color: "var(--c-cat)", content: "<div>Diverse group of neoplasms. Often loss of pan-T markers (CD5/7).</div>" },

    // --- NODAL T-CELL ---
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Lymph Nodes"], color: "var(--c-cat)", content: "<div>Primary nodal presentation.</div>" },
    
    ptcl: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Heterogeneous group not fitting other entities. CD4+ usually. Loss of CD5/CD7. Poor prognosis.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    aitl: {
        title: "Angioimmunoblastic (nTFH)",
        tags: ["CD10+", "PD1+", "EBV"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Microscopy</div><div class="card-body">Polymorphous infiltrate, clear cells, High Endothelial Venules (HEV), expanded FDC meshwork.</div></div><div class="card"><div class="card-header">IHC</div><div class="card-body"><b>TFH markers:</b> CD10+, BCL6+, PD1+, CXCL13+, ICOS+. EBV+ B-cells present.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    alcl: {
        title: "ALCL (Anaplastic)",
        tags: ["CD30+", "Hallmark"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Hallmark cells (kidney nuclei), sinusoidal invasion.</li><li><b>IHC:</b> CD30+ (strong/diffuse), EMA+, ALK (+/-).</li><li><b>Genetics:</b> <i>ALK</i> rearrangement (t(2;5)) confers better prognosis.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // --- EXTRANODAL T-CELL ---
    extranodal_t_cat: { title: "Extranodal T/NK", tags:["Nasal", "Gut", "Liver"], color: "var(--c-cat)", content: "<div>Primary involvement of non-nodal sites.</div>" },
    
    nkt: {
        title: "Extranodal NK/T-cell",
        tags: ["Nasal", "EBV+", "CD56+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Nasal obstruction, destructive mass ("Lethal Midline Granuloma").</li><li><b>Micro:</b> Angiocentric, angiodestructive, necrosis.</li><li><b>IHC:</b> CD3+ (cyto), CD56+, TIA1+, EBER+ (100%).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    eatl: {
        title: "Enteropathy-Associated (EATL)",
        tags: ["Celiac", "Intestinal"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> History of Celiac disease. Jejunum/Ileum ulcers.</li><li><b>IHC:</b> CD3+, CD103+, CD7+, CD30+, CD56(-).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    meitl: {
        title: "MEITL",
        tags: ["Monomorphic", "CD56+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition</div><div class="card-body">Monomorphic Epitheliotropic Intestinal T-cell Lymphoma. No Celiac history.</div></div><div class="card"><div class="card-header">IHC</div><div class="card-body">CD3+, CD8+, CD56+, CD103+, MATK+, Megakaryocyte-associated tyrosine kinase.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    hepatosplenic: {
        title: "Hepatosplenic T-cell",
        tags: ["Sinusoidal", "Gamma-Delta"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Young males, hepatosplenomegaly, no lymphadenopathy.</li><li><b>Micro:</b> Sinusoidal infiltration of liver/spleen.</li><li><b>IHC:</b> CD3+, CD56+, TCR-gamma+, CD4-/CD8-, CD5-.</li><li><b>Genetics:</b> Isochromosome 7q.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    atll: {
        title: "Adult T-cell (ATLL)",
        tags: ["HTLV-1", "Flower Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Etiology:</b> HTLV-1 infection.</li><li><b>Micro:</b> "Flower cells" (polylobated nuclei). Hypercalcemia.</li><li><b>IHC:</b> CD3+, CD4+, CD25+, CD7(-).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // --- CUTANEOUS T-CELL ---
    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], color: "var(--c-cat)", content: "<div>Primary skin involvement.</div>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism", "CD4+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Cerebriform nuclei, Pautrier microabscesses, epidermotropism.</li><li><b>IHC:</b> CD3+, CD4+, CD8(-), CD7(-) (loss is early sign).</li></ul></div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019). WHO-EORTC classification for cutaneous lymphomas. <i>Blood</i>, 133(16), 1703-1714.</p></div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Leukemic", "Erythroderma"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Triad</div><div class="card-body">1. Erythroderma.<br>2. Generalized Lymphadenopathy.<br>3. Sézary cells in blood (>1000/uL).</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    pc_alcl: {
        title: "Primary Cutaneous ALCL",
        tags: ["CD30+", "Good Prognosis"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Solitary nodule, ulcerating. Good prognosis.</li><li><b>IHC:</b> CD30+ (>75% cells), ALK(-).</li><li><b>Diff Dx:</b> Lymphomatoid Papulosis (LyP).</li></ul></div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019). <i>Blood</i>.</p></div>`
    },

    // ===============================================
    // 4. HODGKIN LYMPHOMA
    // ===============================================
    hodgkin_cat: { title: "Hodgkin Lymphoma", tags:["Reed-Sternberg"], color: "var(--c-cat)", content: "<div>B-cell derived neoplasm with scant tumor cells in inflammatory background.</div>" },
    
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+", "PAX5 dim"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC Pos:</b> CD30, CD15, PAX5 (weak), MUM1.</li><li><b>IHC Neg:</b> CD45, CD20 (usually), CD3, EMA.</li><li><b>Subtypes:</b> Nodular Sclerosis, Mixed Cellularity, Lymphocyte Rich, Lymphocyte Depleted.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells", "CD20+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> "Popcorn" cells (LP cells). T-cell rosettes.</li><li><b>IHC Pos:</b> CD20 (strong), CD45, OCT2, BOB1, BCL6.</li><li><b>IHC Neg:</b> CD30, CD15.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },

    // ===============================================
    // 5. HISTIOCYTIC & DENDRITIC
    // ===============================================
    histio_cat: { title: "Histiocytic/Dendritic", tags:["Rare"], color: "var(--c-cat)", content: "<div>Neoplasms of macrophages or dendritic cells.</div>" },
    
    lch: {
        title: "Langerhans Cell Histiocytosis",
        tags: ["CD1a+", "Langerin+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Grooved nuclei ("coffee bean"), eosinophils.</li><li><b>IHC:</b> CD1a+, Langerin (CD207)+, S100+, Cyclin D1+.</li><li><b>Genetics:</b> <i>BRAF</i> V600E (~50%).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    rosai: {
        title: "Rosai-Dorfman Disease",
        tags: ["Emperipolesis", "S100+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Large histiocytes with emperipolesis (engulfed lymphocytes).</li><li><b>IHC:</b> S100+, CD68+, CD1a(-), Langerin(-).</li><li><b>Genetics:</b> <i>KRAS</i> or <i>MAP2K1</i> mutations.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    },
    fdcs: {
        title: "Follicular Dendritic Cell Sarc.",
        tags: ["CD21+", "CD23+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Spindle cells, whorled/storiform, lymphocytes.</li><li><b>IHC:</b> CD21+, CD23+, CD35+, Clusterin+, EGFR+.</li><li><b>Diff Dx:</b> Interdigitating Dendritic Cell Sarcoma (S100+).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, <i>36</i>, 1720–1748.</p></div>`
    }
};
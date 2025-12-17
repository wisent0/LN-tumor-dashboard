// Lymphoma Data Module - WHO 5th Edition (2022) Comprehensive
// References formatted in APA Style.

const medicalData = {
    root: {
        title: "Lymphoma Triage",
        tags: ["WHO 5th Ed", "2022"],
        color: "var(--c-root)",
        content: `
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">WHO 5th Edition Classification</div>
                    <div class="card-body">
                        <p>The 2022 classification organizes lymphoid neoplasms by lineage and maturation stage. Diagnosis requires integration of:</p>
                        <ul>
                            <li><b>Morphology:</b> Architecture (diffuse/nodular) and Cytology (size/shape).</li>
                            <li><b>Immunophenotype:</b> Lineage markers (B/T/NK/Histiocytic).</li>
                            <li><b>Genetics:</b> Defining drivers (e.g., <i>MYC</i>, <i>BCL2</i>, <i>ALK</i>).</li>
                            <li><b>Clinical:</b> Site of involvement (Nodal/Extranodal/Cutaneous).</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="reference-section">
                <div class="ref-title">Primary Reference</div>
                <p>Alaggio, R., Amador, C., Anagnostopoulos, I., et al. (2022). The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, 36(7), 1720–1748. https://doi.org/10.1038/s41375-022-01620-2</p>
            </div>
        `
    },

    // ===============================================
    // 1. PRECURSOR LYMPHOID NEOPLASMS
    // ===============================================
    precursor_cat: { title: "Precursor Neoplasms", tags:["Blasts", "TdT+"], color: "var(--c-cat)", content: "<div>Neoplasms of immature lymphoblasts. Defined by TdT and CD34 expression.</div>" },
    
    b_all: {
        title: "B-Lymphoblastic Leukemia/Lymphoma",
        tags: ["TdT+", "CD19+", "Pax5+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Monomorphous blasts, high N:C ratio, inconspicuous nucleoli.</li><li><b>IHC:</b> TdT+, CD19+, CD79a+, CD10+, PAX5+, CD34+.</li><li><b>Genetics:</b> <i>BCR::ABL1</i>, <i>KMT2A</i>, <i>ETV6::RUNX1</i>, or Hyperdiploidy.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    t_all: {
        title: "T-Lymphoblastic Leukemia/Lymphoma",
        tags: ["TdT+", "CD3+", "Mediastinal"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Adolescents, mediastinal mass.</li><li><b>IHC:</b> TdT+, cCD3+, CD7+, CD5+, CD1a+, CD99+.</li><li><b>Subtypes:</b> Early T-cell Precursor (ETP) ALL (CD1a-, CD8-, CD5 dim).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },

    // ===============================================
    // 2. MATURE B-CELL NEOPLASMS
    // ===============================================
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+"], color: "var(--c-cat)", content: "<div>Mature B-cells. Divided into Pre-Germinal Center, Germinal Center, and Post-Germinal Center.</div>" },

    // --- SMALL B-CELL (Indolent) ---
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<div><b>Algorithm:</b><br>1. CD5+ (CLL, MCL)<br>2. CD10+ (FL)<br>3. CD5-/CD10- (MZL, LPL, HCL)</div>" },
    
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Proliferation centers (pathognomonic).</li><li><b>IHC:</b> CD5+, CD23+, LEF1+, CD200(bright). Cyclin D1(-).</li><li><b>Genetics:</b> del(13q), del(17p)/<i>TP53</i> (poor prognosis).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    mantle: {
        title: "Mantle Cell (MCL)",
        tags: ["CD5+", "CycD1+", "SOX11+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD5+, Cyclin D1+, SOX11+, CD23(-).</li><li><b>Genetics:</b> t(11;14) <i>CCND1::IGH</i>.</li><li><b>Variants:</b> Blastoid, Pleomorphic (Aggressive).</li></ul></div></div></div><div class="reference-section"><p>Swerdlow, S. H., et al. (2017). <i>WHO Classification</i>.</p></div>`
    },
    follicular: {
        title: "Follicular (FL)",
        tags: ["CD10+", "BCL2+", "t(14;18)"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD10+, BCL6+, BCL2+, HGAL+, LMO2+.</li><li><b>Genetics:</b> t(14;18) <i>BCL2::IGH</i>.</li><li><b>Note:</b> FL Grade 3B is treated as aggressive lymphoma.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    marginal_nodal: {
        title: "Nodal Marginal Zone",
        tags: ["Monocytoid", "Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Monocytoid B-cells, inverse follicular pattern.</li><li><b>IHC:</b> CD20+, BCL2+, MNDA+, IRTA1+. CD5(-), CD10(-).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    malt: {
        title: "MALT Lymphoma",
        tags: ["Extranodal", "Lymphoepithelial"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Site:</b> Stomach (H. pylori), Lung, Salivary, Ocular adnexa.</li><li><b>Micro:</b> Lymphoepithelial lesions.</li><li><b>Genetics:</b> t(11;18) <i>BIRC3::MALT1</i>.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    splenic_mzl: {
        title: "Splenic Marginal Zone",
        tags: ["Villous", "Intrasinusoidal"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Villous lymphocytes in blood.</li><li><b>Marrow:</b> Intrasinusoidal infiltration.</li><li><b>IHC:</b> CD20+, DBA.44+, CD103(-), Annexin A1(-).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    lpl: {
        title: "Lymphoplasmacytic (LPL)",
        tags: ["MYD88", "Waldenström"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> IgM Paraprotein (Waldenström).</li><li><b>IHC:</b> CD20+, CD138+, CD5(-), CD10(-).</li><li><b>Genetics:</b> <i>MYD88</i> L265P mutation (>90%).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    hairy: {
        title: "Hairy Cell Leukemia",
        tags: ["BRAF V600E", "CD103+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD103+, CD25+, CD11c+, Annexin A1+, Cyclin D1+.</li><li><b>Genetics:</b> <i>BRAF</i> V600E (100%).</li><li><b>Micro:</b> "Fried egg" appearance, dry tap fibrosis.</li></ul></div></div></div><div class="reference-section"><p>Falini, B., et al. (2011). <i>New England Journal of Medicine</i>.</p></div>`
    },

    // --- AGGRESSIVE B-CELL ---
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<div>Large cells, diffuse architecture, high Ki67.</div>" },
    
    dlbcl_nos: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Hans Algorithm</div><div class="card-body">1. CD10+ (GCB)<br>2. CD10-/BCL6- (ABC)<br>3. CD10-/BCL6+/MUM1+ (ABC)</div></div></div><div class="reference-section"><p>Hans, C. P., et al. (2004). <i>Blood</i>, 103(1), 275-282.</p></div>`
    },
    hgbl: {
        title: "High Grade B-Cell",
        tags: ["Double Hit"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition</div><div class="card-body"><b>HGBL with Rearrangements:</b> Concurrent <i>MYC</i> and <i>BCL2</i> translocations ("Double Hit"). FISH required.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>.</p></div>`
    },
    hgbl_11q: {
        title: "HGBL-11q",
        tags: ["Burkitt-like"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Resembles Burkitt (Starry sky, CD10+) but lacks <i>MYC</i> rearrangement. Has characteristic 11q gain/loss pattern.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>.</p></div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["t(8;14)", "MYC", "Starry Sky"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD10+, BCL6+, BCL2(-), Ki67 ~100%.</li><li><b>Genetics:</b> <i>MYC</i> translocation t(8;14).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>.</p></div>`
    },
    mediastinal_b: {
        title: "Primary Mediastinal (PMBL)",
        tags: ["Mediastinum", "CD30+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Clinical:</b> Young females, anterior mediastinal mass.</li><li><b>IHC:</b> CD20+, CD30+ (weak), CD23+, MAL+.</li><li><b>Genetics:</b> Related to Hodgkin Lymphoma (9p24 JAK2/PDL1).</li></ul></div></div></div><div class="reference-section"><p>Swerdlow, S. H., et al. (2017). <i>WHO Classification</i>.</p></div>`
    },
    pbl: {
        title: "Plasmablastic Lymphoma",
        tags: ["CD20-", "EBER+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Context:</b> HIV/Immunosuppression. Oral cavity.</li><li><b>IHC:</b> CD20(-), PAX5(-), CD138+, MUM1+, EBER+.</li></ul></div></div></div><div class="reference-section"><p>Castillo, J. J. (2015). <i>Expert Review of Hematology</i>.</p></div>`
    },
    pcns_dlbcl: {
        title: "Primary CNS DLBCL",
        tags: ["Brain", "Eye"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Restricted to CNS/Eye. ABC-like phenotype (MUM1+, CD10-). <i>MYD88</i> and <i>CD79B</i> mutations are hallmark.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>.</p></div>`
    },
    ebv_dlbcl: {
        title: "EBV+ DLBCL",
        tags: ["Elderly", "EBER+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">EBV+ large B-cells in immunocompetent patients (usually elderly). EBER+ in >80% of cells.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>.</p></div>`
    },

    // --- PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], color: "var(--c-cat)", content: "<div>Secretory neoplasms.</div>" },
    myeloma: {
        title: "Plasma Cell Myeloma",
        tags: ["CRAB"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">>10% clonal plasma cells + CRAB (Calcium, Renal, Anemia, Bone). CD138+, CD56(aberrant).</div></div></div><div class="reference-section"><p>Rajkumar, S. V., et al. (2014). <i>Lancet Oncology</i>.</p></div>`
    },
    plasmacytoma: {
        title: "Plasmacytoma",
        tags: ["Solitary"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Solitary bone or soft tissue lesion. No CRAB features. Marrow <10% plasma cells.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // ===============================================
    // 3. MATURE T-CELL & NK-CELL NEOPLASMS
    // ===============================================
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+"], color: "var(--c-cat)", content: "<div>Heterogeneous group. Often lose CD5/CD7.</div>" },

    // --- NODAL ---
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Lymph Node"], color: "var(--c-cat)", content: "<div>Primary nodal involvement.</div>" },
    ptcl: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Wastebasket category. CD4+ usually. Loss of CD5/CD7.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    aitl: {
        title: "Angioimmunoblastic (nTFH)",
        tags: ["TFH", "HEV"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Clear cells, HEV proliferation, FDC expansion.</li><li><b>IHC:</b> CD10+, PD1+, CXCL13+, BCL6+, ICOS+.</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    alcl: {
        title: "ALCL (Anaplastic)",
        tags: ["CD30+", "ALK"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Hallmark cells, sinusoidal.</li><li><b>IHC:</b> CD30+ (strong), EMA+.</li><li><b>Types:</b> ALK+ (Good prognosis), ALK- (Poor).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // --- EXTRANODAL ---
    extranodal_t_cat: { title: "Extranodal T/NK", tags:["Non-Nodal"], color: "var(--c-cat)", content: "<div>Nasal, Intestinal, Hepatosplenic sites.</div>" },
    nkt: {
        title: "Extranodal NK/T",
        tags: ["Nasal", "EBV+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Site:</b> Nasal cavity (midline destruction).</li><li><b>IHC:</b> CD3+(cyto), CD56+, TIA1+, EBER+(100%).</li></ul></div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    eatl: {
        title: "EATL",
        tags: ["Celiac"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Enteropathy-associated. History of Celiac disease. CD3+, CD103+, CD30+. CD56(-).</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    meitl: {
        title: "MEITL",
        tags: ["CD56+", "Monomorphic"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Monomorphic Epitheliotropic Intestinal. No Celiac history. CD3+, CD8+, CD56+, MATK+.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    hstcl: {
        title: "Hepatosplenic T-Cell",
        tags: ["Sinusoidal", "Gamma-Delta"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Young males. Sinusoidal liver/spleen infiltration. TCR-gamma/delta+, CD56+. Isochromosome 7q.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    atll: {
        title: "ATLL",
        tags: ["HTLV-1", "Flower Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">HTLV-1 retrovirus. "Flower cells" in blood. CD3+, CD4+, CD25+, CD7(-). Hypercalcemia.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // --- LEUKEMIC T-CELL ---
    leukemic_t_cat: { title: "Leukemic T-Cell", tags:["Blood/Marrow"], color: "var(--c-cat)", content: "<div>Primary leukemic presentation.</div>" },
    t_lgl: {
        title: "T-LGL Leukemia",
        tags: ["Neutropenia", "STAT3"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Large Granular Lymphocytes. CD3+, CD8+, CD57+. <i>STAT3</i> mutations. Associated with Rheumatoid Arthritis.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    t_pll: {
        title: "T-Prolymphocytic (T-PLL)",
        tags: ["Aggressive", "TCL1"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Aggressive. Marked lymphocytosis. CD4+/CD8+ (co-expression). TCL1+. inv(14).</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // --- CUTANEOUS T-CELL ---
    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], color: "var(--c-cat)", content: "<div>Primary skin involvement.</div>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Cerebriform nuclei, Pautrier microabscesses. CD3+, CD4+, CD8(-), CD7(-).</div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019). <i>Blood</i>.</p></div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Erythroderma"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Triad: Erythroderma, Lymphadenopathy, Cloncal Sézary cells in blood.</div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019).</p></div>`
    },
    pc_alcl: {
        title: "Primary Cutaneous ALCL",
        tags: ["CD30+", "Good Prognosis"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Solitary ulcerating nodule. CD30+ (>75%). ALK(-). Excellent prognosis.</div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019).</p></div>`
    },
    lyp: {
        title: "Lymphomatoid Papulosis",
        tags: ["Self-Regressing"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Recurrent self-healing papules. CD30+ cells mixed with neutrophils/eosinophils.</div></div></div><div class="reference-section"><p>Willemze, R., et al. (2019).</p></div>`
    },

    // ===============================================
    // 4. HODGKIN LYMPHOMA
    // ===============================================
    hodgkin_cat: { title: "Hodgkin Lymphoma", tags:["Reed-Sternberg"], color: "var(--c-cat)", content: "<div>Scant tumor cells (RS) in inflammatory background.</div>" },
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">CD30+, CD15+, PAX5(dim). CD45(-), CD20(-). Background eosinophils/plasma cells.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">"Popcorn" cells (LP cells). CD20+, CD45+, OCT2+, BOB1+. CD30(-), CD15(-).</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // ===============================================
    // 5. HISTIOCYTIC & DENDRITIC
    // ===============================================
    histio_cat: { title: "Histiocytic", tags:["CD163+", "CD68+"], color: "var(--c-cat)", content: "<div>Neoplasms of macrophages/dendritic cells.</div>" },
    lch: {
        title: "Langerhans Cell Histio",
        tags: ["CD1a+", "Langerin"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Grooved nuclei ("coffee bean"). CD1a+, Langerin (CD207)+, S100+. <i>BRAF</i> V600E.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    rosai: {
        title: "Rosai-Dorfman",
        tags: ["Emperipolesis"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Massive lymphadenopathy. Emperipolesis. S100+, CD68+, CD1a(-).</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },
    fdcs: {
        title: "Follicular Dendritic Sarc",
        tags: ["CD21+", "CD23+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Spindle cells in whorls. CD21+, CD23+, CD35+, Clusterin+, EGFR+.</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    },

    // ===============================================
    // 6. IMMUNODEFICIENCY ASSOCIATED
    // ===============================================
    id_cat: { title: "ID-Associated", tags:["PTLD", "HIV"], color: "var(--c-cat)", content: "<div>Post-Transplant and Immunodeficiency settings.</div>" },
    ptld: {
        title: "PTLD Categories",
        tags: ["Transplant"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Categories</div><div class="card-body">1. Non-destructive (Florid hyperplasia)<br>2. Polymorphic PTLD<br>3. Monomorphic PTLD (Classify as lymphoma, e.g., DLBCL)<br>4. Classic CHL PTLD</div></div></div><div class="reference-section"><p>Alaggio, R., et al. (2022).</p></div>`
    }
};
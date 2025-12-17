// Lymphoma Data Module
// Source: WHO Classification of Haematolymphoid Tumours (5th Ed, 2022)
// Primary Ref: Alaggio, R., et al. Leukemia 36 (2022): 1720–1748.

const medicalData = {
    root: {
        title: "Lymphoid Triage",
        tags: ["WHO 5th Ed"],
        color: "var(--node-center)",
        content: `
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">Diagnostic Hierarchy</div>
                    <div class="card-body">
                        <p>The WHO 5th Edition (2022) classifies lymphoid neoplasms by lineage and maturation stage.</p>
                        <ul>
                            <li><b>Lineage:</b> B-Cell, T/NK-Cell, Hodgkin (Cell of origin: B), Histiocytic.</li>
                            <li><b>Maturity:</b> Precursor (Blasts) vs. Mature (Peripheral).</li>
                            <li><b>Architecture:</b> Follicular, Diffuse, Nodular, Intrasinusoidal.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="reference-section">
                <div class="ref-title">Primary Reference</div>
                <p>Alaggio, R., et al. "The 5th Edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms." <i>Leukemia</i> 36 (2022): 1720–1748.</p>
            </div>
        `
    },

    // ==========================================
    // 1. MATURE B-CELL NEOPLASMS
    // ==========================================
    b_cell_cat: { title: "Mature B-Cell", tags:["CD19+", "CD20+"], color: "var(--node-cat)", content: "<div>Neoplasms of mature B-cells. Subdivided into Pre-Germinal Center, Germinal Center, and Post-Germinal Center origins.</div>" },

    // --- A. PRE-GC / SMALL CELL ---
    small_b_cat: { title: "Small B-Cell / Indolent", tags:["Low Grade"], color: "var(--node-cat)", content: "<div>Small cell size, low proliferation. Diagnosis relies on CD5, CD10, and CD23 expression patterns.</div>" },
    
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Morphology</div><div class="card-body">Diffusely effaced node. Small lymphocytes with clumped "soccer ball" chromatin. <b>Proliferation Centers</b> (pale nodules of paraimmunoblasts) are pathognomonic.</div></div><div class="card"><div class="card-header">IHC & Genetics</div><div class="card-body"><ul><li><b>Positive:</b> CD5, CD23, LEF1 (Strong/Nuclear), CD200.</li><li><b>Weak/Dim:</b> CD20, sIg (Surface Immunoglobulin).</li><li><b>Negative:</b> Cyclin D1, CD10, FMC7.</li><li><b>Genetics:</b> del(13q) (good prog), del(17p)/<i>TP53</i> (poor prog).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1725.</p></div>`
    },
    mbl: {
        title: "Monoclonal B-cell Lymphocytosis (MBL)",
        tags: ["Precursor"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition</div><div class="card-body">Clonal B-cell population in blood < 5 x 10⁹/L. No organomegaly. Precursor to CLL.</div></div><div class="card"><div class="card-header">Phenotype</div><div class="card-body">Identical to CLL/SLL (CLL-type MBL) or non-CLL phenotype (Non-CLL MBL).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1725.</p></div>`
    },
    mantle: {
        title: "Mantle Cell Lymphoma",
        tags: ["CD5+", "Cyclin D1+", "SOX11"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Subtypes</div><div class="card-body"><ul><li><b>Classic:</b> Small/medium cells, irregular nuclei. Aggressive.</li><li><b>Leukemic Non-Nodal:</b> Indolent, involves blood/spleen, often SOX11(-).</li><li><b>Blastoid/Pleomorphic:</b> High grade, mimics DLBCL.</li></ul></div></div><div class="card"><div class="card-header">Diagnostic Panel</div><div class="card-body"><ul><li><b>Positive:</b> Cyclin D1, SOX11, CD5, CD20 (Bright).</li><li><b>Negative:</b> CD23, CD10, CD200.</li><li><b>Genetics:</b> t(11;14)(q13;q32) <i>CCND1::IGH</i>.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1726.</p></div>`
    },
    follicular: {
        title: "Follicular Lymphoma",
        tags: ["CD10+", "BCL6+", "BCL2+"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Classic FL</div><div class="card-body">Germinal center origin. Grading (1-3A) no longer clinically mandated in some centers but still in WHO. 3B is treated aggressively.</div></div><div class="card"><div class="card-header">IHC & Molecular</div><div class="card-body"><ul><li><b>Positive:</b> CD10, BCL6, BCL2 (Follicular pattern), HGAL, LMO2.</li><li><b>Negative:</b> CD5, Cyclin D1.</li><li><b>Genetics:</b> t(14;18) <i>BCL2::IGH</i> (90%).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1727.</p></div>`
    },
    marginal: {
        title: "Marginal Zone Lymphoma (MZL)",
        tags: ["MALT", "Exclusion"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Entities</div><div class="card-body">1. <b>Extranodal (MALT):</b> Epithelium associated (H. pylori). Lymphoepithelial lesions.<br>2. <b>Nodal:</b> Monocytoid B-cells.<br>3. <b>Splenic:</b> Villous lymphocytes, intrasinusoidal growth.</div></div><div class="card"><div class="card-header">IHC Profile</div><div class="card-body"><b>Diagnosis of Exclusion.</b><br>CD20(+), BCL2(+).<br><b>Negative for:</b> CD5, CD10, Cyclin D1.<br><i>Note: CD43 can be aberrantly positive.</i></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1728.</p></div>`
    },
    lpl: {
        title: "Lymphoplasmacytic (LPL)",
        tags: ["Waldenström", "MYD88"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Morphology</div><div class="card-body">Mixture of small lymphocytes, plasmacytoid lymphocytes, and plasma cells. Dutcher bodies (intranuclear inclusions).</div></div><div class="card"><div class="card-header">Key Markers</div><div class="card-body"><ul><li><b>IHC:</b> CD20+, CD138+ (plasma cell component). CD5(-), CD10(-).</li><li><b>Genetics:</b> <i>MYD88 L265P</i> mutation (>90%).</li><li><b>Clinical:</b> IgM paraprotein spike (Waldenström).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1729.</p></div>`
    },

    // --- B. AGGRESSIVE B-CELL ---
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Ki67"], color: "var(--node-cat)", content: "<div>Large cell size, diffuse architecture. Includes DLBCL and High-Grade B-cell Lymphomas.</div>" },
    dlbcl_nos: {
        title: "DLBCL, NOS",
        tags: ["Most Common", "Hans Algorithm"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Hans Algorithm (IHC)</div><div class="card-body"><b>1. CD10 (+):</b> Germinal Center B-cell (GCB).<br><b>2. CD10 (-):</b> Check BCL6.<br><b>3. BCL6 (-)</b>: Non-GCB (ABC).<br><b>4. BCL6 (+) / MUM1 (+):</b> Non-GCB (ABC).</div></div><div class="card"><div class="card-header">Must Evaluate</div><div class="card-body">c-MYC and BCL2 expression by IHC ("Double Expressor" - poor prognosis, but NOT Double Hit).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1731.</p></div>`
    },
    hgbl_dh: {
        title: "HGBL w/ MYC & BCL2 rearr.",
        tags: ["Double Hit", "Aggressive"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Definition (WHO 5th)</div><div class="card-body">B-cell lymphoma with concurrent <i>MYC</i> AND <i>BCL2</i> rearrangements (FISH). <br><i>Note: BCL6 rearrangement alone with MYC is now classified as DLBCL or HGBL-NOS, not Double Hit.</i></div></div><div class="card"><div class="card-header">Morphology</div><div class="card-body">Can resemble DLBCL, Burkitt, or be intermediate (Blastoid). Ki67 usually >80%.</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1733.</p></div>`
    },
    hgbl_11q: {
        title: "HGBL with 11q aberration",
        tags: ["Burkitt-like", "New Entity"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">WHO 5th Update</div><div class="card-body">New entity. Resembles Burkitt Lymphoma morphologically and phenotypically (CD10+, BCL6+, Ki67~100%) but <b>lacks MYC rearrangement</b>.</div></div><div class="card"><div class="card-header">Genetics</div><div class="card-body">Characteristic chromosome 11q gain/loss pattern (proximal gain/telomeric loss).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1733.</p></div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["t(8;14)", "Starry Sky"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Microscopy</div><div class="card-body">Medium-sized cells, cohesive, squared-off borders. "Starry sky" macrophages. Lipid vacuoles.</div></div><div class="card"><div class="card-header">Diagnostic Criteria</div><div class="card-body"><ul><li><b>IHC:</b> CD10(+), BCL6(+), BCL2(-), Ki67 (~100%).</li><li><b>Genetics:</b> <i>MYC</i> translocation (IG partner). Simple karyotype.</li><li><b>Variants:</b> Endemic (EBV+), Sporadic, Immunodeficiency-associated.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1734.</p></div>`
    },

    // --- C. PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell Neoplasms", tags:["CD138+", "Secretory"], color: "var(--node-cat)", content: "<div>Terminally differentiated B-cells. Secrete immunoglobulins. Markers: CD138, CD38, MUM1, EMA.</div>" },
    myeloma: {
        title: "Plasma Cell Myeloma",
        tags: ["CRAB", "Bone Marrow"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnostic Criteria</div><div class="card-body">>10% Clonal Plasma Cells in marrow + <b>Myeloma Defining Event (CRAB)</b>: Hyper<b>C</b>alcemia, <b>R</b>enal failure, <b>A</b>nemia, <b>B</b>one lesions.</div></div><div class="card"><div class="card-header">IHC Profile</div><div class="card-body"><ul><li><b>Positive:</b> CD138, CD38, MUM1, CD56 (Aberrant).</li><li><b>Negative:</b> CD19, CD20, CD45 (Usually).</li><li><b>Clonality:</b> Cytoplasmic Kappa or Lambda restriction.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1736.</p></div>`
    },

    // ==========================================
    // 2. MATURE T/NK-CELL NEOPLASMS
    // ==========================================
    t_cell_cat: { title: "Mature T/NK-Cell", tags:["CD3+"], color: "var(--node-cat)", content: "<div>Categorized by presentation: Nodal, Extranodal, Cutaneous, or Leukemic.</div>" },
    
    // NODAL T-CELL
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Aggressive"], color: "var(--node-cat)", content: "<div>Nodal presentation. Includes PTCL-NOS, ALCL, and the nTFH family.</div>" },
    ntfh_ail: {
        title: "Nodal TFH (Angioimmunoblastic)",
        tags: ["AITL", "CD10+", "PD1+"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">WHO 5th Nomenclature</div><div class="card-body">Renamed to <b>Nodal TFH cell lymphoma, angioimmunoblastic-type (nTFH-AI)</b>.</div></div><div class="card"><div class="card-header">Features</div><div class="card-body"><ul><li><b>Micro:</b> Clear cells, vascular proliferation (HEV), expanded FDC meshwork (CD21+).</li><li><b>IHC:</b> CD4+, CD10+, PD1+, BCL6+, CXCL13+ (TFH markers).</li><li><b>Association:</b> EBV+ B-cells often present in background.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1740.</p></div>`
    },
    alcl: {
        title: "Anaplastic Large Cell (ALCL)",
        tags: ["CD30+", "Hallmark Cells"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Morphology</div><div class="card-body">Large cells with kidney-shaped nuclei ("Hallmark cells"). Sinusoidal growth pattern.</div></div><div class="card"><div class="card-header">Types</div><div class="card-body"><ul><li><b>ALK-Positive:</b> <i>ALK</i> rearrangement. Excellent prognosis.</li><li><b>ALK-Negative:</b> <i>DUSP22</i> (good prog) or <i>TP63</i> (poor prog) subtypes.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1741.</p></div>`
    },
    
    // CUTANEOUS T-CELL
    cutaneous_t_cat: { title: "Cutaneous T-Cell", tags:["Skin Homing"], color: "var(--node-cat)", content: "<div>Primary cutaneous presentation. Indolent (MF) vs Aggressive (Sézary).</div>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism", "CD4+"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Microscopy</div><div class="card-body">Cerebriform nuclei. <b>Epidermotropism</b> (lymphocytes in epidermis without edema). <b>Pautrier microabscesses</b>.</div></div><div class="card"><div class="card-header">IHC</div><div class="card-body">CD3+, CD4+, CD8(-). Loss of CD7 is early sign. CD26(-).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1742.</p></div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Leukemic", "Erythroderma"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Triad</div><div class="card-body">1. Erythroderma.<br>2. Generalized Lymphadenopathy.<br>3. Clonally related neoplastic T-cells in blood (Sézary cells).</div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1742.</p></div>`
    },

    // ==========================================
    // 3. HODGKIN LYMPHOMA
    // ==========================================
    hodgkin_cat: { title: "Hodgkin Lymphoma", tags:["CD30+"], color: "var(--node-cat)", content: "<div>B-cell derived neoplasm with scant tumor cells (Reed-Sternberg) in inflammatory background.</div>" },
    chl: {
        title: "Classic Hodgkin (CHL)",
        tags: ["CD30+", "CD15+", "PAX5 Dim"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Subtypes</div><div class="card-body">Nodular Sclerosis (Lacunar cells, bands), Mixed Cellularity (EBV+), Lymphocyte Rich, Lymphocyte Depleted.</div></div><div class="card"><div class="card-header">IHC Profile</div><div class="card-body"><ul><li><b>Positive:</b> CD30 (Golgi/Membrane), CD15 (75%), PAX5 (Dim/Weak), MUM1.</li><li><b>Negative:</b> CD45, CD20 (usually), CD3, EMA.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1744.</p></div>`
    },
    nlphl: {
        title: "Nodular Lymphocyte Predominant",
        tags: ["Popcorn Cells", "CD20+"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Microscopy</div><div class="card-body">Nodular pattern. <b>LP Cells ("Popcorn cells")</b>: Multilobated nuclei. Rosettes of PD1+ T-cells around tumor cells.</div></div><div class="card"><div class="card-header">IHC (B-cell program preserved)</div><div class="card-body"><ul><li><b>Positive:</b> CD20 (Strong), CD45, OCT2, BOB1, BCL6.</li><li><b>Negative:</b> CD30, CD15 (Usually).</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1745.</p></div>`
    },

    // ==========================================
    // 4. HISTIOCYTIC
    // ==========================================
    histio_cat: { title: "Histiocytic / Dendritic", tags:["Non-Lymphoid"], color: "var(--node-cat)", content: "<div>Tumors of macrophage/dendritic lineage.</div>" },
    lch: {
        title: "Langerhans Cell Histiocytosis",
        tags: ["CD1a+", "Langerin+"],
        color: "var(--node-cat)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Microscopy</div><div class="card-body">Ovoid cells with grooved nuclei ("coffee bean"). Background eosinophils.</div></div><div class="card"><div class="card-header">IHC & Genetics</div><div class="card-body"><ul><li><b>Positive:</b> CD1a, Langerin (CD207), S100, Cyclin D1.</li><li><b>Genetics:</b> <i>BRAF V600E</i> (~50%) or <i>MAP2K1</i> mutations.</li></ul></div></div></div><div class="reference-section"><div class="ref-title">Reference</div><p>WHO 5th Ed (2022); Alaggio et al. p. 1747.</p></div>`
    }
};
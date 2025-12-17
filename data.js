// Lymphoma Data Module - WHO 5th Edition (2022) Comprehensive
// APA Style References.

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

    // 1. PRECURSOR
    precursor_cat: { title: "Precursor Neoplasms", tags:["Blasts", "TdT+"], color: "var(--c-cat)", content: "<div>Neoplasms of immature lymphoblasts. Defined by TdT and CD34 expression.</div>" },
    b_all: {
        title: "B-Lymphoblastic Leukemia/Lymphoma",
        tags: ["TdT+", "CD19+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Monomorphous blasts. IHC: TdT+, CD19+, CD10+, PAX5+. Genetics: <i>BCR::ABL1</i> or <i>KMT2A</i>.</div></div></div>`
    },
    t_all: {
        title: "T-Lymphoblastic Leukemia/Lymphoma",
        tags: ["TdT+", "CD3+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Mediastinal mass. IHC: TdT+, cCD3+, CD7+, CD5+, CD99+.</div></div></div>`
    },

    // 2. MATURE B-CELL
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+"], color: "var(--c-cat)", content: "<div>Mature B-cells. Divided into Pre-Germinal Center, Germinal Center, and Post-Germinal Center.</div>" },
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<div><b>Differential:</b> CD5+ (CLL, MCL), CD10+ (FL), CD5-/CD10- (MZL, LPL).</div>" },
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">Proliferation centers. CD5+, CD23+, LEF1+. Cyclin D1(-).</div></div></div>`
    },
    mantle: {
        title: "Mantle Cell (MCL)",
        tags: ["Cyclin D1+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">CD5+, Cyclin D1+, SOX11+. t(11;14).</div></div></div>`
    },
    follicular: {
        title: "Follicular (FL)",
        tags: ["CD10+", "BCL2+"],
        color: "var(--c-item)",
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body">CD10+, BCL6+, BCL2+. t(14;18).</div></div></div>`
    },
    marginal_nodal: { title: "Nodal MZL", tags: ["Monocytoid"], color: "var(--c-item)", content: "<div>Monocytoid B-cells. CD20+, BCL2+. Exclusion of other small B-cell lymphomas.</div>" },
    malt: { title: "MALT Lymphoma", tags: ["Extranodal"], color: "var(--c-item)", content: "<div>Extranodal (Stomach, Lung). Lymphoepithelial lesions.</div>" },
    splenic_mzl: { title: "Splenic MZL", tags: ["Villous"], color: "var(--c-item)", content: "<div>Splenomegaly. Villous lymphocytes. Intrasinusoidal growth.</div>" },
    lpl: { title: "Lymphoplasmacytic", tags: ["MYD88"], color: "var(--c-item)", content: "<div>IgM spike (Waldenström). <i>MYD88</i> L265P mutation.</div>" },
    hairy: { title: "Hairy Cell", tags: ["BRAF"], color: "var(--c-item)", content: "<div>CD103+, Annexin A1+. <i>BRAF</i> V600E.</div>" },

    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<div>Large cells, high Ki67.</div>" },
    dlbcl_nos: { title: "DLBCL, NOS", tags: ["Common"], color: "var(--c-item)", content: "<div>Large B-cells. Hans Algorithm (GCB vs ABC).</div>" },
    hgbl: { title: "High Grade B-Cell", tags: ["Double Hit"], color: "var(--c-item)", content: "<div><i>MYC</i> and <i>BCL2</i> rearrangements (FISH).</div>" },
    burkitt: { title: "Burkitt", tags: ["Starry Sky"], color: "var(--c-item)", content: "<div>Ki67 ~100%. <i>MYC</i> translocation t(8;14).</div>" },
    
    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], color: "var(--c-cat)", content: "<div>Secretory neoplasms.</div>" },
    myeloma: { title: "Myeloma", tags: ["CRAB"], color: "var(--c-item)", content: "<div>>10% clonal plasma cells + CRAB features. CD138+.</div>" },
    plasmacytoma: { title: "Plasmacytoma", tags: ["Solitary"], color: "var(--c-item)", content: "<div>Solitary lesion. No CRAB.</div>" },

    // 3. T-CELL
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+"], color: "var(--c-cat)", content: "<div>Heterogeneous group.</div>" },
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Lymph Node"], color: "var(--c-cat)", content: "<div>Primary nodal involvement.</div>" },
    ptcl: { title: "PTCL, NOS", tags: ["Exclusion"], color: "var(--c-item)", content: "<div>Diagnosis of exclusion. CD4+ usually.</div>" },
    aitl: { title: "AITL (nTFH)", tags: ["TFH"], color: "var(--c-item)", content: "<div>CD10+, PD1+, CXCL13+. Clear cells, HEV proliferation.</div>" },
    alcl: { title: "ALCL", tags: ["CD30+"], color: "var(--c-item)", content: "<div>Hallmark cells. CD30+ strong. ALK+ or ALK-.</div>" },
    
    extranodal_t_cat: { title: "Extranodal T/NK", tags:["Non-Nodal"], color: "var(--c-cat)", content: "<div>Nasal, Intestinal, Hepatosplenic.</div>" },
    nkt: { title: "NK/T Nasal", tags: ["EBV+"], color: "var(--c-item)", content: "<div>Nasal mass. CD56+, EBER+. Angiocentric.</div>" },
    eatl: { title: "EATL", tags: ["Celiac"], color: "var(--c-item)", content: "<div>Enteropathy associated. CD3+, CD103+.</div>" },
    
    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], color: "var(--c-cat)", content: "<div>Primary skin involvement.</div>" },
    mf: { title: "Mycosis Fungoides", tags: ["Epidermotropism"], color: "var(--c-item)", content: "<div>Cerebriform nuclei. CD4+.</div>" },
    sezary: { title: "Sézary Syndrome", tags: ["Erythroderma"], color: "var(--c-item)", content: "<div>Leukemic MF. Erythroderma + Circulating Sézary cells.</div>" },

    // 4. HODGKIN
    hodgkin_cat: { title: "Hodgkin", tags:["Reed-Sternberg"], color: "var(--c-cat)", content: "<div>RS cells in inflammatory background.</div>" },
    chl: { title: "Classic CHL", tags: ["CD30+", "CD15+"], color: "var(--c-item)", content: "<div>CD30+, CD15+, PAX5(dim). CD45(-).</div>" },
    nlphl: { title: "NLPHL", tags: ["Popcorn Cells"], color: "var(--c-item)", content: "<div>CD20+, CD45+, OCT2+. CD30(-).</div>" },

    // 5. HISTIOCYTIC
    histio_cat: { title: "Histiocytic", tags:["CD163+"], color: "var(--c-cat)", content: "<div>Macrophage/Dendritic cell neoplasms.</div>" },
    lch: { title: "Langerhans Cell", tags: ["CD1a+"], color: "var(--c-item)", content: "<div>CD1a+, Langerin+, S100+. Grooved nuclei.</div>" },
    rosai: { title: "Rosai-Dorfman", tags: ["Emperipolesis"], color: "var(--c-item)", content: "<div>S100+, CD68+. Emperipolesis.</div>" },

    // 6. ID ASSOCIATED
    id_cat: { title: "ID-Associated", tags:["PTLD"], color: "var(--c-cat)", content: "<div>Post-transplant or HIV associated.</div>" },
    ptld: { title: "PTLD", tags: ["Transplant"], color: "var(--c-item)", content: "<div>Post-Transplant Lymphoproliferative Disorder.</div>" }
};
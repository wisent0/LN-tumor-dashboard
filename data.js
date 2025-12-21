// Lymphoma Data Module - WHO 5th Ed (2022)
const medicalData = {
    metadata: {
        version: "2.1.1",
        lastUpdated: "2025-01-22",
        source: "WHO Classification of Haematolymphoid Tumours, 5th Ed",
        clinicalDisclaimer: "Educational use only. Not for primary diagnosis."
    },

    root: {
        title: "Lymphoma Triage",
        tags: ["WHO 5th Ed"],
        content: `
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">Diagnostic Approach</div>
                    <div class="card-body">
                        <p><b>WHO 5th Edition (2022)</b> multiparametric approach:</p>
                        <ul>
                            <li><b>Morphology:</b> Cell size, nuclear shape, pattern.</li>
                            <li><b>Immunophenotype:</b> B-cell, T-cell, NK-cell markers.</li>
                            <li><b>Genetics:</b> Essential definitions (MYC, BCL2, ALK).</li>
                        </ul>
                    </div>
                </div>
            </div>`
    },

    // --- MATURE B-CELL ---
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+", "PAX5+"], content: "<div>Neoplasms of mature B-cells.</div>" },
    
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], content: "<div><b>Diff Dx:</b> CD5+ (CLL, MCL), CD10+ (FL), Neg (MZL, LPL).</div>" },
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1+"],
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>Micro:</b> Small lymphs, proliferation centers.</li><li><b>IHC:</b> CD5+, CD23+, LEF1+, CD200+.</li><li><b>Genetics:</b> del(13q) (good), del(17p) (bad).</li></ul></div></div></div>`
    },
    mantle: {
        title: "Mantle Cell",
        tags: ["CD5+", "CyclinD1+"],
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD5+, Cyclin D1+, SOX11+. CD23-.</li><li><b>Genetics:</b> t(11;14).</li></ul></div></div></div>`
    },
    follicular: {
        title: "Follicular",
        tags: ["CD10+", "BCL2+"],
        content: `<div class="content-grid"><div class="card"><div class="card-header">Diagnosis</div><div class="card-body"><ul><li><b>IHC:</b> CD10+, BCL6+, BCL2+.</li><li><b>Genetics:</b> t(14;18).</li></ul></div></div></div>`
    },
    marginal: {
        title: "Marginal Zone",
        tags: ["Exclusion"],
        content: `<div>MALT (Extranodal), Nodal, or Splenic types. Diagnosis of exclusion (CD5-/CD10-).</div>`
    },
    lpl: {
        title: "LPL / Waldenström",
        tags: ["MYD88", "IgM"],
        content: `<div>Plasmacytoid lymphs, IgM spike. <i>MYD88</i> L265P mutation.</div>`
    },
    hairy: {
        title: "Hairy Cell",
        tags: ["BRAF", "CD103+"],
        content: `<div>"Hairy" projections, Annexin A1+, <i>BRAF</i> V600E.</div>`
    },

    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], content: "<div>High Ki67, diffuse growth.</div>" },
    dlbcl: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        content: `<div>Large B-cells. Classify by Hans (GCB vs ABC). Rule out Double Hit.</div>`
    },
    hgbl: {
        title: "High Grade B-Cell",
        tags: ["Double Hit"],
        content: `<div><i>MYC</i> and <i>BCL2</i> rearrangements (Double Hit). Aggressive.</div>`
    },
    burkitt: {
        title: "Burkitt",
        tags: ["t(8;14)", "MYC"],
        content: `<div>Starry sky pattern. CD10+, BCL6+, Ki67~100%. <i>MYC</i> translocation.</div>`
    },

    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], content: "<div>Terminally differentiated B-cells.</div>" },
    myeloma: {
        title: "Myeloma",
        tags: ["CRAB"],
        content: `<div>Clonal plasma cells + CRAB (Calcium, Renal, Anemia, Bone). CD138+, CD38+.</div>`
    },

    // --- MATURE T-CELL ---
    t_cell_cat: { title: "Mature T/NK-Cell", tags:["CD3+"], content: "<div>Post-thymic T-cells.</div>" },
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Aggressive"], content: "<div>Primary nodal involvement.</div>" },
    ptcl: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        content: `<div>Diagnosis of exclusion. Variable phenotype.</div>`
    },
    aitl: {
        title: "AITL (nTFH)",
        tags: ["TFH Markers"],
        content: `<div>TFH origin (CD10+, PD1+, CXCL13+). High endothelial venules, EBV+ B-cells.</div>`
    },
    alcl: {
        title: "ALCL",
        tags: ["CD30+", "ALK+/-"],
        content: `<div>Hallmark cells (kidney nuclei). CD30 intense. ALK+ (better prognosis) or ALK-.</div>`
    },

    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], content: "<div>Primary skin involvement.</div>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism"],
        content: `<div>Cerebriform nuclei, Pautrier microabscesses. CD4+.</div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Leukemic"],
        content: `<div>Triad: Erythroderma, Lymphadenopathy, Circulating Sézary cells.</div>`
    },
    leukemic_t_cat: { title: "Leukemic T-Cell", tags:["Blood"], content: "<div>T-PLL, T-LGL.</div>" },

    // --- HODGKIN ---
    hodgkin_cat: { title: "Hodgkin", tags:["RS Cells"], content: "<div>Reed-Sternberg cells.</div>" },
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+"],
        content: `<div>Binucleate RS cells. CD30+, CD15+, PAX5(dim). CD20/CD45 neg.</div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells"],
        content: `<div>LP cells. CD20+, CD45+, OCT2+. CD30/CD15 neg.</div>`
    },

    // --- PRECURSOR ---
    precursor_cat: { title: "Precursor", tags:["Blasts"], content: "<div>Immature blasts (TdT+).</div>" },
    b_all: {
        title: "B-ALL",
        tags: ["CD19+", "TdT+"],
        content: `<div>B-lymphoblasts. CD19+, CD10+, PAX5+, TdT+. Check genetics (Ph+, etc).</div>`
    },
    t_all: {
        title: "T-ALL",
        tags: ["CD3+", "TdT+"],
        content: `<div>Mediastinal mass. cCD3+, CD7+, TdT+.</div>`
    },

    // --- HISTIOCYTIC ---
    histio_cat: { title: "Histiocytic", tags:["CD68+"], content: "<div>Histiocyte/Dendritic neoplasms.</div>" },
    lch: {
        title: "Langerhans Cell",
        tags: ["CD1a+", "Langerin"],
        content: `<div>Grooved nuclei, eosinophils. CD1a+, Langerin+, S100+. BRAF V600E.</div>`
    },
    erdheim_chester: {
        title: "Erdheim-Chester",
        tags: ["Foamy", "BRAF"],
        content: `<div>Foamy histiocytes. CD68+, CD163+. CD1a neg. Bone pain.</div>`
    },

    // --- IMMUNODEFICIENCY ---
    id_cat: { title: "Immuno-deficiency", tags:["EBV", "Tx"], content: "<div>Post-transplant or HIV associated.</div>" },
    ptld: {
        title: "PTLD",
        tags: ["Transplant"],
        content: `<div>Post-transplant. Range from hyperplasia to lymphoma (usually EBV+).</div>`
    },
    hiv_related: {
        title: "HIV-Related",
        tags: ["HHV8"],
        content: `<div>PEL, Plasmablastic, Burkitt. Often HHV8/EBV driven.</div>`
    }
};
// Lymphoma Data Module - WHO 5th Edition (2022) Comprehensive
// Version 2.5 - Triple Content Expansion
// References formatted in strict APA Style.

const medicalData = {
    root: {
        title: "Lymphoma Triage",
        tags: ["WHO 5th Ed", "2022"],
        color: "var(--c-root)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-book-medical"></i> Overview</h3>
                <p>The <b>WHO 5th Edition (2022)</b> classification of Haematolymphoid Tumours integrates morphology, immunophenotype, genetics, and clinical features.</p>
            </div>
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical Approach</h3>
                <ul>
                    <li><b>Age:</b> Pediatric (Precursor, BL) vs Adult (DLBCL, FL).</li>
                    <li><b>Site:</b> Nodal vs Extranodal (MALT, ENKTL) vs Cutaneous.</li>
                    <li><b>Urgency:</b> Indolent (months/years) vs Aggressive (weeks).</li>
                </ul>
            </div>
            <div class="reference-section">
                <p>Alaggio, R., Amador, C., Anagnostopoulos, I., et al. (2022). The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. <i>Leukemia</i>, 36(7), 1720–1748.</p>
            </div>
        `
    },

    // ===============================================
    // 1. PRECURSOR LYMPHOID
    // ===============================================
    precursor_cat: { title: "Precursor Neoplasms", tags:["Blasts", "TdT+"], color: "var(--c-cat)", content: "<p>Immature neoplasms of B or T lymphoblasts. TdT positive.</p>" },
    
    b_all: {
        title: "B-Lymphoblastic Leukemia (B-ALL)",
        tags: ["TdT+", "CD19+", "CD10+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Monomorphous medium-sized blasts. High N:C ratio. Dispersed chromatin ("dusty"). Inconspicuous nucleoli.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <ul>
                    <li><b>Positive:</b> TdT, CD19, CD79a, PAX5, CD10 (variable), CD34.</li>
                    <li><b>Negative:</b> Surface Ig, MPO, CD3.</li>
                </ul>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p>Key for prognosis: <i>BCR::ABL1</i> (poor), <i>ETV6::RUNX1</i> (good), Hyperdiploidy (good), <i>KMT2A</i> rearr (poor).</p>
            </div>
            <div class="reference-section"><p>Alaggio, R., et al. (2022). <i>Leukemia</i>, 36, 1720–1748.</p></div>`
    },
    t_all: {
        title: "T-Lymphoblastic Leukemia (T-ALL)",
        tags: ["Mediastinal", "CD3+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Adolescent males. Mediastinal mass (thymic). Rapid growth.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <ul>
                    <li><b>Positive:</b> TdT, cCD3 (Cytoplasmic), CD7 (early), CD5, CD99.</li>
                    <li><b>Negative:</b> CD20, MPO.</li>
                </ul>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p><i>NOTCH1</i> mutations (>50%). <i>TLX1</i> or <i>TLX3</i> rearrangements.</p>
            </div>`
    },

    // ===============================================
    // 2. MATURE B-CELL
    // ===============================================
    b_cell_cat: { title: "Mature B-Cell", tags:["CD20+", "Pax5+"], color: "var(--c-cat)", content: "<p>Neoplasms of mature B-cells.</p>" },

    // --- SMALL B-CELL ---
    small_b_cat: { title: "Small B-Cell", tags:["Low Grade"], color: "var(--c-cat)", content: "<p>Indolent lymphomas composed of small lymphocytes.</p>" },
    
    cll_sll: {
        title: "CLL / SLL",
        tags: ["CD5+", "CD23+", "LEF1+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Small lymphocytes with clumped chromatin ("soccer ball"). <b>Proliferation centers</b> (pale areas with paraimmunoblasts) are pathognomonic.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <ul>
                    <li><b>Positive:</b> CD5, CD23, LEF1, CD200 (bright).</li>
                    <li><b>Negative:</b> Cyclin D1, FMC7, CD10.</li>
                </ul>
            </div>
            <div class="reference-section"><p>Swerdlow, S. H., et al. (2017). <i>WHO Classification</i>.</p></div>`
    },
    mantle: {
        title: "Mantle Cell (MCL)",
        tags: ["Cyclin D1+", "SOX11+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Diagnosis</h3>
                <p>Defined by t(11;14) and Cyclin D1 overexpression.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <ul>
                    <li><b>Positive:</b> CD20, CD5, Cyclin D1, SOX11.</li>
                    <li><b>Negative:</b> CD23, CD10, CD200.</li>
                </ul>
            </div>`
    },
    follicular: {
        title: "Follicular Lymphoma",
        tags: ["CD10+", "BCL2+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Closely packed follicles lacking mantle zones. Mix of centrocytes (cleaved) and centroblasts (large).</p>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p><b>t(14;18)</b> involving <i>BCL2</i> (90%).</p>
            </div>`
    },
    marginal_nodal: {
        title: "Nodal Marginal Zone",
        tags: ["Monocytoid"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Monocytoid B-cells (pale cytoplasm). Inverse follicular pattern.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>Diagnosis of exclusion: CD20+, BCL2+. <b>Negative</b> for CD5, CD10, Cyclin D1.</p>
            </div>`
    },
    malt: {
        title: "MALT Lymphoma",
        tags: ["Extranodal", "Lymphoepithelial"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Stomach (H. pylori), Lung, Ocular Adnexa. Chronic inflammation.</p>
            </div>
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Lymphoepithelial lesions (lymphocytes infiltrating glands).</p>
            </div>`
    },
    splenic_mzl: {
        title: "Splenic Marginal Zone",
        tags: ["Villous"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Massive splenomegaly. Villous lymphocytes in peripheral blood.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD20+, DBA.44+, TRAP(-), CD103(-), Annexin A1(-).</p>
            </div>`
    },
    lpl: {
        title: "Lymphoplasmacytic (LPL)",
        tags: ["Waldenström", "MYD88"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Small lymphocytes, plasmacytoid lymphocytes, and plasma cells. Dutcher bodies (nuclear inclusions).</p>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p><b><i>MYD88</i> L265P</b> mutation (>90%).</p>
            </div>`
    },
    hairy: {
        title: "Hairy Cell Leukemia",
        tags: ["BRAF V600E", "CD103+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>"Fried egg" appearance in marrow. Reticulin fibrosis (Dry Tap).</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD20+, CD103+, CD25+, CD11c+, Annexin A1+, Cyclin D1+ (weak).</p>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p><b><i>BRAF</i> V600E</b> mutation (100% in classic HCL).</p>
            </div>`
    },

    // --- AGGRESSIVE B-CELL ---
    aggressive_b_cat: { title: "Aggressive B-Cell", tags:["High Grade"], color: "var(--c-cat)", content: "<p>Rapidly growing large B-cell neoplasms.</p>" },
    
    dlbcl_nos: {
        title: "DLBCL, NOS",
        tags: ["Most Common"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> Hans Algorithm (COO)</h3>
                <ol>
                    <li><b>CD10+</b> → Germinal Center (GCB)</li>
                    <li><b>CD10- / BCL6-</b> → Non-GCB (ABC)</li>
                    <li><b>CD10- / BCL6+ / MUM1+</b> → Non-GCB (ABC)</li>
                </ol>
            </div>`
    },
    hgbl_dh: {
        title: "High Grade (Double Hit)",
        tags: ["MYC+", "BCL2+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Definition</h3>
                <p>Concurrent translocations of <i>MYC</i> and <i>BCL2</i> (and/or <i>BCL6</i>). Requires FISH.</p>
            </div>
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Very aggressive. Poor response to R-CHOP.</p>
            </div>`
    },
    burkitt: {
        title: "Burkitt Lymphoma",
        tags: ["Starry Sky", "t(8;14)"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Monomorphic medium-sized cells. Squared-off borders. "Starry sky" pattern (macrophages).</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD10+, BCL6+, BCL2(-), c-MYC+, Ki67 ~100%.</p>
            </div>`
    },
    mediastinal_b: {
        title: "Primary Mediastinal (PMBL)",
        tags: ["Mediastinum", "CD30+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD20+, CD30+ (weak/variable), MAL+, CD23+, CD10(-).</p>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p>Gains of 9p24 (JAK2/PDL1/PDL2). Related to Hodgkin Lymphoma.</p>
            </div>`
    },
    pbl: {
        title: "Plasmablastic Lymphoma",
        tags: ["CD20-", "HIV"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Immunoblasts with plasmacytic differentiation. Oral cavity common.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p><b>Negative:</b> CD20, PAX5.<br><b>Positive:</b> CD138, MUM1, CD38, EBER+.</p>
            </div>`
    },
    pcns_dlbcl: {
        title: "Primary CNS DLBCL",
        tags: ["Brain"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Diagnosis</h3>
                <p>Confined to CNS/Eye. Usually Non-GCB (MUM1+). <i>MYD88</i> L265P and <i>CD79B</i> mutations common.</p>
            </div>`
    },
    ivlbcl: {
        title: "Intravascular Large B",
        tags: ["Vascular", "CD20+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Large lymphoma cells strictly within lumina of small vessels. No mass forming.</p>
            </div>`
    },
    pel: {
        title: "Primary Effusion (PEL)",
        tags: ["HHV8", "Body Cavity"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Pleural/Peritoneal effusion without mass. HIV+.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> Markers</h3>
                <p><b>HHV8 (LANA-1)+</b>, CD45+, CD30+, CD138+. Null lymphocyte markers.</p>
            </div>`
    },

    // --- PLASMA CELL ---
    plasma_cat: { title: "Plasma Cell", tags:["CD138+"], color: "var(--c-cat)", content: "<p>Clonal plasma cell disorders.</p>" },
    myeloma: {
        title: "Plasma Cell Myeloma",
        tags: ["CRAB"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Criteria</h3>
                <p>Clonal marrow PC >10% OR Plasmacytoma + <b>CRAB</b> (HyperCalcemia, Renal, Anemia, Bone).</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD138+, CD38+, MUM1+, CD56 (aberrant). Kappa/Lambda restriction.</p>
            </div>`
    },
    plasmacytoma: {
        title: "Solitary Plasmacytoma",
        tags: ["Bone/Extraosseous"],
        color: "var(--c-item)",
        content: `<div class="detail-box box-diagnosis"><p>Single lesion. No CRAB features. Marrow <10%.</p></div>`
    },

    // ===============================================
    // 3. MATURE T-CELL
    // ===============================================
    t_cell_cat: { title: "Mature T-Cell", tags:["CD3+"], color: "var(--c-cat)", content: "<p>Neoplasms of post-thymic T cells.</p>" },

    // NODAL
    nodal_t_cat: { title: "Nodal T-Cell", tags:["Lymph Node"], color: "var(--c-cat)", content: "<p>Primary nodal presentation.</p>" },
    ptcl_nos: {
        title: "PTCL, NOS",
        tags: ["Exclusion"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Diagnosis</h3>
                <p>Wastebasket category. Heterogeneous. Often CD4+ with loss of CD5/CD7.</p>
            </div>`
    },
    aitl: {
        title: "AITL (nTFH)",
        tags: ["TFH", "CD10+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Clear cells, polymorphous infiltrate, High Endothelial Venules (HEV), FDC expansion.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> TFH Markers</h3>
                <p>CD10+, BCL6+, PD1+, CXCL13+, ICOS+. EBV+ B-cells present.</p>
            </div>`
    },
    alcl_alk_pos: {
        title: "ALCL, ALK+",
        tags: ["CD30+", "Good Prognosis"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>"Hallmark cells" (kidney shaped). Sinusoidal invasion.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> Markers</h3>
                <p>CD30+ (strong/diffuse), <b>ALK+</b>, EMA+, Cytotoxic markers+.</p>
            </div>`
    },
    alcl_alk_neg: {
        title: "ALCL, ALK-",
        tags: ["CD30+", "Poor Prognosis"],
        color: "var(--c-item)",
        content: `<div class="detail-box box-diagnosis"><p>Morphologically identical to ALK+ but lacks ALK protein. Worse prognosis.</p></div>`
    },

    // EXTRANODAL
    extranodal_t_cat: { title: "Extranodal T/NK", tags:["Site Specific"], color: "var(--c-cat)", content: "<p>Nasal, Intestinal, Hepatosplenic.</p>" },
    nkt: {
        title: "Extranodal NK/T",
        tags: ["Nasal", "EBV+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Angiocentric, angiodestructive, coagulative necrosis.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD3+ (cytoplasmic), CD56+, TIA1+, <b>EBER+ (100%)</b>.</p>
            </div>`
    },
    eatl: {
        title: "EATL",
        tags: ["Celiac", "Intestinal"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-clinical">
                <h3><i class="fas fa-user-md"></i> Clinical</h3>
                <p>Associated with Celiac Disease. Jejunum/Ileum ulcers.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> Markers</h3>
                <p>CD3+, CD103+, CD7+, CD30+. CD56(-).</p>
            </div>`
    },
    meitl: {
        title: "MEITL",
        tags: ["Monomorphic", "CD56+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Diagnosis</h3>
                <p>Monomorphic Epitheliotropic Intestinal T-cell Lymphoma. No Celiac. CD56+, CD8+, MATK+.</p>
            </div>`
    },
    hstcl: {
        title: "Hepatosplenic T",
        tags: ["Sinusoidal", "Gamma-Delta"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Sinusoidal infiltration of liver/spleen. No masses.</p>
            </div>
            <div class="detail-box box-genetics">
                <h3><i class="fas fa-dna"></i> Genetics</h3>
                <p>Isochromosome 7q. TCR-gamma/delta+.</p>
            </div>`
    },

    // CUTANEOUS
    cut_t_cat: { title: "Cutaneous T-Cell", tags:["Skin"], color: "var(--c-cat)", content: "<p>Skin homing lymphomas.</p>" },
    mf: {
        title: "Mycosis Fungoides",
        tags: ["Epidermotropism"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Epidermotropism (lymphocytes in epidermis). Pautrier microabscesses. Cerebriform nuclei.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> Markers</h3>
                <p>CD3+, CD4+, CD8(-). Loss of CD7.</p>
            </div>`
    },
    sezary: {
        title: "Sézary Syndrome",
        tags: ["Erythroderma", "Leukemic"],
        color: "var(--c-item)",
        content: `<div class="detail-box box-diagnosis"><p>Triad: Erythroderma + Lymphadenopathy + Circulating Sézary cells (>1000/uL).</p></div>`
    },
    pc_alcl: {
        title: "Primary Cutaneous ALCL",
        tags: ["CD30+", "Indolent"],
        color: "var(--c-item)",
        content: `<div class="detail-box box-diagnosis"><p>CD30+ large cells. ALK negative. Excellent prognosis (unlike systemic ALCL).</p></div>`
    },
    lyp: {
        title: "Lymphomatoid Papulosis",
        tags: ["Self-Healing"],
        color: "var(--c-item)",
        content: `<div class="detail-box box-clinical"><p>Recurrent papules that self-regress. Histologically malignant (CD30+), clinically benign.</p></div>`
    },

    // LEUKEMIC
    leukemic_t_cat: { title: "Leukemic T-Cell", tags:["Blood"], color: "var(--c-cat)", content: "<p>Primary leukemic presentation.</p>" },
    tlgl: { title: "T-LGL Leukemia", tags: ["Neutropenia", "STAT3"], color: "var(--c-item)", content: "<div>Large Granular Lymphocytes. Neutropenia, RA. <i>STAT3</i> mutation.</div>" },
    tpll: { title: "T-PLL", tags: ["Aggressive", "TCL1"], color: "var(--c-item)", content: "<div>Prolymphocytic. Aggressive. CD4+/CD8+ coexpression. TCL1+.</div>" },

    // ===============================================
    // 4. HODGKIN
    // ===============================================
    hodgkin_cat: { title: "Hodgkin", tags:["RS Cells"], color: "var(--c-cat)", content: "<p>Reed-Sternberg cells.</p>" },
    chl: {
        title: "Classic CHL",
        tags: ["CD30+", "CD15+"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <ul>
                    <li><b>Positive:</b> CD30 (Golgi/Membrane), CD15, PAX5 (weak), MUM1.</li>
                    <li><b>Negative:</b> CD45, CD20 (usually), CD3, EMA.</li>
                </ul>
            </div>`
    },
    nlphl: {
        title: "NLPHL",
        tags: ["Popcorn Cells"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>"Popcorn" cells (LP cells). Rosettes of PD1+ T-cells.</p>
            </div>
            <div class="detail-box box-ihc">
                <h3><i class="fas fa-vial"></i> IHC Profile</h3>
                <p>CD20+, CD45+, OCT2+, BOB1+. <b>Negative</b> for CD30/CD15.</p>
            </div>`
    },

    // ===============================================
    // 5. HISTIOCYTIC
    // ===============================================
    histio_cat: { title: "Histiocytic", tags:["CD163+"], color: "var(--c-cat)", content: "<p>Macrophage/Dendritic cell lineage.</p>" },
    lch: {
        title: "Langerhans Cell Histio",
        tags: ["CD1a+", "Grooved"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-micro">
                <h3><i class="fas fa-microscope"></i> Microscopy</h3>
                <p>Grooved nuclei ("coffee bean"). Eosinophils. CD1a+, Langerin+, S100+.</p>
            </div>`
    },
    rosai: { title: "Rosai-Dorfman", tags: ["Emperipolesis"], color: "var(--c-item)", content: "<div>S100+, CD68+. Emperipolesis (engulfment of lymphocytes).</div>" },
    fdcs: { title: "Follicular Dendritic Sarc", tags: ["CD21+"], color: "var(--c-item)", content: "<div>Spindle cells in whorls. CD21+, CD23+, CD35+, Clusterin+.</div>" },

    // ===============================================
    // 6. ID ASSOCIATED
    // ===============================================
    id_cat: { title: "ID-Associated", tags:["PTLD"], color: "var(--c-cat)", content: "<p>Immunodeficiency associated.</p>" },
    ptld: {
        title: "PTLD",
        tags: ["Transplant"],
        color: "var(--c-item)",
        content: `
            <div class="detail-box box-diagnosis">
                <h3><i class="fas fa-clipboard-check"></i> Categories</h3>
                <ol>
                    <li>Non-destructive (Florid hyperplasia)</li>
                    <li>Polymorphic PTLD</li>
                    <li>Monomorphic PTLD (Classify as lymphoma, e.g. DLBCL)</li>
                    <li>Classic CHL PTLD</li>
                </ol>
            </div>`
    }
};
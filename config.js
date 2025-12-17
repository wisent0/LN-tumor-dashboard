// config.js
const AppConfig = {
    // Tree layout configuration
    layout: {
        centerRadius: 0,
        level1Radius: 280,
        level2Radius: 450,
        level3Radius: 620,
        minAngleBetween: 20,
        maxZoom: 3,
        minZoom: 0.3,
        zoomStep: 0.2
    },
    
    // Branch definitions with High Contrast Colors
    branches: {
        b_cell_cat: {
            color: '#dc2626', // High contrast Red
            name: 'B-Cell Lymphomas',
            children: ['small_b_cat', 'aggressive_b_cat']
        },
        t_cell_cat: {
            color: '#059669', // High contrast Emerald
            name: 'T-Cell Lymphomas',
            children: ['ptcl', 'aitl', 'alcl', 'mf', 'sezary']
        },
        hodgkin_cat: {
            color: '#7c3aed', // High contrast Purple
            name: 'Hodgkin Lymphomas',
            children: ['chl', 'nlphl']
        },
        plasma_cat: {
            color: '#d97706', // High contrast Amber
            name: 'Plasma Cell Disorders',
            children: ['myeloma']
        }
    },
    
    // Search configuration
    search: {
        debounceTime: 300,
        maxResults: 10,
        minQueryLength: 2
    },
    
    // Medical disclaimer text
    disclaimer: {
        text: 'FOR EDUCATIONAL USE ONLY. NOT FOR CLINICAL DECISION MAKING. Always verify with primary WHO literature.'
    }
};
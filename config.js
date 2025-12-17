// config.js
const AppConfig = {
    // Tree layout configuration
    layout: {
        centerRadius: 0,
        baseRadius: 280,   // Level 1 radius
        radiusStep: 170,   // Distance added per level
        minAngleBetween: 15,
        maxZoom: 3,
        minZoom: 0.3,
        zoomStep: 0.2
    },
    
    // Complete WHO 5th Ed Branch Definitions
    branches: {
        b_cell_cat: {
            color: '#dc2626', // Red
            name: 'Mature B-Cell',
            children: ['small_b_cat', 'aggressive_b_cat', 'plasma_cat']
        },
        t_cell_cat: {
            color: '#059669', // Emerald
            name: 'Mature T/NK-Cell',
            children: ['nodal_t_cat', 'cut_t_cat', 'leukemic_t_cat']
        },
        hodgkin_cat: {
            color: '#7c3aed', // Purple
            name: 'Hodgkin Lymphoma',
            children: ['chl', 'nlphl']
        },
        precursor_cat: {
            color: '#2563eb', // Blue
            name: 'Precursor (ALL/LBL)',
            children: ['b_all', 't_all']
        },
        histio_cat: {
            color: '#d97706', // Amber
            name: 'Histiocytic/Dendritic',
            children: ['lch', 'erdheim_chester']
        },
        id_cat: {
            color: '#db2777', // Pink
            name: 'Immuno-deficiency',
            children: ['ptld', 'hiv_related']
        }
    },
    
    search: {
        debounceTime: 300,
        maxResults: 15,
        minQueryLength: 2
    },
    
    accessibility: {
        focusOutlineColor: '#0056b3',
        screenReaderClass: 'sr-only'
    }
};
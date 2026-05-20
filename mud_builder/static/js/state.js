// ========================================
// GLOBAL STATE
// ========================================

const AppState = {

    rooms: [],
    mobs: [],
    areas: [],
    regions: [],

    selectedRoom: null,
    selectedMob: null,

    offsetX: 0,
    offsetY: 0,

    currentZ: 0,

    gridEnabled: true,

    linkMode: false,
    linkStartRoom: null,

    autoReverse: true,

    spatialGrid: {},

    gridCellSize: 500
}


// ========================================
// CANVAS
// ========================================

const canvas =
    document.getElementById(
        'mapCanvas'
    )

const ctx =
    canvas.getContext('2d')


// ========================================
// REGION COLORS
// ========================================

const REGION_COLORS = {

    starting_region: '#3fb950',

    forest: '#2e8b57',

    dark_forest: '#5a2a82',

    dungeon: '#8b2f2f',

    village: '#c2a878',

    cave: '#666666',

    swamp: '#556b2f',

    desert: '#d2b55b',

    snow: '#8ecae6',

    unknown: '#777777'
}
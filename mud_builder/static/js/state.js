
// ====================================
// static/js/state.js
// ====================================

const AppState = {

    // ====================================
    // WORLD DATA
    // ====================================

    areas: [],

    currentArea: null,

    rooms: [],

    mobs: [],

    items: [],

    // ====================================
    // ROOM STATE
    // ====================================

    selectedRoom: null,

    hoveredRoom: null,

    selectedExit: null,

    // ====================================
    // UI STATE
    // ====================================

    linkMode: false,

    dragging: false,

    draggingRoom: false,

    draggingCanvas: false,

    // ====================================
    // DRAG DATA
    // ====================================

    dragStartX: 0,

    dragStartY: 0,

    dragOffsetX: 0,

    dragOffsetY: 0,

    // ====================================
    // CAMERA
    // ====================================

    offsetX: 120,

    offsetY: 80,

    zoom: 1,

    // ====================================
    // GRID
    // ====================================

    gridSize: 64,

    snapToGrid: true,

    // ====================================
    // Z LEVEL
    // ====================================

    currentZ: 0,

    // ====================================
    // RUNTIME
    // ====================================

    dirty: false,

    autosaving: false,

    loading: false,

    initialized: false,

    // ====================================
    // DEBUG
    // ====================================

    debug: {

        showGrid: true,

        showCoords: false,

        showRoomIds: true,

        showExitLines: true,

        showValidator: true
    }
}
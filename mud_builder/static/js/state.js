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

    multiSelection: [],

    // ====================================
    // UI STATE
    // ====================================

    linkMode: false,

    dragging: false,

    draggingRoom: false,

    draggingCanvas: false,

    resizing: false,

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

    minZoom: 0.4,

    maxZoom: 2.5,

    zoomStep: 0.1,

    smoothCamera: true,

    // ====================================
    // GRID
    // ====================================

    gridSize: 64,

    snapToGrid: true,

    showGrid: true,

    // ====================================
    // Z LEVEL
    // ====================================

    currentZ: 0,

    // ====================================
    // TOOL STATE
    // ====================================

    activeTool: 'select',

    currentBrush: null,

    // ====================================
    // RUNTIME
    // ====================================

    dirty: false,

    autosaving: false,

    loading: false,

    initialized: false,

    // ====================================
    // PERFORMANCE
    // ====================================

    spatialGridEnabled: true,

    viewportCulling: true,

    // ====================================
    // DEBUG
    // ====================================

    debug: {

        showCoords: false,

        showRoomIds: true,

        showExitLines: true,

        showValidator: true,

        showFPS: false,

        showBounds: false
    }
}
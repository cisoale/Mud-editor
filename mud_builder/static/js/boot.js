// ========================================
// RESIZE
// ========================================

function resizeCanvas() {

    canvas.width =
        canvas.parentElement.clientWidth

    canvas.height =
        canvas.parentElement.clientHeight

    MapRenderer.render()
}


window.addEventListener(

    'resize',

    resizeCanvas
)


// ========================================
// Z CONTROLS
// ========================================

function changeZ(delta) {

    AppState.currentZ += delta

    document.getElementById(
        'zLevelLabel'
    ).innerText =

        `Z: ${AppState.currentZ}`

    MapRenderer.render()
}


// ========================================
// PLACEHOLDER ACTIONS
// ========================================

function newRoom() {

    console.log(
        'newRoom() TODO'
    )
}


function newMob() {

    console.log(
        'newMob() TODO'
    )
}


function newArea() {

    console.log(
        'newArea() TODO'
    )
}


function newRegion() {

    console.log(
        'newRegion() TODO'
    )
}


function toggleLinkMode() {

    AppState.linkMode =

        !AppState.linkMode

    console.log(

        'Link Mode:',

        AppState.linkMode
    )
}


function deleteCurrentRoom() {

    console.log(
        'deleteCurrentRoom() TODO'
    )
}


function saveMobForm() {

    console.log(
        'saveMobForm() TODO'
    )
}


// ========================================
// CANVAS EVENTS
// ========================================

let isDragging = false

let dragStartX = 0

let dragStartY = 0


canvas.addEventListener(

    'mousedown',

    event => {

        isDragging = true

        dragStartX =

            event.clientX -
            AppState.offsetX

        dragStartY =

            event.clientY -
            AppState.offsetY
    }
)


window.addEventListener(

    'mouseup',

    () => {

        isDragging = false
    }
)


window.addEventListener(

    'mousemove',

    event => {

        if (!isDragging)
            return

        AppState.offsetX =

            event.clientX -
            dragStartX

        AppState.offsetY =

            event.clientY -
            dragStartY

        MapRenderer.render()
    }
)


// ========================================
// BOOT
// ========================================

async function boot() {

    console.log(
        '=== REALM BUILDER ==='
    )

    resizeCanvas()

    await DataManager.loadRooms()

    await DataManager.loadMobs()

    await DataManager.loadAreas()

    SidebarManager.renderRegions()

    SpatialGrid.rebuild()

    MapRenderer.render()

    console.log(
        'Builder Ready'
    )
}


boot()
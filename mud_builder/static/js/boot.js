// ========================================
// BOOT
// ========================================

console.log(
    '=== REALM BUILDER ==='
)

let canvas
let ctx

async function boot() {

    // ====================================
    // CANVAS
    // ====================================

    canvas =
        document.getElementById(
            'mapCanvas'
        )

    if (!canvas) {

        console.error(
            '[BOOT] mapCanvas not found'
        )

        return
    }

    ctx =
        canvas.getContext('2d')

    // ====================================
    // RENDERER
    // ====================================

    MapRenderer.resizeCanvas()

    window.addEventListener(
        'resize',
        () => {

            MapRenderer.resizeCanvas()

            MapRenderer.render()
        }
    )

    // ====================================
    // LOAD WORLD
    // ====================================

    await DataManager.loadWorld()

    // ====================================
    // SIDEBAR
    // ====================================

    if (
        typeof SidebarManager !==
        'undefined'
    ) {

        SidebarManager.renderRooms()
    }

    // ====================================
    // INTERACTION
    // ====================================

    InteractionManager.init()
    ModalManager.init()

    // ====================================
    // FIRST RENDER
    // ====================================

    MapRenderer.render()

    console.log(
        '[BOOT READY]'
    )
}

// ========================================
// START
// ========================================

window.addEventListener(
    'DOMContentLoaded',
    boot
)
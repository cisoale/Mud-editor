// ========================================
// BOOT
// ========================================

console.log(
    '=== REALM BUILDER ==='
)

let canvas
let ctx

async function boot() {

    canvas =
        document.getElementById(
            'mapCanvas'
        )

    ctx =
        canvas.getContext('2d')

    MapRenderer.resizeCanvas()

    window.addEventListener(
        'resize',
        () => {
            MapRenderer.resizeCanvas()
            MapRenderer.render()
        }
    )

    await DataManager.loadWorld()

    InteractionManager.init()

    MapRenderer.render()

    console.log(
        '[BOOT READY]'
    )
}

window.addEventListener(
    'DOMContentLoaded',
    boot
)
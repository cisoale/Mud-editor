// ====================================
// static/js/boot.js
// ====================================

console.log(
    '=== REALM BUILDER ==='
)

// ====================================
// GLOBALS
// ====================================

const canvas =

    document.getElementById(
        'mapCanvas'
    )

const ctx =
    canvas.getContext('2d')

// ====================================
// BOOT
// ====================================

async function boot() {

    // ====================================
    // LOAD DATA
    // ====================================

    await DataManager.loadWorld()

    // ====================================
    // INIT SYSTEMS
    // ====================================

    ModalManager.init()

    InteractionManager.init()

    SidebarManager.renderRooms()

     if(typeof Validator !== 'undefined') {

        Validator.init()

        Validator.validateWorld()

        console.log(
            '[VALIDATOR READY]'
        )
    }
    // ====================================
    // CANVAS
    // ====================================

    MapRenderer.resizeCanvas()

    MapRenderer.centerMap()

    MapRenderer.render()

    // ====================================
    // TOPBAR BUTTONS
    // ====================================

    setupTopbar()

    // ====================================
    // WINDOW RESIZE
    // ====================================

    window.addEventListener(

        'resize',

        () => {

            MapRenderer.resizeCanvas()

            MapRenderer.render()
        }
    )

    console.log(
        '[BOOT READY]'
    )
}

// ====================================
// TOPBAR
// ====================================

function setupTopbar() {

    // ====================================
    // NEW ROOM
    // ====================================

    const newRoomBtn =

        document.getElementById(
            'newRoomBtn'
        )

    if (newRoomBtn) {

        newRoomBtn.addEventListener(

            'click',

            async () => {

                await ModalManager.createRoom(

                    120,
                    120
                )
            }
        )
    }

    // ====================================
    // CENTER MAP
    // ====================================

    const centerBtn =

        document.getElementById(
            'centerMapBtn'
        )

    if (centerBtn) {

        centerBtn.addEventListener(

            'click',

            () => {

                MapRenderer.centerMap()

                MapRenderer.render()
            }
        )
    }

    // ====================================
    // LINK MODE
    // ====================================

    const linkBtn =

        document.getElementById(
            'linkModeBtn'
        )

    if (linkBtn) {

        linkBtn.addEventListener(

            'click',

            () => {

                AppState.linkMode =

                    !AppState.linkMode

                linkBtn.classList.toggle(

                    'active',

                    AppState.linkMode
                )

                console.log(

                    '[LINK MODE]',

                    AppState.linkMode
                )
            }
        )
    }

    // ====================================
    // Z+
    // ====================================

    const zPlusBtn =

        document.getElementById(
            'zPlusBtn'
        )

    if (zPlusBtn) {

        zPlusBtn.addEventListener(

            'click',

            () => {

                AppState.currentZ++

                updateZLabel()

                MapRenderer.render()
            }
        )
    }

    // ====================================
    // Z-
    // ====================================

    const zMinusBtn =

        document.getElementById(
            'zMinusBtn'
        )

    if (zMinusBtn) {

        zMinusBtn.addEventListener(

            'click',

            () => {

                AppState.currentZ--

                updateZLabel()

                MapRenderer.render()
            }
        )
    }

    // ====================================
    // NEW MOB
    // ====================================

    const newMobBtn =

        document.getElementById(
            'newMobBtn'
        )

    if (newMobBtn) {

        newMobBtn.addEventListener(

            'click',

            () => {

                alert(
                    'Mob editor coming soon'
                )
            }
        )
    }

    // ====================================
    // NEW AREA
    // ====================================

    const newAreaBtn =

        document.getElementById(
            'newAreaBtn'
        )

    if (newAreaBtn) {

        newAreaBtn.addEventListener(

            'click',

            () => {

                alert(
                    'Area editor coming soon'
                )
            }
        )
    }
}

// ====================================
// UPDATE Z LABEL
// ====================================

function updateZLabel() {

    const label =

        document.getElementById(
            'zLevel'
        )

    if (!label)
        return

    label.innerText =

        `Z: ${AppState.currentZ}`
}

// ====================================
// START
// ====================================

boot()
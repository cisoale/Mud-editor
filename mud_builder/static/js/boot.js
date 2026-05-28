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

    try {

        AppState.loading = true

        // ====================================
        // LOAD WORLD
        // ====================================

        await DataManager.loadWorld()

        // ====================================
        // INIT SYSTEMS
        // ====================================

        ModalManager.init()

        InteractionManager.init()

        SidebarManager.render()

        // ====================================
        // VALIDATOR
        // ====================================

        if (
            typeof Validator !==
            'undefined'
        ) {

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
        // TOPBAR
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

        // ====================================
        // INITIALIZED
        // ====================================

        AppState.initialized = true

        console.log(
            '[BOOT READY]'
        )

    } catch (error) {

        console.error(

            '[BOOT ERROR]',

            error
        )

    } finally {

        AppState.loading = false
    }
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
    // NEW AREA
    // ====================================

    const newAreaBtn =

        document.getElementById(
            'newAreaBtn'
        )

    if (newAreaBtn) {

        newAreaBtn.addEventListener(

            'click',

            async () => {

                await DataManager.createArea()

                SidebarManager.renderAreas()
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

        `Z: ${ AppState.currentZ } `
}

// ====================================
// START
// ====================================

boot()
// ========================================
// EDITOR MANAGER
// ========================================

const EditorManager = {

    // ====================================
    // OPEN ROOM
    // ====================================

    openRoom(room) {

        AppState.selectedRoom = room

        // =============================
        // SHOW MODAL
        // =============================

        document.getElementById(
            'modalOverlay'
        ).style.display = 'flex'

        document.getElementById(
            'roomEditor'
        ).style.display = 'flex'

        // =============================
        // BASIC
        // =============================

        document.getElementById(
            'room_vnum'
        ).value = room.vnum || ''

        document.getElementById(
            'room_name'
        ).value = room.name || ''

        document.getElementById(
            'room_area'
        ).value = room.area_id || ''

        document.getElementById(
            'room_region'
        ).value = room.region || ''

        document.getElementById(
            'room_short_desc'
        ).value = room.short_desc || ''

        document.getElementById(
            'room_long_desc'
        ).value = room.long_desc || ''

        // =============================
        // COORDS
        // =============================

        document.getElementById(
            'room_x'
        ).value = room.x || 0

        document.getElementById(
            'room_y'
        ).value = room.y || 0

        document.getElementById(
            'room_z'
        ).value = room.coords?.z || 0

        // =============================
        // EXITS
        // =============================

        loadExitEditor(room)

        MapRenderer.render()
    }
}


// ========================================
// EXIT EDITOR
// ========================================

function loadExitEditor(room) {

    const directions = [

        'north',
        'south',
        'east',
        'west',
        'up',
        'down'
    ]

    directions.forEach(dir => {

        const exit =
            room.exits?.[dir]

        // =============================
        // TARGET
        // =============================

        document.getElementById(
            `exit_${dir}_to`
        ).value = exit?.to || ''

        // =============================
        // FLAGS
        // =============================

        document.getElementById(
            `exit_${dir}_door`
        ).checked = exit?.door || false

        document.getElementById(
            `exit_${dir}_locked`
        ).checked = exit?.locked || false

        document.getElementById(
            `exit_${dir}_closed`
        ).checked = exit?.closed || false

        document.getElementById(
            `exit_${dir}_secret`
        ).checked = exit?.secret || false

        document.getElementById(
            `exit_${dir}_blocked`
        ).checked = exit?.blocked || false

        // =============================
        // KEY
        // =============================

        document.getElementById(
            `exit_${dir}_key`
        ).value = exit?.key || ''
    })
}


// ========================================
// SAVE ROOM FORM
// ========================================

async function saveRoomForm() {

    const room =
        AppState.selectedRoom

    if (!room)
        return

    // ====================================
    // BASIC
    // ====================================

    room.vnum = parseInt(

        document.getElementById(
            'room_vnum'
        ).value
    )

    room.name =

        document.getElementById(
            'room_name'
        ).value

    room.area_id =

        document.getElementById(
            'room_area'
        ).value

    room.region =

        document.getElementById(
            'room_region'
        ).value

    room.short_desc =

        document.getElementById(
            'room_short_desc'
        ).value

    room.long_desc =

        document.getElementById(
            'room_long_desc'
        ).value

    // ====================================
    // COORDS
    // ====================================

    room.x = parseInt(

        document.getElementById(
            'room_x'
        ).value
    ) || 0

    room.y = parseInt(

        document.getElementById(
            'room_y'
        ).value
    ) || 0

    room.coords.z = parseInt(

        document.getElementById(
            'room_z'
        ).value
    ) || 0

    // ====================================
    // EXITS
    // ====================================

    room.exits = {}

    const directions = [

        'north',
        'south',
        'east',
        'west',
        'up',
        'down'
    ]

    directions.forEach(dir => {

        const target =

            document.getElementById(
                `exit_${dir}_to`
            ).value

        if (!target)
            return

        room.exits[dir] = {

            to: parseInt(target),

            door:

                document.getElementById(
                    `exit_${dir}_door`
                ).checked,

            locked:

                document.getElementById(
                    `exit_${dir}_locked`
                ).checked,

            closed:

                document.getElementById(
                    `exit_${dir}_closed`
                ).checked,

            secret:

                document.getElementById(
                    `exit_${dir}_secret`
                ).checked,

            blocked:

                document.getElementById(
                    `exit_${dir}_blocked`
                ).checked,

            key:

                document.getElementById(
                    `exit_${dir}_key`
                ).value || null
        }
    })

    // ====================================
    // SAVE
    // ====================================

    await DataManager.saveRoom(room)

    SpatialGrid.rebuild()

    SidebarManager.renderAreas()

    SidebarManager.renderRegions()

    MapRenderer.render()

    closeModal()
}
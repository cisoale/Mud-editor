// ========================================
// EDITOR SYSTEM
// ========================================

let currentEditingRoom = null
let currentEditingMob = null

// ========================================
// ROOM ID
// ========================================

function getRoomId(room) {

    if (!room)
        return null

    return (

        room.vnum ??

        room.id ??

        null
    )
}

// ========================================
// OPEN ROOM
// ========================================

function openRoom(room) {

    if (!room)
        return

    openRoomEditor(room)
}

// ========================================
// NEW ROOM
// ========================================

async function newRoom() {

    const roomId =
        generateRoomId()

    const grid =
        MapRenderer.gridSize

    const x =
        Math.round(
            (-AppState.offsetX + 400) / grid
        )

    const y =
        Math.round(
            (-AppState.offsetY + 300) / grid
        )
    const room = {

        schema_version: 1,

        id: roomId,

        vnum: roomId,

        name:
            `New Room ${roomId}`,

        short_desc: '',

        long_desc: '',

        area_id:
            'starting_village',

        region:
            'starting_region',

        coords: {

            x,
            y,
            z: AppState.currentZ || 0
        },

        x,
        y,

        exits: {},

        mobs: [],

        items: [],

        flags: [],

        scripts: []
    }

    AppState.rooms.push(room)

    AppState.selectedRoom =
        room

    currentEditingRoom =
        room

    SpatialGrid.rebuild()

    if (window.SidebarManager) {

        SidebarManager.update()
    }

    if (window.WorldValidator) {

        WorldValidator.validate()
    }

    MapRenderer.render()

    try {

        await DataManager.saveRoom(
            room
        )

    } catch (error) {

        console.error(
            '[NEW ROOM ERROR]',
            error
        )
    }

    openRoomEditor(room)

    console.log(
        '[ROOM CREATED]',
        roomId
    )
}

// ========================================
// OPEN ROOM EDITOR
// ========================================

function openRoomEditor(room) {

    if (!room)
        return

    currentEditingRoom =
        room

    const roomId =
        getRoomId(room)

    // ====================================
    // MODAL
    // ====================================

    const modal =
        document.getElementById(
            'modalOverlay'
        )

    if (modal) {

        modal.style.display =
            'flex'
    }

    // ====================================
    // TITLE
    // ====================================

    const title =
        document.getElementById(
            'modalTitle'
        )

    if (title) {

        title.innerText =
            `Room ${roomId}`
    }

    // ====================================
    // PANELS
    // ====================================

    const roomEditor =
        document.getElementById(
            'roomEditor'
        )

    const mobEditor =
        document.getElementById(
            'mobEditor'
        )

    if (roomEditor) {

        roomEditor.style.display =
            'block'
    }

    if (mobEditor) {

        mobEditor.style.display =
            'none'
    }

    // ====================================
    // BASIC
    // ====================================

    setValue(
        'room_vnum',
        roomId
    )

    setValue(
        'room_name',
        room.name
    )

    setValue(
        'room_area',
        room.area_id
    )

    setValue(
        'room_region',
        room.region
    )

    setValue(
        'room_short_desc',
        room.short_desc
    )

    setValue(
        'room_long_desc',
        room.long_desc
    )

    // ====================================
    // COORDS
    // ====================================

    setValue(
        'room_x',
        room.coords?.x ?? room.x ?? 0
    )

    setValue(
        'room_y',
        room.coords?.y ?? room.y ?? 0
    )

    setValue(
        'room_z',
        room.coords?.z ?? 0
    )

    // ====================================
    // EXITS
    // ====================================

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

        let target = ''

        // ================================
        // OBJECT EXIT
        // ================================

        if (

            typeof exit === 'object' &&

            exit !== null
        ) {

            target =
                exit.to ?? ''
        }

        // ================================
        // RAW EXIT
        // ================================

        else if (

            typeof exit === 'number' ||

            typeof exit === 'string'
        ) {

            target = exit
        }

        setValue(
            `exit_${dir}_to`,
            target
        )

        setChecked(
            `exit_${dir}_door`,
            exit?.door ?? false
        )

        setChecked(
            `exit_${dir}_locked`,
            exit?.locked ?? false
        )

        setChecked(
            `exit_${dir}_closed`,
            exit?.closed ?? false
        )

        setChecked(
            `exit_${dir}_secret`,
            exit?.secret ?? false
        )

        setChecked(
            `exit_${dir}_blocked`,
            exit?.blocked ?? false
        )

        setValue(
            `exit_${dir}_key`,
            exit?.key ?? ''
        )
    })
}

// ========================================
// SAVE ROOM
// ========================================

async function saveRoomForm() {

    if (!currentEditingRoom)
        return

    const room =
        currentEditingRoom

    room.name =
        getValue('room_name')

    room.area_id =
        getValue('room_area')

    room.region =
        getValue('room_region')

    room.short_desc =
        getValue('room_short_desc')

    room.long_desc =
        getValue('room_long_desc')

    // ====================================
    // COORDS
    // ====================================

    if (!room.coords) {

        room.coords = {}
    }

    room.coords.x =
        Number(
            getValue('room_x')
        ) || 0

    room.coords.y =
        Number(
            getValue('room_y')
        ) || 0

    room.coords.z =
        Number(
            getValue('room_z')
        ) || 0

    room.x =
        room.coords.x

    room.y =
        room.coords.y

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
            getValue(
                `exit_${dir}_to`
            )

        if (!target)
            return

        room.exits[dir] = {

            to: Number(target),

            door:
                getChecked(
                    `exit_${dir}_door`
                ),

            locked:
                getChecked(
                    `exit_${dir}_locked`
                ),

            closed:
                getChecked(
                    `exit_${dir}_closed`
                ),

            secret:
                getChecked(
                    `exit_${dir}_secret`
                ),

            blocked:
                getChecked(
                    `exit_${dir}_blocked`
                ),

            key:
                getValue(
                    `exit_${dir}_key`
                )
        }
    })

    SpatialGrid.rebuild()

    if (window.SidebarManager) {

        SidebarManager.update()
    }

    if (window.WorldValidator) {

        WorldValidator.validate()
    }

    MapRenderer.render()

    try {

        await DataManager.saveRoom(
            room
        )

    } catch (error) {

        console.error(
            '[SAVE ROOM ERROR]',
            error
        )
    }

    closeModal()
}

// ========================================
// DELETE ROOM
// ========================================

async function deleteCurrentRoom() {

    if (!currentEditingRoom)
        return

    const room =
        currentEditingRoom

    const roomId =
        getRoomId(room)

    if (!roomId) {

        console.error(
            '[DELETE] invalid room id'
        )

        return
    }

    const confirmed =
        confirm(
            `Delete room ${roomId}?`
        )

    if (!confirmed)
        return

    // ====================================
    // REMOVE ROOM
    // ====================================

    AppState.rooms =
        AppState.rooms.filter(

            r =>
                getRoomId(r) !== roomId
        )

    // ====================================
    // CLEAN EXITS
    // ====================================

    AppState.rooms.forEach(room => {

        Object.keys(
            room.exits || {}
        ).forEach(dir => {

            const exit =
                room.exits[dir]

            const target =

                typeof exit === 'object'

                    ? exit.to

                    : exit

            if (
                String(target) ===
                String(roomId)
            ) {

                delete room.exits[dir]
            }
        })
    })

    // ====================================
    // CLEAR
    // ====================================

    AppState.selectedRoom = null

    currentEditingRoom = null

    SpatialGrid.rebuild()

    if (window.SidebarManager) {

        SidebarManager.update()
    }

    if (window.WorldValidator) {

        WorldValidator.validate()
    }

    MapRenderer.render()

    // ====================================
    // BACKEND DELETE
    // ====================================

    try {

        await DataManager.deleteRoom(
            roomId
        )

    } catch (error) {

        console.error(
            '[DELETE ROOM ERROR]',
            error
        )
    }

    closeModal()

    console.log(
        '[ROOM DELETED]',
        roomId
    )
}

// ========================================
// LINK MODE
// ========================================

function toggleLinkMode() {

    AppState.linkMode =
        !AppState.linkMode

    AppState.linkStartRoom =
        null

    console.log(

        '[LINK MODE]',

        AppState.linkMode
            ? 'ON'
            : 'OFF'
    )

    MapRenderer.render()
}

// ========================================
// HANDLE LINK MODE
// ========================================

async function handleLinkMode(room) {

    if (!AppState.linkStartRoom) {

        AppState.linkStartRoom =
            room

        console.log(
            '[LINK START]',
            getRoomId(room)
        )

        MapRenderer.render()

        return
    }

    const roomA =
        AppState.linkStartRoom

    const roomB =
        room

    const roomAId =
        getRoomId(roomA)

    const roomBId =
        getRoomId(roomB)

    if (

        !roomAId ||

        !roomBId ||

        roomAId === roomBId
    ) {

        return
    }

    // ====================================
    // EXITS
    // ====================================

    if (!roomA.exits)
        roomA.exits = {}

    if (!roomB.exits)
        roomB.exits = {}

    const direction =
        calculateDirection(
            roomA,
            roomB
        )

    const opposite =
        getOppositeDirection(
            direction
        )

    roomA.exits[direction] = {

        to: roomBId
    }

    if (AppState.autoReverse) {

        roomB.exits[opposite] = {

            to: roomAId
        }
    }

    try {

        await DataManager.saveRoom(
            roomA
        )

        await DataManager.saveRoom(
            roomB
        )

    } catch (error) {

        console.error(error)
    }

    SpatialGrid.rebuild()

    if (window.SidebarManager) {

        SidebarManager.update()
    }

    if (window.WorldValidator) {

        WorldValidator.validate()
    }

    MapRenderer.render()

    AppState.linkStartRoom =
        null

    console.log(
        '[LINK CREATED]',
        roomAId,
        '<->',
        roomBId
    )
}

// ========================================
// DIRECTION
// ========================================

function calculateDirection(
    roomA,
    roomB
) {

    const ax =
        roomA.coords?.x ?? roomA.x ?? 0

    const ay =
        roomA.coords?.y ?? roomA.y ?? 0

    const bx =
        roomB.coords?.x ?? roomB.x ?? 0

    const by =
        roomB.coords?.y ?? roomB.y ?? 0

    const dx = bx - ax
    const dy = by - ay

    if (

        Math.abs(dx) >

        Math.abs(dy)
    ) {

        return dx > 0
            ? 'east'
            : 'west'
    }

    return dy > 0
        ? 'south'
        : 'north'
}

// ========================================
// OPPOSITE
// ========================================

function getOppositeDirection(dir) {

    const map = {

        north: 'south',
        south: 'north',

        east: 'west',
        west: 'east',

        up: 'down',
        down: 'up'
    }

    return map[dir]
}

// ========================================
// NEW MOB
// ========================================

function newMob() {

    alert(
        'Mob editor coming next'
    )
}

// ========================================
// NEW AREA
// ========================================

function newArea() {

    const name =
        prompt('Area ID')

    if (!name)
        return

    alert(
        `Area created: ${name}`
    )
}

// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    const modal =
        document.getElementById(
            'modalOverlay'
        )

    if (modal) {

        modal.style.display =
            'none'
    }
}

// ========================================
// HELPERS
// ========================================

function getValue(id) {

    const el =
        document.getElementById(id)

    if (!el)
        return ''

    return el.value
}

function setValue(id, value) {

    const el =
        document.getElementById(id)

    if (!el)
        return

    if (

        value === undefined ||

        value === null
    ) {

        value = ''
    }

    el.value = value
}

function getChecked(id) {

    const el =
        document.getElementById(id)

    if (!el)
        return false

    return el.checked
}

function setChecked(id, value) {

    const el =
        document.getElementById(id)

    if (!el)
        return

    el.checked = !!value
}

// ========================================
// ROOM ID GENERATOR
// ========================================

function generateRoomId() {

    let maxId = 1000

    AppState.rooms.forEach(room => {

        const id =
            Number(
                room.vnum ??
                room.id ??
                0
            )

        if (id > maxId) {

            maxId = id
        }
    })

    return maxId + 1
}
// ====================================
// static/js/interaction.js
// ====================================

const InteractionManager = {

    dragging: false,

    dragRoom: null,

    startX: 0,
    startY: 0,

    roomStartX: 0,
    roomStartY: 0,

    // ====================================
    // LINK MODE
    // ====================================

    linkStartRoom: null,

    // ====================================
    // INIT
    // ====================================

    init() {

        canvas.addEventListener(
            'pointerdown',
            this.onPointerDown.bind(this)
        )

        window.addEventListener(
            'pointermove',
            this.onPointerMove.bind(this)
        )

        window.addEventListener(
            'pointerup',
            this.onPointerUp.bind(this)
        )

        canvas.addEventListener(
            'dblclick',
            this.onDoubleClick.bind(this)
        )

        canvas.addEventListener(
            'wheel',
            this.onWheel.bind(this),
            { passive: false }
        )

           console.log(
            '[INTERACTION READY]'
        )
    },

    // ====================================
    // MOUSE WORLD
    // ====================================

    getMouseWorld(event) {

        const rect =
            canvas.getBoundingClientRect()

        return {

            x:
                (
                    event.clientX -
                    rect.left -
                    AppState.offsetX
                ) /
                AppState.zoom,

            y:
                (
                    event.clientY -
                    rect.top -
                    AppState.offsetY
                ) /
                AppState.zoom
        }
    },

    // ====================================
    // ROOM PICKING
    // ====================================

    getRoomAt(x, y) {

        const size =
            MapRenderer.BaseRoomSize

        for (
            let i = AppState.rooms.length - 1;
            i >= 0;
            i--
        ) {

            const room =
                AppState.rooms[i]

            if (
                x >= room.coords.x &&
                x <= room.coords.x + size &&
                y >= room.coords.y &&
                y <= room.coords.y + size
            ) {

                return room
            }
        }

        return null
    },

    // ====================================
    // POINTER DOWN
    // ====================================

    async onPointerDown(event) {

        const mouse =
            this.getMouseWorld(event)

        const room =
            this.getRoomAt(
                mouse.x,
                mouse.y
            )

        this.startX =
            event.clientX

        this.startY =
            event.clientY

        // ====================================
        // NO ROOM
        // ====================================

        if (!room) {

            AppState.selectedRoom = null

            SidebarManager.renderRooms()

            MapRenderer.render()

            return
        }

        // ====================================
        // LINK MODE
        // ====================================

        if (AppState.linkMode) {

            await this.handleLinkMode(room)

            return
        }

        // ====================================
        // SELECT ROOM
        // ====================================

        AppState.selectedRoom = room

        SidebarManager.renderRooms()

        MapRenderer.render()

        // ====================================
        // START DRAG
        // ====================================

        this.dragging = true

        this.dragRoom = room

        this.roomStartX =
            room.coords.x

        this.roomStartY =
            room.coords.y
    },

    // ====================================
    // LINK MODE
    // ====================================

    async handleLinkMode(room) {

        // ====================================
        // FIRST ROOM
        // ====================================

        if (!this.linkStartRoom) {

            this.linkStartRoom = room

            AppState.selectedRoom = room

            SidebarManager.renderRooms()

            MapRenderer.render()

            console.log(
                '[LINK START]',
                room.vnum
            )

            return
        }

        // ====================================
        // SAME ROOM
        // ====================================

        if (
            this.linkStartRoom === room
        ) {

            return
        }

        // ====================================
        // CREATE EXIT
        // ====================================

        const roomA =
            this.linkStartRoom

        const roomB =
            room

        const direction =
            this.calculateDirection(
                roomA,
                roomB
            )

        if (!direction) {

            alert(
                'Cannot determine direction.'
            )

            this.linkStartRoom = null

            return
        }

        const reverse =
            this.getReverseDirection(
                direction
            )

        roomA.exits ||= {}

        roomB.exits ||= {}

        // ====================================
        // CREATE BOTH EXITS
        // ====================================

        roomA.exits[
            direction
        ] = {

            to: roomB.vnum,

            closed: false,

            locked: false,

            hidden: false
        }

        roomB.exits[
            reverse
        ] = {

            to: roomA.vnum,

            closed: false,

            locked: false,

            hidden: false
        }

        // ====================================
        // SAVE
        // ====================================

        await DataManager.saveCurrentArea()

        // ====================================
        // RESET
        // ====================================

        this.linkStartRoom = null

        SidebarManager.renderRooms()

        MapRenderer.render()

        if (
            typeof Validator !==
            'undefined'
        ) {

            Validator.validateWorld()
        }

        console.log(

            '[EXIT CREATED]',

            `${ roomA.vnum } ${ direction } -> ${ roomB.vnum } `
        )
    },

    // ====================================
    // DIRECTION
    // ====================================

    calculateDirection(
        roomA,
        roomB
    ) {

        const dx =
            roomB.coords.x -
            roomA.coords.x

        const dy =
            roomB.coords.y -
            roomA.coords.y

        // ====================================
        // HORIZONTAL
        // ====================================

        if (
            Math.abs(dx) >
            Math.abs(dy)
        ) {

            return dx > 0

                ? 'east'

                : 'west'
        }

        // ====================================
        // VERTICAL
        // ====================================

        return dy > 0

            ? 'south'

            : 'north'
    },

    // ====================================
    // REVERSE
    // ====================================

    getReverseDirection(direction) {

        const reverse = {

            north: 'south',
            south: 'north',

            east: 'west',
            west: 'east',

            up: 'down',
            down: 'up'
        }

        return reverse[
            direction
        ]
    },

    // ====================================
    // POINTER MOVE
    // ====================================

    onPointerMove(event) {

        if (!this.dragging) {
            return
        }

        if (!this.dragRoom) {
            return
        }

        const dx =
            event.clientX - this.startX

        const dy =
            event.clientY - this.startY

        let newX =
            this.roomStartX + dx

        let newY =
            this.roomStartY + dy

        // ====================================
        // GRID SNAP
        // ====================================

        if (
            AppState.snapToGrid
        ) {

            const grid =
                AppState.gridSize

            newX =

                Math.round(
                    newX / grid
                ) * grid

            newY =

                Math.round(
                    newY / grid
                ) * grid
        }

        this.dragRoom.coords.x =
            newX

        this.dragRoom.coords.y =
            newY

        MapRenderer.render()
    },

    // ====================================
    // POINTER UP
    // ====================================

    async onPointerUp() {

        if (
            this.dragging &&
            this.dragRoom
        ) {

            await DataManager.saveCurrentArea()

            if (
                typeof Validator !==
                'undefined'
            ) {

                Validator.validateWorld()
            }
        }

        this.dragging = false

        this.dragRoom = null
    },

    // ====================================
    // DOUBLE CLICK
    // ====================================

    onDoubleClick(event) {

        // ====================================
        // DISABLE IN LINK MODE
        // ====================================

        if (
            AppState.linkMode
        ) {

            return
        }

        const mouse =
            this.getMouseWorld(event)

        const room =
            this.getRoomAt(
                mouse.x,
                mouse.y
            )

        if (!room)
            return

        ModalManager.openRoom(room)
    },

    // ====================================
    // ZOOM
    // ====================================

    onWheel(event) {

        event.preventDefault()

        if (event.deltaY < 0) {

            AppState.zoom +=
                AppState.zoomStep

        } else {

            AppState.zoom -=
                AppState.zoomStep
        }

        AppState.zoom = Math.max(

            AppState.minZoom,

            Math.min(
                AppState.maxZoom,
                AppState.zoom
            )
        )

        MapRenderer.render()
    }
}

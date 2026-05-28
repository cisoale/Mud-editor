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

        console.log(
            '[INTERACTION READY]'
        )
    },

    getMouseWorld(event) {

        const rect =
            canvas.getBoundingClientRect()

        return {

            x:
                event.clientX -
                rect.left -
                AppState.offsetX,

            y:
                event.clientY -
                rect.top -
                AppState.offsetY
        }
    },

    getRoomAt(x, y) {

        const size =
            MapRenderer.roomSize

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

    onPointerDown(event) {

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

        if (!room) {
            return
        }

        this.dragging = true

        this.dragRoom = room

        this.roomStartX =
            room.coords.x

        this.roomStartY =
            room.coords.y

        AppState.selectedRoom = room

        SidebarManager.renderRooms()

        MapRenderer.render()
    },

    onPointerMove(event) {

        if (!this.dragging) {
            return
        }

        const dx =
            event.clientX - this.startX

        const dy =
            event.clientY - this.startY

        this.dragRoom.coords.x =
            this.roomStartX + dx

        this.dragRoom.coords.y =
            this.roomStartY + dy

        MapRenderer.render()
    },

    async onPointerUp() {

        if (
            this.dragging &&
            this.dragRoom
        ) {

            await DataManager.saveArea()
        }

        this.dragging = false

        this.dragRoom = null
    },

    onDoubleClick(event) {

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
    }
}
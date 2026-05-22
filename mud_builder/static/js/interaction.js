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
                x >= room.x &&
                x <= room.x + size &&
                y >= room.y &&
                y <= room.y + size
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

        this.roomStartX = room.x
        this.roomStartY = room.y

        AppState.selectedRoom = room

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

        this.dragRoom.x =
            this.roomStartX + dx

        this.dragRoom.y =
            this.roomStartY + dy

        MapRenderer.render()
    },

    async onPointerUp() {

        if (
            this.dragging &&
            this.dragRoom
        ) {

            await DataManager.saveRoom(
                this.dragRoom
            )
        }

        this.dragging = false

        this.dragRoom = null
    }
}
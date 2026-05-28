// ====================================
// static/js/renderer.js
// ====================================

const MapRenderer = {

    roomSize: 40,

    // ====================================
    // RESIZE
    // ====================================

    resizeCanvas() {

        const container =

            document.getElementById(
                'canvasContainer'
            )

        if (!container)
            return

        canvas.width =
            container.clientWidth

        canvas.height =
            container.clientHeight
    },

    // ====================================
    // CENTER MAP
    // ====================================

    centerMap() {

        if (
            !AppState.rooms ||
            !AppState.rooms.length
        ) {
            return
        }

        const xs =

            AppState.rooms.map(

                r => r.coords.x
            )

        const ys =

            AppState.rooms.map(

                r => r.coords.y
            )

        const minX =
            Math.min(...xs)

        const maxX =
            Math.max(...xs)

        const minY =
            Math.min(...ys)

        const maxY =
            Math.max(...ys)

        const mapWidth =
            maxX - minX

        const mapHeight =
            maxY - minY

        AppState.offsetX =

            canvas.width / 2 -

            (minX + mapWidth / 2)

        AppState.offsetY =

            canvas.height / 2 -

            (minY + mapHeight / 2)

        console.log(
            '[MAP CENTERED]'
        )
    },

    // ====================================
    // RENDER
    // ====================================

    render() {

        if (!ctx)
            return

        ctx.clearRect(

            0,
            0,

            canvas.width,
            canvas.height
        )

        this.drawGrid()

        this.drawExits()

        this.drawRooms()
    },

    // ====================================
    // GRID
    // ====================================

    drawGrid() {

        const size = 64

        ctx.strokeStyle =
            '#1e293b'

        ctx.lineWidth = 1

        for (

            let x = 0;

            x < canvas.width;

            x += size

        ) {

            ctx.beginPath()

            ctx.moveTo(x, 0)

            ctx.lineTo(
                x,
                canvas.height
            )

            ctx.stroke()
        }

        for (

            let y = 0;

            y < canvas.height;

            y += size

        ) {

            ctx.beginPath()

            ctx.moveTo(0, y)

            ctx.lineTo(
                canvas.width,
                y
            )

            ctx.stroke()
        }
    },

    // ====================================
    // EXITS
    // ====================================

    drawExits() {

        AppState.rooms.forEach(room => {

            const exits =
                room.exits || {}

            Object.entries(exits)

                .forEach(([dir, exit]) => {

                    const target =

                        AppState.rooms.find(

                            r =>

                                Number(r.vnum) ===

                                Number(exit.to)
                        )

                    if (!target)
                        return

                    ctx.strokeStyle =
                        '#64748b'

                    if (exit.hidden) {

                        ctx.strokeStyle =
                            '#a855f7'
                    }

                    if (exit.closed) {

                        ctx.strokeStyle =
                            '#f59e0b'
                    }

                    if (exit.locked) {

                        ctx.strokeStyle =
                            '#ef4444'
                    }

                    ctx.lineWidth = 3

                    ctx.beginPath()

                    ctx.moveTo(

                        room.coords.x +
                        AppState.offsetX +
                        this.roomSize / 2,

                        room.coords.y +
                        AppState.offsetY +
                        this.roomSize / 2
                    )

                    ctx.lineTo(

                        target.coords.x +
                        AppState.offsetX +
                        this.roomSize / 2,

                        target.coords.y +
                        AppState.offsetY +
                        this.roomSize / 2
                    )

                    ctx.stroke()
                })
        })
    },

    // ====================================
    // ROOMS
    // ====================================

    drawRooms() {

        AppState.rooms.forEach(room => {

            const x =

                room.coords.x +
                AppState.offsetX

            const y =

                room.coords.y +
                AppState.offsetY

            // ROOM BODY

            ctx.fillStyle =
                '#22c55e'

            if (
                AppState.selectedRoom === room
            ) {

                ctx.fillStyle =
                    '#3b82f6'
            }

            ctx.fillRect(

                x,
                y,

                this.roomSize,
                this.roomSize
            )

            // BORDER

            ctx.strokeStyle =
                '#0f172a'

            ctx.lineWidth = 2

            ctx.strokeRect(

                x,
                y,

                this.roomSize,
                this.roomSize
            )

            // LABEL

            ctx.fillStyle =
                '#ffffff'

            ctx.font =
                '12px Arial'

            ctx.textAlign =
                'center'

            ctx.fillText(

                room.vnum,

                x +
                this.roomSize / 2,

                y - 8
            )
        })
    }
}
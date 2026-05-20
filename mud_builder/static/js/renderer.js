// ========================================
// MAP RENDERER
// ========================================

const MapRenderer = {

    roomSize: 26,


    // ====================================
    // RENDER
    // ====================================

    render() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        )

        ctx.save()

        ctx.translate(

            AppState.offsetX,

            AppState.offsetY
        )

        this.drawGrid()

        this.drawExits()

        this.drawRooms()

        ctx.restore()
    },


    // ====================================
    // GRID
    // ====================================

    drawGrid() {

        if (!AppState.gridEnabled)
            return

        ctx.strokeStyle =
            '#1f2937'

        ctx.lineWidth = 1

        const grid = 50

        const left =
            -AppState.offsetX

        const top =
            -AppState.offsetY

        const right =
            left + canvas.width

        const bottom =
            top + canvas.height

        for (

            let x =
                Math.floor(left / grid) * grid;

            x < right;

            x += grid
        ) {

            ctx.beginPath()

            ctx.moveTo(x, top)

            ctx.lineTo(x, bottom)

            ctx.stroke()
        }

        for (

            let y =
                Math.floor(top / grid) * grid;

            y < bottom;

            y += grid
        ) {

            ctx.beginPath()

            ctx.moveTo(left, y)

            ctx.lineTo(right, y)

            ctx.stroke()
        }
    },


    // ====================================
    // EXITS
    // ====================================

    drawExits() {

        const visibleRooms =
            SpatialGrid.getVisibleRooms()

        visibleRooms.forEach(room => {

            if (!room.exits)
                return

            Object.entries(room.exits)

                .forEach(([dir, exit]) => {

                    const target =
                        AppState.rooms.find(r =>

                            r.vnum == exit.to
                        )

                    if (!target)
                        return

                    ctx.beginPath()

                    // =====================
                    // SECRET
                    // =====================

                    if (exit.secret) {

                        ctx.setLineDash([8, 8])

                    } else {

                        ctx.setLineDash([])
                    }

                    // =====================
                    // COLORS
                    // =====================

                    ctx.strokeStyle =
                        '#888'

                    if (exit.locked) {

                        ctx.strokeStyle =
                            '#ff5555'
                    }

                    if (dir === 'up') {

                        ctx.strokeStyle =
                            '#4fc3f7'
                    }

                    if (dir === 'down') {

                        ctx.strokeStyle =
                            '#ba68c8'
                    }

                    // =====================
                    // DRAW
                    // =====================

                    ctx.lineWidth = 3

                    ctx.moveTo(

                        room.x + 13,

                        room.y + 13
                    )

                    ctx.lineTo(

                        target.x + 13,

                        target.y + 13
                    )

                    ctx.stroke()
                })
        })

        ctx.setLineDash([])
    },


    // ====================================
    // ROOMS
    // ====================================

    drawRooms() {

        const visibleRooms =
            SpatialGrid.getVisibleRooms()

        visibleRooms.forEach(room => {

            // =============================
            // COLOR
            // =============================

            ctx.fillStyle =

                REGION_COLORS[
                room.region
                ] || '#666'

            // =============================
            // SELECTION
            // =============================

            if (
                AppState.selectedRoom === room
            ) {

                ctx.strokeStyle =
                    '#ffffff'

                ctx.lineWidth = 3

            } else {

                ctx.strokeStyle =
                    '#000000'

                ctx.lineWidth = 1
            }

            // =============================
            // ROOM
            // =============================

            ctx.beginPath()

            ctx.roundRect(

                room.x,
                room.y,

                this.roomSize,
                this.roomSize,

                6
            )

            ctx.fill()

            ctx.stroke()

            // =============================
            // LABEL
            // =============================

            ctx.fillStyle =
                '#ffffff'

            ctx.font =
                '11px Arial'

            ctx.fillText(

                room.vnum,

                room.x - 5,

                room.y - 8
            )
        })
    }
}
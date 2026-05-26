const MapRenderer = {

    roomSize: 32,

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
                r => r.x
            )

        const ys =
            AppState.rooms.map(
                r => r.y
            )

        const minX =
            Math.min(...xs)

        const maxX =
            Math.max(...xs)

        const minY =
            Math.min(...ys)

        const maxY =
            Math.max(...ys)

        const mapCenterX =
            (minX + maxX) / 2

        const mapCenterY =
            (minY + maxY) / 2

        AppState.offsetX =

            canvas.width / 2 -
            mapCenterX

        AppState.offsetY =

            canvas.height / 2 -
            mapCenterY

        console.log(
            '[MAP CENTERED]'
        )

        this.render()
    },

    // ====================================
    // RENDER
    // ====================================

    render() {

        if (!canvas || !ctx) {
            return
        }

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

        const size = 64

        ctx.strokeStyle =
            '#1a2238'

        ctx.lineWidth = 1

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
                Math.floor(left / size) * size;

            x < right;

            x += size

        ) {

            ctx.beginPath()

            ctx.moveTo(x, top)

            ctx.lineTo(x, bottom)

            ctx.stroke()
        }

        for (

            let y =
                Math.floor(top / size) * size;

            y < bottom;

            y += size

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
                        '#666'

                    if (exit.hidden) {

                        ctx.strokeStyle =
                            '#8844cc'
                    }

                    if (exit.closed) {

                        ctx.strokeStyle =
                            '#cc8844'
                    }

                    if (exit.locked) {

                        ctx.strokeStyle =
                            '#cc4444'
                    }

                    ctx.lineWidth = 2

                    ctx.beginPath()

                    ctx.moveTo(

                        room.x +
                        this.roomSize / 2,

                        room.y +
                        this.roomSize / 2
                    )

                    ctx.lineTo(

                        target.x +
                        this.roomSize / 2,

                        target.y +
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

            ctx.fillStyle =
                '#47d16c'

            if (
                AppState.selectedRoom === room
            ) {

                ctx.fillStyle =
                    '#4d7cff'
            }

            ctx.fillRect(

                room.x,
                room.y,

                this.roomSize,
                this.roomSize
            )

            ctx.strokeStyle =
                '#000'

            ctx.strokeRect(

                room.x,
                room.y,

                this.roomSize,
                this.roomSize
            )

            ctx.fillStyle =
                '#fff'

            ctx.font =
                '12px Arial'

            ctx.textAlign =
                'center'

            ctx.fillText(

                room.vnum,

                room.x +
                this.roomSize / 2,

                room.y - 8
            )
        })
    },

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
    }
}
// ========================================
// SPATIAL GRID
// ========================================

const SpatialGrid = {

    // ====================================
    // REBUILD
    // ====================================

    rebuild() {

        AppState.spatialGrid = {}

        AppState.rooms.forEach(room => {

            // =============================
            // SAFE COORDS
            // =============================

            room.coords ??= {}

            room.coords.x ??= 0
            room.coords.y ??= 0
            room.coords.z ??= 0

            room.x = Number(
                room.coords.x
            )

            room.y = Number(
                room.coords.y
            )

            room.z = Number(
                room.coords.z
            )

            // =============================
            // GRID CELL
            // =============================

            const cellX = Math.floor(

                room.x /

                AppState.gridCellSize
            )

            const cellY = Math.floor(

                room.y /

                AppState.gridCellSize
            )

            const key =
                `${cellX},${cellY}`

            // =============================
            // CREATE CELL
            // =============================

            if (

                !AppState.spatialGrid[key]
            ) {

                AppState.spatialGrid[key] = []
            }

            // =============================
            // INSERT
            // =============================

            AppState.spatialGrid[key]
                .push(room)
        })

        console.log(

            '[SPATIAL GRID]',
            AppState.spatialGrid
        )
    },

    // ====================================
    // GET VISIBLE ROOMS
    // ====================================

    getVisibleRooms() {

        const visible = []

        const left =
            -AppState.offsetX

        const top =
            -AppState.offsetY

        const right =
            left + canvas.width

        const bottom =
            top + canvas.height

        const cellSize =
            AppState.gridCellSize

        const startX =
            Math.floor(left / cellSize)

        const endX =
            Math.floor(right / cellSize)

        const startY =
            Math.floor(top / cellSize)

        const endY =
            Math.floor(bottom / cellSize)

        // =============================
        // ITERATE CELLS
        // =============================

        for (
            let x = startX;
            x <= endX;
            x++
        ) {

            for (
                let y = startY;
                y <= endY;
                y++
            ) {

                const key =
                    `${x},${y}`

                const cell =
                    AppState.spatialGrid[key]

                if (!cell)
                    continue

                cell.forEach(room => {

                    const roomZ =
                        Number(room.z || 0)

                    const currentZ =
                        Number(
                            AppState.currentZ
                        )

                    // =====================
                    // Z FILTER
                    // =====================

                    if (
                        roomZ === currentZ
                    ) {

                        visible.push(room)
                    }
                })
            }
        }

        console.log(
            '[VISIBLE ROOMS]',
            visible
        )

        return visible
    }
}
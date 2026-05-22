const SpatialGrid = {

    // ====================================
    // REBUILD
    // ====================================

    rebuild() {

        AppState.spatialGrid = {}

        const grid =
            MapRenderer.gridSize

        AppState.rooms.forEach(room => {

            // =============================
            // SAFE COORDS
            // =============================

            room.coords ??= {}

            room.coords.x ??= 0
            room.coords.y ??= 0
            room.coords.z ??= 0

            // =============================
            // GRID COORDS
            // =============================

            room.gridX =
                Number(room.coords.x)

            room.gridY =
                Number(room.coords.y)

            room.z =
                Number(room.coords.z)

            // LEGACY PIXEL COORDS FIX

            if (room.gridX > 100) {

                room.gridX =
                    Math.round(room.gridX / grid)
            }

            if (room.gridY > 100) {

                room.gridY =
                    Math.round(room.gridY / grid)
            }

            // =============================
            // PIXEL COORDS
            // =============================

            room.x =
                room.gridX * grid

            room.y =
                room.gridY * grid

            // =============================
            // SPATIAL CELL
            // =============================

            const cellX =
                Math.floor(
                    room.x /
                    AppState.gridCellSize
                )

            const cellY =
                Math.floor(
                    room.y /
                    AppState.gridCellSize
                )

            const key =
                `${cellX},${cellY}`

            if (
                !AppState.spatialGrid[key]
            ) {

                AppState.spatialGrid[key] = []
            }

            AppState.spatialGrid[key]
                .push(room)
        })

        console.log(
            '[SPATIAL GRID]',
            AppState.spatialGrid
        )
    },

    // ====================================
    // GET VISIBLE
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

                    if (
                        Number(room.z)
                        ===
                        Number(AppState.currentZ)
                    ) {

                        visible.push(room)
                    }
                })
            }
        }

        return visible
    }
}
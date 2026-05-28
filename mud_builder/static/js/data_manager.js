// ====================================
// static/js/data_manager.js
// ====================================

const DataManager = {

    // ====================================
    // LOAD WORLD
    // ====================================

    async loadWorld() {

        await this.loadArea()
    },

    // ====================================
    // LOAD AREA
    // ====================================

    async loadArea() {

        try {

            const response =
                await fetch('/api/area')

            const area =
                await response.json()

            AppState.currentArea =
                area

            AppState.rooms =

                Array.isArray(area.rooms)

                    ? area.rooms

                    : []

            // ====================================
            // NORMALIZE ROOMS
            // ====================================

            AppState.rooms.forEach((room, index) => {

                // EXITS

                if (
                    !room.exits ||
                    typeof room.exits !== 'object'
                ) {

                    room.exits = {}
                }

                // COORDS

                if (

                    !room.coords ||

                    typeof room.coords !== 'object'
                ) {

                    room.coords = {}
                }

                room.coords.x =

                    Number(
                        room.coords.x ?? 0
                    )

                room.coords.y =

                    Number(
                        room.coords.y ?? 0
                    )

                room.coords.z =

                    Number(
                        room.coords.z ?? 0
                    )

                // ====================================
                // AUTO POSITION
                // ====================================

                if (

                    room.coords.x === 0 &&

                    room.coords.y === 0
                ) {

                    room.coords.x =

                        120 +

                        (index % 8) * 120

                    room.coords.y =

                        120 +

                        Math.floor(index / 8) * 120
                }
            })

            console.log(

                '[AREA LOADED]',

                AppState.rooms.length,

                'rooms'
            )

            // ====================================
            // FORCE RENDER
            // ====================================

            setTimeout(() => {

                MapRenderer.resizeCanvas()

                MapRenderer.centerMap()

                MapRenderer.render()

            }, 50)

        } catch (error) {

            console.error(

                '[LOAD AREA ERROR]',

                error
            )
        }
    },

    // ====================================
    // SAVE AREA
    // ====================================

    async saveArea() {

        try {

            AppState.currentArea.rooms =

                AppState.rooms.map(room => {

                    // NORMALIZE COORDS

                    if (
                        !room.coords ||
                        typeof room.coords !== 'object'
                    ) {

                        room.coords = {}
                    }

                    room.coords = {

                        x: Number(
                            room.coords.x ?? 0
                        ),

                        y: Number(
                            room.coords.y ?? 0
                        ),

                        z: Number(
                            room.coords.z ?? 0
                        )
                    }

                    return room
                })

            const response =

                await fetch(

                    '/api/save_area',

                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json'
                        },

                        body:

                            JSON.stringify(

                                AppState.currentArea
                            )
                    }
                )

            const result =
                await response.json()

            console.log(
                '[AREA SAVED]',
                result
            )

            return result

        } catch (error) {

            console.error(
                '[SAVE AREA ERROR]',
                error
            )
        }
    },

    // ====================================
    // DELETE ROOM
    // ====================================

    async deleteRoom(vnum) {

        AppState.rooms =

            AppState.rooms.filter(

                room =>

                    room.vnum !== vnum
            )

        return await this.saveArea()
    }
}
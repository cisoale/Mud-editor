// ====================================
// static/js/data_manager.js
// ====================================

const DataManager = {

    // ====================================
    // LOAD WORLD
    // ====================================

    async loadWorld() {

        await this.loadAreas()

        if (

            AppState.areas.length > 0
        ) {

            await this.switchArea(

                AppState.areas[0].id
            )
        }
    },

    // ====================================
    // LOAD AREAS LIST
    // ====================================

    async loadAreas() {

    try {

        const response =

            await fetch(
                '/api/areas'
            )

        const areas =
            await response.json()

        AppState.areas =

            Array.isArray(areas)

                ? areas

                : []

        console.log(

            '[AREAS LOADED]',

            AppState.areas.length
        )

    } catch (error) {

        console.error(

            '[LOAD AREAS ERROR]',

            error
        )
    }
},


    // ====================================
    // SWITCH AREA
    // ====================================

    async switchArea(areaId) {

        try {

            await this.loadArea(
                areaId
            )

            SidebarManager.renderAreas()

            SidebarManager.renderRooms()

            MapRenderer.centerMap()

            MapRenderer.render()

            if (
                typeof Validator !==
                'undefined'
            ) {

                Validator.validateWorld()
            }

            console.log(

                '[AREA SWITCHED]',

                areaId
            )

        } catch (error) {

            console.error(

                '[SWITCH AREA ERROR]',

                error
            )
        }
    },

    // ====================================
    // LOAD AREA
    // ====================================

    async loadArea(areaId) {

        try {

            AppState.loading = true

            const response =

                await fetch(

                    `/api/area/${areaId}`
                )

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

            AppState.rooms.forEach(

                (room, index) => {

                    // ====================================
                    // EXITS
                    // ====================================

                    if (

                        !room.exits ||

                        typeof room.exits !==
                        'object'
                    ) {

                        room.exits = {}
                    }

                    // ====================================
                    // COORDS
                    // ====================================

                    if (

                        !room.coords ||

                        typeof room.coords !==
                        'object'
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

                    // ====================================
                    // NORMALIZE ARRAYS
                    // ====================================

                    room.mobs ||= []

                    room.items ||= []

                    room.flags ||= []

                    room.scripts ||= []
                }
            )

            console.log(

                '[AREA LOADED]',

                area.id,

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

        } finally {

            AppState.loading = false
        }
    },

    // ====================================
    // SAVE CURRENT AREA
    // ====================================

    async saveCurrentArea() {

        try {

            if (
                !AppState.currentArea
            ) {

                return
            }

            AppState.currentArea.rooms =

                AppState.rooms.map(room => {

                    // ====================================
                    // NORMALIZE COORDS
                    // ====================================

                    if (

                        !room.coords ||

                        typeof room.coords !==
                        'object'
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

                    // ====================================
                    // NORMALIZE ARRAYS
                    // ====================================

                    room.mobs ||= []

                    room.items ||= []

                    room.flags ||= []

                    room.scripts ||= []

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

                AppState.currentArea.id,

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
    // BACKWARD COMPAT
    // ====================================

    async saveArea() {

        return await this.saveCurrentArea()
    },

    // ====================================
    // CREATE AREA
    // ====================================

    async createArea() {

        const id = prompt(

            'Area ID?'
        )

        if (!id)
            return

        const area = {

            id,

            name: id,

            region: 'default',

            rooms: []
        }

        AppState.areas.push(
            area
        )

        console.log(

            '[AREA CREATED]',

            id
        )

        await this.switchArea(id)
    },

    // ====================================
    // DELETE AREA
    // ====================================

    async deleteArea(areaId) {

        const confirmed = confirm(

            `Delete area ${ areaId }?`
        )

        if (!confirmed)
            return

        AppState.areas =

            AppState.areas.filter(

                area =>

                    area.id !== areaId
            )

        if (

            AppState.currentArea &&

            AppState.currentArea.id ===
            areaId
        ) {

            AppState.currentArea = null

            AppState.rooms = []
        }

        SidebarManager.renderAreas()

        SidebarManager.renderRooms()

        MapRenderer.render()

        console.log(

            '[AREA DELETED]',

            areaId
        )
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

        return await this.saveCurrentArea()
    }
}

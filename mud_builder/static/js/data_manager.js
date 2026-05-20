// ========================================
// DATA MANAGER
// ========================================

const DataManager = {

    // ====================================
    // LOAD ROOMS
    // ====================================

    async loadRooms() {

        const response =
            await fetch('/api/rooms')

        const data =
            await response.json()

        AppState.rooms =

            Array.isArray(data)

                ? data

                : Object.values(data)

        AppState.rooms.forEach((room, index) => {

            // =============================
            // DEFAULTS
            // =============================

            room.schema_version ??= 1

            room.short_desc ??= ''

            room.long_desc ??= ''

            room.region ??=
                'starting_region'

            room.exits ??= {}

            room.items ??= []

            room.mobs ??= []

            room.flags ??= []

            room.scripts ??= []

            // =============================
            // COORDS
            // =============================

            if (!room.coords) {

                room.coords = {

                    x: 0,
                    y: 0,
                    z: 0
                }
            }

            room.x =
                room.coords.x

            room.y =
                room.coords.y

            // =============================
            // AUTO POSITION
            // =============================

            if (

                room.x === 0 &&

                room.y === 0
            ) {

                room.x =
                    120 + (index % 6) * 140

                room.y =
                    120 + Math.floor(index / 6) * 140
            }
        })

        SpatialGrid.rebuild()

        MapRenderer.render()
    },


    // ====================================
    // LOAD MOBS
    // ====================================

    async loadMobs() {

        const response =
            await fetch('/api/mobs')

        const data =
            await response.json()

        AppState.mobs =

            Array.isArray(data)

                ? data

                : Object.values(data)

        SidebarManager.renderMobs()
    },


    // ====================================
    // LOAD AREAS
    // ====================================

    async loadAreas() {

        const response =
            await fetch('/api/areas')

        const data =
            await response.json()

        AppState.areas = data

        SidebarManager.renderAreas()
    },


    // ====================================
    // SAVE ROOM
    // ====================================

    async saveRoom(room) {

        room.coords = {

            x: room.x,

            y: room.y,

            z: room.coords?.z || 0
        }

        const exportRoom = {

            schema_version:
                room.schema_version || 1,

            vnum:
                room.vnum,

            name:
                room.name,

            short_desc:
                room.short_desc || '',

            long_desc:
                room.long_desc || '',

            region:
                room.region || 'starting_region',

            coords:
                room.coords,

            exits:
                room.exits || {},

            items:
                room.items || [],

            mobs:
                room.mobs || [],

            flags:
                room.flags || [],

            scripts:
                room.scripts || []
        }

        await fetch('/api/room', {

            method: 'POST',

            headers: {

                'Content-Type':
                    'application/json'
            },

            body:
                JSON.stringify(exportRoom)
        })
    }
}
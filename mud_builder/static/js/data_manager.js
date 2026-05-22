const DataManager = {

    // ====================================
    // LOAD WORLD
    // ====================================

    async loadWorld() {

        await this.loadRooms()
    },

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

            room.exits ??= {}

            room.coords ??= {

                x: 0,
                y: 0,
                z: 0
            }

            room.x =
                Number(room.coords.x || 0)

            room.y =
                Number(room.coords.y || 0)

            // AUTO POSITION

            if (
                room.x === 0 &&
                room.y === 0
            ) {

                room.x =
                    120 + (index % 8) * 120

                room.y =
                    120 + Math.floor(index / 8) * 120
            }
        })

        console.log(
            '[ROOMS]',
            AppState.rooms.length
        )

        MapRenderer.render()
    },

    // ====================================
    // SAVE ROOM
    // ====================================

    async saveRoom(room) {

        room.coords = {

            x: room.x,
            y: room.y,
            z: 0
        }

        try {

            const response =
                await fetch(

                    '/api/room',

                    {
                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(room)
                    }
                )

            return await response.json()

        } catch (error) {

            console.error(
                '[SAVE ERROR]',
                error
            )
        }
    },

    // ====================================
    // DELETE ROOM
    // ====================================

    async deleteRoom(vnum) {

        try {

            const response =

                await fetch(

                    '/api/delete_room',

                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            vnum: vnum
                        })
                    }
                )

            const result =
                await response.json()

            console.log(
                '[ROOM DELETED]',
                result
            )

            return result

        } catch (error) {

            console.error(
                '[DELETE ERROR]',
                error
            )
        }
    }
}
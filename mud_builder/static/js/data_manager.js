// ========================================
// DATA MANAGER
// ========================================

const DataManager = {

    async loadWorld() {

        await this.loadRooms()
    },

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

    async saveRoom(room) {

        room.coords = {
            x: room.x,
            y: room.y,
            z: 0
        }

        const response = await fetch(
            '/api/room',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(room)
            }
        )

        return await response.json()
    }
}
const ModalManager = {

    currentRoom: null,

    // ====================================
    // INIT
    // ====================================

    init() {

        // CLOSE

        const closeBtn =
            document.getElementById(
                'closeRoomBtn'
            )

        if (closeBtn) {

            closeBtn.addEventListener(
                'click',
                () => this.closeRoomModal()
            )
        }

        // SAVE

        const saveBtn =
            document.getElementById(
                'saveRoomBtn'
            )

        if (saveBtn) {

            saveBtn.addEventListener(
                'click',
                () => this.saveRoom()
            )
        }

        // DELETE

        const deleteBtn =
            document.getElementById(
                'deleteRoomBtn'
            )

        if (deleteBtn) {

            deleteBtn.addEventListener(
                'click',
                () => this.deleteRoom()
            )
        }

        // NEW ROOM

        const newRoomBtn =
            document.getElementById(
                'newRoomBtn'
            )

        if (newRoomBtn) {

            newRoomBtn.addEventListener(
                'click',
                () => this.createRoom()
            )
        }

        console.log(
            '[MODALS READY]'
        )
    },

    // ====================================
    // OPEN ROOM
    // ====================================

    openRoom(room) {

        this.currentRoom = room

        const modal =
            document.getElementById(
                'roomModal'
            )

        if (!modal)
            return

        modal.classList.add(
            'active'
        )

        // VNUM

        document.getElementById(
            'room_vnum'
        ).value =
            room.vnum || ''

        // NAME

        document.getElementById(
            'room_name'
        ).value =
            room.name || ''

        // AREA

        document.getElementById(
            'room_area'
        ).value =
            room.area_id || ''

        // REGION

        document.getElementById(
            'room_region'
        ).value =
            room.region || ''

        // DESC

        document.getElementById(
            'room_long_desc'
        ).value =
            room.long_desc || ''
    },

    // ====================================
    // CLOSE
    // ====================================

    closeRoomModal() {

        const modal =
            document.getElementById(
                'roomModal'
            )

        if (!modal)
            return

        modal.classList.remove(
            'active'
        )
    },

    // ====================================
    // SAVE ROOM
    // ====================================

    async saveRoom() {

        if (!this.currentRoom)
            return

        this.currentRoom.name =

            document.getElementById(
                'room_name'
            ).value

        this.currentRoom.area_id =

            document.getElementById(
                'room_area'
            ).value

        this.currentRoom.region =

            document.getElementById(
                'room_region'
            ).value

        this.currentRoom.long_desc =

            document.getElementById(
                'room_long_desc'
            ).value

        await DataManager.saveRoom(
            this.currentRoom
        )

        SidebarManager.renderRooms()

        MapRenderer.render()

        this.closeRoomModal()

        console.log(
            '[ROOM SAVED]',
            this.currentRoom
        )
    },

    // ====================================
    // DELETE ROOM
    // ====================================

    async deleteRoom() {

        if (!this.currentRoom)
            return

        const confirmDelete =
            confirm(
                'Delete this room?'
            )

        if (!confirmDelete)
            return

        await DataManager.deleteRoom(
            this.currentRoom.vnum
        )

        AppState.rooms =
            AppState.rooms.filter(
                r => r !== this.currentRoom
            )

        SidebarManager.renderRooms()

        MapRenderer.render()

        this.closeRoomModal()

        console.log(
            '[ROOM DELETED]'
        )
    },

    // ====================================
    // CREATE ROOM
    // ====================================

    async createRoom() {

        const maxVnum = Math.max(

            ...AppState.rooms.map(

                r =>
                    Number(
                        r.vnum || 0
                    )
            ),

            1000
        )

        const newVnum =
            maxVnum + 1

        const room = {

            vnum: newVnum,

            name: 'New Room',

            area_id: 'default',

            region: '',

            long_desc: '',

            exits: {},

            coords: {

                x: 0,
                y: 0,
                z: 0
            },

            x:
                300 +
                Math.random() * 200,

            y:
                300 +
                Math.random() * 200
        }

        await DataManager.saveRoom(
            room
        )

        AppState.rooms.push(room)

        AppState.selectedRoom = room

        SidebarManager.renderRooms()

        MapRenderer.render()

        this.openRoom(room)

        console.log(
            '[ROOM CREATED]',
            room.vnum
        )
    }
}
const RoomEditor = {

    currentRoom: null,

    init() {

        const closeBtn =
            document.getElementById(
                'closeRoomBtn'
            )

        const saveBtn =
            document.getElementById(
                'saveRoomBtn'
            )

        if (closeBtn) {

            closeBtn.addEventListener(
                'click',
                () => this.close()
            )
        }

        if (saveBtn) {

            saveBtn.addEventListener(
                'click',
                () => this.save()
            )
        }

        console.log(
            '[ROOM EDITOR READY]'
        )
    },

    open(room) {

        this.currentRoom = room

        const modal =
            document.getElementById(
                'roomModal'
            )

        if (!modal)
            return

        modal.classList.add('active')

        document.getElementById(
            'roomVnum'
        ).value =
            room.vnum || ''

        document.getElementById(
            'roomName'
        ).value =
            room.name || ''

        document.getElementById(
            'roomDesc'
        ).value =
            room.long_desc || ''
    },

    close() {

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

    async save() {

        if (!this.currentRoom)
            return

        this.currentRoom.name =

            document.getElementById(
                'roomName'
            ).value

        this.currentRoom.long_desc =

            document.getElementById(
                'roomDesc'
            ).value

        await DataManager.saveRoom(
            this.currentRoom
        )

        this.close()

        MapRenderer.render()
        SidebarManager.renderRooms()
    }
}
const EXIT_DIRECTIONS = [

    'north',
    'south',
    'east',
    'west',
    'up',
    'down'
]

const ModalManager = {

    currentRoom: null,

    init() {

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

    buildExitEditor(room) {

        const container =
            document.getElementById(
                'exitEditor'
            )

        container.innerHTML = ''

        const exits =
            room.exits || {}

        EXIT_DIRECTIONS.forEach(dir => {

            const exit =
                exits[dir] || {}

            const row =
                document.createElement('div')

            row.className =
                'exitRow'

            row.innerHTML = `

                <div class="exitTop">

                    <div class="exitDirection">

                        ${dir}

                    </div>

                    <input
                        id="exit_${dir}"
                        type="number"
                        placeholder="Destination VNUM"
                        value="${exit.to || ''}"
                    >

                    <input
                        id="exit_${dir}_key"
                        class="exitKey"
                        type="number"
                        placeholder="Key ID"
                        value="${exit.key || ''}"
                    >

                </div>

                <div class="exitFlags">

                    <label class="exitFlag">

                        <input
                            id="exit_${dir}_door"
                            type="checkbox"
                            ${exit.door ? 'checked' : ''}

                        >

                        Door

                    </label>

                    <label class="exitFlag">

                        <input
                            id="exit_${dir}_closed"
                            type="checkbox"
                            ${exit.closed ? 'checked' : ''}

                        >

                        Closed

                    </label>

                    <label class="exitFlag">

                        <input
                            id="exit_${dir}_locked"
                            type="checkbox"
                            ${exit.locked ? 'checked' : ''}

                        >

                        Locked

                    </label>

                    <label class="exitFlag">

                        <input
                            id="exit_${dir}_hidden"
                            type="checkbox"
                            ${exit.hidden ? 'checked' : ''}

                        >

                        Hidden

                    </label>

                </div>
            `

            container.appendChild(row)
        })
    },

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

        document.getElementById(
            'room_vnum'
        ).value =
            room.vnum || ''

        document.getElementById(
            'room_name'
        ).value =
            room.name || ''

        document.getElementById(
            'room_area'
        ).value =
            room.area_id || ''

        document.getElementById(
            'room_region'
        ).value =
            room.region || ''

        document.getElementById(
            'room_long_desc'
        ).value =
            room.long_desc || ''

        this.buildExitEditor(room)
    },

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

    async saveRoom() {

        if (!this.currentRoom)
            return

        // ====================================
        // VNUM
        // ====================================

        this.currentRoom.vnum = Number(

            document.getElementById(
                'room_vnum'
            ).value
        )

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

        this.currentRoom.exits = {}

        EXIT_DIRECTIONS.forEach(dir => {

            const to =
                document.getElementById(
                    `exit_${dir}`
                ).value

            if (!to)
                return

            this.currentRoom.exits[dir] = {

                to: Number(to),

                key: Number(

                    document.getElementById(
                        `exit_${dir}_key`
                    ).value || 0
                ),

                door:

                    document.getElementById(
                        `exit_${dir}_door`
                    ).checked,

                closed:

                    document.getElementById(
                        `exit_${dir}_closed`
                    ).checked,

                locked:

                    document.getElementById(
                        `exit_${dir}_locked`
                    ).checked,

                hidden:

                    document.getElementById(
                        `exit_${dir}_hidden`
                    ).checked
            }
        })

        await DataManager.saveRoom(
            this.currentRoom
        )

        SidebarManager.renderRooms()

        Validator.validateWorld()

        MapRenderer.render()

        this.closeRoomModal()
    },

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

        Validator.validateWorld()

        MapRenderer.render()

        this.closeRoomModal()
    },

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

        const room = {

            vnum: maxVnum + 1,

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

        Validator.validateWorld()

        MapRenderer.render()

        this.openRoom(room)
    }
}
// ====================================
// static/js/modals.js
// ====================================

const ModalManager = {

    currentRoom: null,

    // ====================================
    // INIT
    // ====================================

    init() {

        const saveBtn =

            document.getElementById(
                'saveRoomBtn'
            )

        const closeBtn =

            document.getElementById(
                'closeRoomBtn'
            )

        const deleteBtn =

            document.getElementById(
                'deleteRoomBtn'
            )

        if (saveBtn) {

            saveBtn.addEventListener(

                'click',

                () => this.saveRoom()
            )
        }

        if (closeBtn) {

            closeBtn.addEventListener(

                'click',

                () => this.closeRoom()
            )
        }

        if (deleteBtn) {

            deleteBtn.addEventListener(

                'click',

                () => this.deleteCurrentRoom()
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

        if (!room)
            return

        this.currentRoom = room

        const modal =

            document.getElementById(
                'roomModal'
            )

        if (!modal)
            return

        modal.classList.add('active')

        // ====================================
        // BASIC
        // ====================================

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

            room.region_id || ''

        document.getElementById(
            'room_long_desc'
        ).value =

            room.long_desc || ''

        // ====================================
        // EXITS
        // ====================================

        this.renderExits(room)

        console.log(
            '[ROOM OPENED]',
            room.vnum
        )
    },

    // ====================================
    // CLOSE ROOM
    // ====================================

    closeRoom() {

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

        // ====================================
        // BASIC
        // ====================================

        this.currentRoom.vnum =

            Number(

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

        this.currentRoom.region_id =

            document.getElementById(
                'room_region'
            ).value

        this.currentRoom.long_desc =

            document.getElementById(
                'room_long_desc'
            ).value

        // ====================================
        // SAVE AREA
        // ====================================

        await DataManager.saveArea()

        SidebarManager.renderRooms()

        MapRenderer.render()

        console.log(
            '[ROOM SAVED]',
            this.currentRoom.vnum
        )

        this.closeRoom()
    },

    // ====================================
    // DELETE ROOM
    // ====================================

    async deleteCurrentRoom() {

        if (!this.currentRoom)
            return

        const confirmed = confirm(

            `Delete room ${this.currentRoom.vnum}?`
        )

        if (!confirmed)
            return

        const vnum =
            this.currentRoom.vnum

        AppState.rooms =

            AppState.rooms.filter(

                room =>
                    room.vnum !== vnum
            )

        await DataManager.saveArea()

        SidebarManager.renderRooms()

        MapRenderer.render()

        this.closeRoom()

        console.log(
            '[ROOM DELETED]',
            vnum
        )
    },

    // ====================================
    // CREATE ROOM
    // ====================================

    async createRoom(x = 120, y = 120) {

        const highestVnum =

            Math.max(

                0,

                ...AppState.rooms.map(

                    r => Number(r.vnum)
                )
            )

        const newRoom = {

            vnum:
                highestVnum + 1,

            name:
                'Nuova Room',

            area_id:
                'starting_village',

            region_id:
                'starting_zone',

            short_desc:
                '',

            long_desc:
                '',

            coords: {

                x,
                y,
                z: 0
            },

            exits: {},

            mobs: [],

            items: [],

            flags: [],

            scripts: []
        }

        AppState.rooms.push(
            newRoom
        )

        await DataManager.saveArea()
        if (typeof Validator !== 'undefined') {

            Validator.validateWorld()
        }

        SidebarManager.renderRooms()

        MapRenderer.render()

        this.openRoom(newRoom)

        console.log(
            '[ROOM CREATED]',
            newRoom.vnum
        )
    },

    // ====================================
    // RENDER EXITS
    // ====================================

    renderExits(room) {

        const container =

            document.getElementById(
                'exitEditor'
            )

        if (!container)
            return

        container.innerHTML = ''

        const exits =
            room.exits || {}

        Object.entries(exits)

            .forEach(([dir, exit]) => {

                const row =
                    document.createElement('div')

                row.className =
                    'exitRow'

                row.innerHTML = `

                    <strong>${dir}</strong>

                    → ${exit.to}

                    ${exit.locked ? '🔒' : ''}

                    ${exit.closed ? '🚪' : ''}

                    ${exit.hidden ? '👁️' : ''}
                `

                container.appendChild(row)
            })
    }
}
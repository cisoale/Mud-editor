// ====================================
// static/js/sidebar.js
// ====================================

const SidebarManager = {

    // ====================================
    // RENDER ALL
    // ====================================

    render() {

        this.renderAreas()

        this.renderRooms()
    },

    // ====================================
    // AREAS
    // ====================================

    renderAreas() {

        const container =

            document.getElementById(
                'areasSidebar'
            )

        if (!container)
            return

        container.innerHTML = ''

        if (
            !AppState.areas.length
        ) {

            container.innerHTML = `

    < div class="emptyPanel" >

        No areas loaded

                </div >
    `

            return
        }

        AppState.areas.forEach(area => {

            const div =
                document.createElement('div')

            div.className =
                'room-item area-item'

            // ====================================
            // ACTIVE AREA
            // ====================================

            if (

                AppState.currentArea &&

                AppState.currentArea.id ===
                area.id
            ) {

                div.classList.add(
                    'active'
                )
            }

            // ====================================
            // ROOM COUNT
            // ====================================

            const roomCount =

                Array.isArray(area.rooms)

                    ? area.rooms.length

                    : 0

            div.innerHTML = `

    < div class="areaHeader" >

        <strong>

            ${area.name || area.id}

        </strong>

                </div >

    <div class="areaMeta">

        ${roomCount} rooms

    </div>
`

            // ====================================
            // CLICK
            // ====================================

            div.addEventListener(
                'click',
                async () => {

                    await DataManager.switchArea(
                        area.id
                    )
                }
            )

            container.appendChild(div)
        })

        // ====================================
        // CREATE AREA BUTTON
        // ====================================

        const createBtn =
            document.createElement('button')

        createBtn.id =
            'createAreaSidebarBtn'

        createBtn.innerText =
            '+ New Area'

        createBtn.addEventListener(
            'click',
            async () => {

                await DataManager.createArea()

                this.renderAreas()
            }
        )

        container.appendChild(
            createBtn
        )
    },

    // ====================================
    // ROOMS
    // ====================================

    renderRooms() {

        const container =
            document.getElementById(
                'roomList'
            )

        if (!container)
            return

        container.innerHTML = ''

        if (
            !AppState.currentArea
        ) {

            container.innerHTML = `

    < div class="emptyPanel" >

        No area selected

                </div >
    `

            return
        }

        if (
            !AppState.rooms.length
        ) {

            container.innerHTML = `

    < div class="emptyPanel" >

        No rooms in area

                </div >
    `

            return
        }

        // ====================================
        // SORT BY VNUM
        // ====================================

        const rooms =

            [...AppState.rooms]

                .sort(

                    (a, b) =>

                        Number(a.vnum) -

                        Number(b.vnum)
                )

        rooms.forEach(room => {

            const div =
                document.createElement('div')

            div.className =
                'room-item'

            // ====================================
            // ACTIVE ROOM
            // ====================================

            if (
                AppState.selectedRoom === room
            ) {

                div.classList.add(
                    'active'
                )
            }

            // ====================================
            // ROOM INFO
            // ====================================

            const exits =
                room.exits || {}

            const exitCount =
                Object.keys(exits).length

            div.innerHTML = `

    < div class="roomHeader" >

        <strong>

            ${room.vnum}

        </strong>

                </div >

                <div class="roomName">

                    ${room.name || 'Unnamed Room'}

                </div>

                <div class="roomMeta">

                    ${exitCount} exits

                </div>
`

            // ====================================
            // CLICK
            // ====================================

            div.addEventListener(
                'click',
                () => {

                    AppState.selectedRoom =
                        room

                    MapRenderer.render()

                    this.renderRooms()
                }
            )

            // ====================================
            // DOUBLE CLICK
            // ====================================

            div.addEventListener(
                'dblclick',
                () => {

                    ModalManager.openRoom(
                        room
                    )
                }
            )

            container.appendChild(div)
        })
    }
}

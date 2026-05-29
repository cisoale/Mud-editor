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

        this.renderInspector()
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

        // ====================================
        // EMPTY
        // ====================================

        if (
            !AppState.areas ||
            !AppState.areas.length
        ) {

            container.innerHTML = `
    <div class="emptyPanel">
        No areas loaded
                </div>
    `

            return
        }

        // ====================================
        // AREA ITEMS
        // ====================================

        AppState.areas.forEach(area => {

            const div =
                document.createElement('div')

            div.className =
                'area-item'

            // ====================================
            // ACTIVE
            // ====================================

            if (
                AppState.currentArea &&
                AppState.currentArea.id === area.id
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
                    : (
                        area.room_count || 0
                    )

            // ====================================
            // HTML
            // ====================================

            div.innerHTML = `
    <div class="areaHeader">

        <strong>
            ${area.name || area.id}
        </strong>

                </div>

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

                    AppState.selectedRoom =
                        null

                    await DataManager.switchArea(
                        area.id
                    )

                    this.render()

                    MapRenderer.render()
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

        // ====================================
        // NO AREA
        // ====================================

        if (!AppState.currentArea) {

            container.innerHTML = `
    <div class="emptyPanel">
        No area selected
                </div>
    `

            return
        }

        // ====================================
        // EMPTY
        // ====================================

        if (
            !AppState.rooms ||
            !AppState.rooms.length
        ) {

            container.innerHTML = `
    <div class="emptyPanel">
        No rooms in area
                </div>
    `

            return
        }

        // ====================================
        // SORT
        // ====================================

        const rooms =
            [...AppState.rooms]

                .sort(
                    (a, b) =>
                        Number(a.vnum) -
                        Number(b.vnum)
                )

        // ====================================
        // ROOM ITEMS
        // ====================================

        rooms.forEach(room => {

            const div =
                document.createElement('div')

            div.className =
                'room-item'

            // ====================================
            // ACTIVE
            // ====================================

            if (
                AppState.selectedRoom === room
            ) {

                div.classList.add(
                    'active'
                )
            }

            // ====================================
            // EXITS
            // ====================================

            const exits =
                room.exits || {}

            const exitCount =
                Object.keys(exits).length

            // ====================================
            // HTML
            // ====================================

            div.innerHTML = `
    <div class="roomHeader">

        <strong>
            ${room.vnum}
        </strong>

                </div>

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

                    // Focus camera temporaneamente disattivato

                    this.renderRooms()

                    this.renderInspector()

                    MapRenderer.render()
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
    },

    // ====================================
    // INSPECTOR
    // ====================================

    renderInspector() {

        const panel =
            document.getElementById(
                'inspectorPanel'
            )

        if (!panel)
            return

        const room =
            AppState.selectedRoom

        // ====================================
        // NO ROOM
        // ====================================

        if (!room) {

            panel.innerHTML = `
    <div class="emptyPanel">
        No room selected
                </div>
    `

            return
        }

        // ====================================
        // EXITS
        // ====================================

        const exits =
            room.exits || {}

        const exitList =

            Object.entries(exits)

                .map(([dir, exit]) => {

                    return `
    <div class="inspectorExit">

                            <span>
                                ${dir}
                            </span>

                            <span>
                                → ${exit.to}
                            </span>

                        </div>
    `
                })

                .join('')

        // ====================================
        // HTML
        // ====================================

        panel.innerHTML = `
    <div class="inspectorBlock">

                <div class="inspectorLabel">
                    VNUM
                </div>

                <div class="inspectorTitle">
                    ${room.vnum}
                </div>

            </div>

            <div class="inspectorBlock">

                <div class="inspectorLabel">
                    Name
                </div>

                <input
                    id="quickRoomName"
                    class="inspectorInput"
                    value="${room.name || ''}"
                >

            </div>

            <div class="inspectorBlock">

                <div class="inspectorLabel">
                    Region
                </div>

                <input
                    id="quickRoomRegion"
                    class="inspectorInput"
                    value="${room.region_id || ''}"
                >

            </div>

            <div class="inspectorBlock">

                <div class="inspectorLabel">
                    Coordinates
                </div>

                <div class="coordGrid">

                    <input
                        id="quickRoomX"
                        type="number"
                        class="inspectorInput"
                        value="${room.coords?.x || 0}"
                    >

                    <input
                        id="quickRoomY"
                        type="number"
                        class="inspectorInput"
                        value="${room.coords?.y || 0}"
                    >

                    <input
                        id="quickRoomZ"
                        type="number"
                        class="inspectorInput"
                        value="${room.coords?.z || 0}"
                    >

                </div>

            </div>

            <div class="inspectorBlock">

                <div class="inspectorLabel">
                    Exits
                </div>

                <div class="inspectorExitList">

                    ${exitList || '<span class="inspectorMuted">No exits</span>'}

                </div>

            </div>

            <div class="inspectorBlock">

                <button class="inspectorEditBtn">

                    Open Advanced Editor

                </button>

            </div>
        `

        // ====================================
        // INPUTS
        // ====================================

        const nameInput =
            document.getElementById(
                'quickRoomName'
            )

        const regionInput =
            document.getElementById(
                'quickRoomRegion'
            )

        const xInput =
            document.getElementById(
                'quickRoomX'
            )

        const yInput =
            document.getElementById(
                'quickRoomY'
            )

        const zInput =
            document.getElementById(
                'quickRoomZ'
            )

        // ====================================
        // SAVE HELPER
        // ====================================

        const save = async () => {

            await DataManager.saveCurrentArea()

            this.renderRooms()

            MapRenderer.render()

            if (
                typeof Validator !==
                'undefined'
            ) {

                Validator.validateWorld()
            }
        }

        // ====================================
        // NAME
        // ====================================

        nameInput?.addEventListener(
            'input',
            async () => {

                room.name =
                    nameInput.value

                await save()
            }
        )

        // ====================================
        // REGION
        // ====================================

        regionInput?.addEventListener(
            'input',
            async () => {

                room.region_id =
                    regionInput.value

                await save()
            }
        )

        // ====================================
        // X
        // ====================================

        xInput?.addEventListener(
            'input',
            async () => {

                room.coords.x =
                    Number(xInput.value)

                await save()
            }
        )

        // ====================================
        // Y
        // ====================================

        yInput?.addEventListener(
            'input',
            async () => {

                room.coords.y =
                    Number(yInput.value)

                await save()
            }
        )

        // ====================================
        // Z
        // ====================================

        zInput?.addEventListener(
            'input',
            async () => {

                room.coords.z =
                    Number(zInput.value)

                await save()
            }
        )

        // ====================================
        // ADVANCED EDITOR
        // ====================================

        const editBtn =
            panel.querySelector(
                '.inspectorEditBtn'
            )

        if (editBtn) {

            editBtn.addEventListener(
                'click',
                () => {

                    ModalManager.openRoom(
                        room
                    )
                }
            )
        }
    }
}
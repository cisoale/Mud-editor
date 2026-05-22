const SidebarManager = {

    // ====================================
    // UPDATE
    // ====================================

    update() {

        this.renderAreas()

        this.renderMobs()

        this.renderRegions()
    },

    // ====================================
    // RENDER AREAS
    // ====================================

    renderAreas() {

        const container =
            document.getElementById(
                'areasSidebar'
            )

        if (!container)
            return

        container.innerHTML = ''

        // =================================
        // GROUP ROOMS BY AREA
        // =================================

        const groupedAreas = {}

        AppState.rooms.forEach(room => {

            const areaId =

                room.area_id ||

                'unknown'

            if (!groupedAreas[areaId]) {

                groupedAreas[areaId] = []
            }

            groupedAreas[areaId].push(room)
        })

        console.log(
            '[GROUPED AREAS]',
            groupedAreas
        )

        // =================================
        // NO AREAS
        // =================================

        const areaKeys =
            Object.keys(groupedAreas)

        if (areaKeys.length === 0) {

            container.innerHTML = `

                <div class="emptySidebar">

                    No areas loaded

                </div>
            `

            return
        }

        // =================================
        // RENDER AREAS
        // =================================

        areaKeys

            .sort()

            .forEach(areaId => {

                const rooms =
                    groupedAreas[areaId]

                // =========================
                // AREA BLOCK
                // =========================

                const areaBlock =
                    document.createElement('div')

                areaBlock.className =
                    'areaBlock'

                // =========================
                // HEADER
                // =========================

                const header =
                    document.createElement('div')

                header.className =
                    'areaHeader'

                header.innerHTML = `

                    <div>

                        <div class="areaTitle">

                            ${areaId}

                        </div>

                        <div class="areaMeta">

                            ${rooms.length} rooms

                        </div>

                    </div>
                `

                areaBlock.appendChild(
                    header
                )

                // =========================
                // ROOM LIST
                // =========================

                const roomList =
                    document.createElement('div')

                roomList.className =
                    'areaRooms'

                rooms

                    .sort((a, b) => {

                        return (

                            Number(
                                a.vnum || a.id
                            ) -

                            Number(
                                b.vnum || b.id
                            )
                        )
                    })

                    .forEach(room => {

                        const roomId =

                            room.vnum ||

                            room.id ||

                            '?'

                        const roomEntry =
                            document.createElement('div')

                        roomEntry.className =
                            'areaRoomEntry'

                        // =====================
                        // SELECTED
                        // =====================

                        if (

                            AppState.selectedRoom &&

                            getRoomId(
                                AppState.selectedRoom
                            ) == roomId
                        ) {

                            roomEntry.classList.add(
                                'selected'
                            )
                        }

                        // =====================
                        // LABEL
                        // =====================

                        roomEntry.innerHTML = `

                            <span class="roomVnum">

                                ${roomId}

                            </span>

                            <span class="roomName">

                                ${room.name || 'Unnamed Room'}

                            </span>
                        `

                        // =====================
                        // CLICK
                        // =====================

                        roomEntry.onclick = () => {

                            AppState.selectedRoom =
                                room

                            AppState.offsetX =

                                400 - room.x

                            AppState.offsetY =

                                300 - room.y

                            MapRenderer.render()

                            SidebarManager.update()

                            console.log(
                                '[ROOM SELECT]',
                                roomId
                            )
                        }

                        // =====================
                        // DOUBLE CLICK
                        // =====================

                        roomEntry.ondblclick = () => {

                            openRoom(room)
                        }

                        roomList.appendChild(
                            roomEntry
                        )
                    })

                areaBlock.appendChild(
                    roomList
                )

                container.appendChild(
                    areaBlock
                )
            })
    },

    // ====================================
    // RENDER MOBS
    // ====================================

    renderMobs() {

        const container =
            document.getElementById(
                'mobs'
            )

        if (!container)
            return

        container.innerHTML = ''

        if (

            !AppState.mobs ||

            AppState.mobs.length === 0
        ) {

            container.innerHTML = `

                <div class="emptySidebar">

                    No mobs loaded

                </div>
            `

            return
        }

        AppState.mobs.forEach(mob => {

            const entry =
                document.createElement('div')

            entry.className =
                'entry'

            entry.innerHTML = `

                <span>

                    ${mob.vnum || '?'}

                </span>

                <span>

                    ${mob.name || 'Unnamed Mob'}

                </span>
            `

            container.appendChild(
                entry
            )
        })
    },

    // ====================================
    // RENDER REGIONS
    // ====================================

    renderRegions() {

        const container =
            document.getElementById(
                'regions'
            )

        if (!container)
            return

        container.innerHTML = ''

        const regions = {}

        AppState.rooms.forEach(room => {

            const region =
                room.region || 'unknown'

            regions[region] = true
        })

        Object.keys(regions)

            .sort()

            .forEach(region => {

                const entry =
                    document.createElement('div')

                entry.className =
                    'regionEntry'

                entry.innerText =
                    region

                container.appendChild(
                    entry
                )
            })
    }
}
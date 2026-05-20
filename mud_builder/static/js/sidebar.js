// ========================================
// SIDEBAR MANAGER
// ========================================

const SidebarManager = {

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

        console.log(
            '[AREAS]',
            AppState.areas
        )

        AppState.areas.forEach(area => {

            // =============================
            // AREA BLOCK
            // =============================

            const areaBlock =
                document.createElement('div')

            areaBlock.className =
                'areaBlock'

            // =============================
            // HEADER
            // =============================

            const header =
                document.createElement('div')

            header.className =
                'areaHeader'

            header.innerHTML = `

                <div>

                    <div class="areaTitle">
                        ${area.name}
                    </div>

                    <div class="areaMeta">
                        ${area.room_count} rooms
                    </div>

                </div>
            `

            areaBlock.appendChild(
                header
            )

            // =============================
            // ROOM LIST
            // =============================

            const roomList =
                document.createElement('div')

            roomList.className =
                'areaRooms'

            // =============================
            // DEBUG
            // =============================

            console.log(
                '[AREA ROOMS]',
                area.rooms
            )

            // =============================
            // NO ROOMS
            // =============================

            if (
                !area.rooms ||
                area.rooms.length === 0
            ) {

                const empty =
                    document.createElement('div')

                empty.innerText =
                    'No rooms'

                empty.style.opacity =
                    '0.6'

                empty.style.padding =
                    '8px'

                roomList.appendChild(
                    empty
                )
            }

            // =============================
            // ROOMS
            // =============================

            else {

                area.rooms.forEach(room => {

                    const roomEntry =
                        document.createElement('div')

                    roomEntry.className =
                        'areaRoomEntry'

                    roomEntry.innerText =

                        `${room.vnum} - ${room.name}`

                    roomEntry.onclick = () => {

                        console.log(
                            'ROOM CLICK',
                            room
                        )
                    }

                    roomList.appendChild(
                        roomEntry
                    )
                })
            }

            areaBlock.appendChild(
                roomList
            )

            container.appendChild(
                areaBlock
            )
        })
    },

    // ====================================
    // MOBS
    // ====================================

    renderMobs() {

        const container =
            document.getElementById(
                'mobs'
            )

        if (!container)
            return

        container.innerHTML = ''

        AppState.mobs.forEach(mob => {

            const entry =
                document.createElement('div')

            entry.className =
                'entry'

            entry.innerText =

                `${mob.vnum} - ${mob.name}`

            container.appendChild(
                entry
            )
        })
    },

    // ====================================
    // REGIONS
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
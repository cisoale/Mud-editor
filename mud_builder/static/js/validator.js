const Validator = {

    collapsed: false,

    init() {

        const header =
            document.getElementById(
                'validatorHeader'
            )

        if (!header)
            return

        header.addEventListener(
            'click',
            () => {

                this.collapsed =
                    !this.collapsed

                const wrapper =
                    document.getElementById(
                        'validatorWrapper'
                    )

                if (!wrapper)
                    return

                wrapper.classList.toggle(
                    'validatorCollapsed'
                )
            }
        )
    },

    validateWorld() {

        const panel =
            document.getElementById(
                'validationPanel'
            )

        const count =
            document.getElementById(
                'validatorCount'
            )

        if (!panel)
            return

        panel.innerHTML = ''

        let issues = 0

        const rooms =
            AppState.rooms || []

        const roomMap = {}

        rooms.forEach(room => {

            roomMap[
                room.vnum
            ] = room
        })

        const reverseMap = {

            north: 'south',
            south: 'north',

            east: 'west',
            west: 'east',

            up: 'down',
            down: 'up'
        }

        const addItem = (
            type,
            text,
            room
        ) => {

            issues++

            const item =
                document.createElement('div')

            item.className =

                `validationItem ${type}`

            item.innerText = text

            item.addEventListener(
                'click',
                () => {

                    AppState.selectedRoom =
                        room

                    AppState.offsetX =

                        canvas.width / 2 -
                        room.coords.x

                    AppState.offsetY =

                        canvas.height / 2 -
                        room.coords.y

                    SidebarManager.renderRooms()

                    MapRenderer.render()

                    ModalManager.openRoom(
                        room
                    )
                }
            )

            panel.appendChild(item)
        }

        rooms.forEach(room => {

            const exits =
                room.exits || {}

            Object.entries(exits)

                .forEach(([dir, exit]) => {

                    // =============================
                    // BROKEN EXIT
                    // =============================

                    if (
                        !roomMap[exit.to]
                    ) {

                        addItem(

                            'validationError',

                            `[BROKEN EXIT]
${room.vnum}
${dir}
→
${exit.to}`,

                            room
                        )

                        return
                    }

                    // =============================
                    // SELF LOOP
                    // =============================

                    if (
                        Number(exit.to) ===
                        Number(room.vnum)
                    ) {

                        addItem(

                            'validationError',

                            `[SELF LOOP]
${room.vnum}
${dir}`,

                            room
                        )
                    }

                    // =============================
                    // REVERSE CHECK
                    // =============================

                    const target =
                        roomMap[exit.to]

                    const reverse =
                        reverseMap[dir]

                    if (!reverse)
                        return

                    const targetExit =
                        target.exits?.[
                        reverse
                        ]

                    if (!targetExit) {

                        addItem(

                            'validationWarning',

                            `[MISSING REVERSE]
${room.vnum}
${dir}
→
${target.vnum}`,

                            room
                        )
                    }
                })
        })

        if (count) {

            count.innerText =
                issues
        }
    }
}
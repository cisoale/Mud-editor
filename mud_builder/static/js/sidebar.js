const SidebarManager = {

    renderRooms() {

        const container =
            document.getElementById(
                'roomList'
            )

        if (!container)
            return

        container.innerHTML = ''

        AppState.rooms.forEach(room => {

            const div =
                document.createElement('div')

            div.className =
                'room-item'

            if (
                AppState.selectedRoom === room
            ) {

                div.classList.add(
                    'active'
                )
            }

            div.innerHTML = `

                <strong>
                    ${room.vnum}
                </strong>

                <br>

                ${room.name || 'Unnamed'}
            `

            // =========================
            // CLICK
            // =========================

            div.addEventListener(
                'click',
                () => {

                    AppState.selectedRoom =
                        room

                    MapRenderer.render()

                    this.renderRooms()
                }
            )

            // =========================
            // DOUBLE CLICK
            // =========================

            div.addEventListener(
                'dblclick',
                () => {

                    RoomEditor.open(room)
                }
            )

            container.appendChild(div)
        })
    }
}
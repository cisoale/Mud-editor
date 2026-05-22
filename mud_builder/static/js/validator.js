const WorldValidator = {

    // ====================================
    // STATE
    // ====================================

    errors: [],

    warnings: [],

    roomIssues: {},

    // ====================================
    // VALID EXITS
    // ====================================

    validDirections: [

        'north',
        'south',
        'east',
        'west',

        'up',
        'down',

        'northeast',
        'northwest',

        'southeast',
        'southwest'
    ],

    // ====================================
    // VALIDATE ALL
    // ====================================

    validate() {

        this.errors = []

        this.warnings = []

        this.roomIssues = {}

        if (!AppState.rooms)
            return

        const roomIds = new Set()

        const coordsMap = {}

        // =============================
        // ROOM LOOP
        // =============================

        AppState.rooms.forEach(room => {

            this.validateRoom(
                room,
                roomIds,
                coordsMap
            )
        })

        // =============================
        // UI
        // =============================

        this.renderPanel()

        // =============================
        // RENDER
        // =============================

        if (MapRenderer.render) {

            MapRenderer.render()
        }

        console.log(

            `[VALIDATOR] ` +

            `${this.errors.length} errors, ` +

            `${this.warnings.length} warnings`
        )
    },

    // ====================================
    // VALIDATE ROOM
    // ====================================

    validateRoom(
        room,
        roomIds,
        coordsMap
    ) {

        const roomId =
            room.id

        // =============================
        // ISSUE CONTAINER
        // =============================

        if (!this.roomIssues[roomId]) {

            this.roomIssues[roomId] = {

                errors: [],
                warnings: []
            }
        }

        // =================================
        // ID
        // =================================

        if (

            roomId === undefined ||

            roomId === null
        ) {

            this.addError(

                room,

                'Room senza ID'
            )
        }

        // =================================
        // DUPLICATE ID
        // =================================

        if (

            roomIds.has(roomId)
        ) {

            this.addError(

                room,

                `ID duplicato: ${roomId}`
            )
        }

        roomIds.add(roomId)

        // =================================
        // NAME
        // =================================

        if (

            !room.name ||

            room.name.trim() === ''
        ) {

            this.addWarning(

                room,

                'Nome room mancante'
            )
        }

        // =================================
        // DESCRIPTION
        // =================================

        if (

            !room.description ||

            room.description.trim() === ''
        ) {

            this.addWarning(

                room,

                'Descrizione mancante'
            )
        }

        // =================================
        // COORDS
        // =================================

        if (!room.coords) {

            this.addError(

                room,

                'Coords mancanti'
            )

        } else {

            const x =
                room.coords.x

            const y =
                room.coords.y

            const z =
                room.coords.z

            if (

                x === undefined ||

                y === undefined ||

                z === undefined
            ) {

                this.addError(

                    room,

                    'Coordinate incomplete'
                )
            }

            const coordKey =
                `${x}:${y}:${z}`

            if (

                coordsMap[coordKey]
            ) {

                this.addWarning(

                    room,

                    `Coordinate duplicate con room ${coordsMap[coordKey]}`
                )

            } else {

                coordsMap[coordKey] =
                    room.id
            }
        }

        // =================================
        // REGION
        // =================================

        if (

            !room.region ||

            room.region.trim() === ''
        ) {

            this.addWarning(

                room,

                'Region mancante'
            )
        }

        // =================================
        // EXITS
        // =================================

        if (room.exits) {

            Object.entries(
                room.exits
            ).forEach(

                ([direction, targetId]) => {

                    // =====================
                    // INVALID DIRECTION
                    // =====================

                    if (

                        !this.validDirections.includes(
                            direction
                        )
                    ) {

                        this.addWarning(

                            room,

                            `Exit invalida: ${direction}`
                        )
                    }

                    // =====================
                    // TARGET EXISTS
                    // =====================

                    const targetRoom =
                        AppState.rooms.find(

                            r => r.id == targetId
                        )

                    if (!targetRoom) {

                        this.addError(

                            room,

                            `Exit ${direction} -> ${targetId} inesistente`
                        )
                    }

                    // =====================
                    // SELF LOOP
                    // =====================

                    if (

                        room.id == targetId
                    ) {

                        this.addWarning(

                            room,

                            `Exit ${direction} punta a se stessa`
                        )
                    }
                }
            )
        }
    },

    // ====================================
    // ADD ERROR
    // ====================================

    addError(room, message) {

        this.errors.push({

            roomId: room.id,

            message
        })

        this.roomIssues[room.id]
            .errors
            .push(message)

        console.error(

            `[ROOM ${room.id}] ${message}`
        )
    },

    // ====================================
    // ADD WARNING
    // ====================================

    addWarning(room, message) {

        this.warnings.push({

            roomId: room.id,

            message
        })

        this.roomIssues[room.id]
            .warnings
            .push(message)

        console.warn(

            `[ROOM ${room.id}] ${message}`
        )
    },

    // ====================================
    // ROOM HAS ERROR
    // ====================================

    roomHasErrors(roomId) {

        const issues =
            this.roomIssues[roomId]

        if (!issues)
            return false

        return (
            issues.errors.length > 0
        )
    },

    // ====================================
    // ROOM HAS WARNINGS
    // ====================================

    roomHasWarnings(roomId) {

        const issues =
            this.roomIssues[roomId]

        if (!issues)
            return false

        return (
            issues.warnings.length > 0
        )
    },

    // ====================================
    // GET ROOM ISSUES
    // ====================================

    getRoomIssues(roomId) {

        return this.roomIssues[roomId] || {

            errors: [],
            warnings: []
        }
    },

    // ====================================
    // RENDER PANEL
    // ====================================

    renderPanel() {

        const panel = document.getElementById(
            'validation-panel'
        )

        if (!panel)
            return

        panel.innerHTML = ''

        // =============================
        // HEADER
        // =============================

        const header =
            document.createElement('div')

        header.className =
            'validation-header'

        header.innerHTML = `

            <div class="validation-title">
                Validation
            </div>

            <div class="validation-counts">

                <span class="validation-errors">
                    ❌ ${this.errors.length}
                </span>

                <span class="validation-warnings">
                    ⚠ ${this.warnings.length}
                </span>

            </div>
        `

        panel.appendChild(header)

        // =============================
        // ERRORS
        // =============================

        this.errors.forEach(error => {

            const row =
                document.createElement('div')

            row.className =
                'validation-row validation-error'

            row.innerHTML = `

                <strong>
                    Room ${error.roomId}
                </strong>

                <div>
                    ${error.message}
                </div>
            `

            panel.appendChild(row)
        })

        // =============================
        // WARNINGS
        // =============================

        this.warnings.forEach(warning => {

            const row =
                document.createElement('div')

            row.className =
                'validation-row validation-warning'

            row.innerHTML = `

                <strong>
                    Room ${warning.roomId}
                </strong>

                <div>
                    ${warning.message}
                </div>
            `

            panel.appendChild(row)
        })
    }
}
// ====================================
// static/js/modals.js
// ====================================

const ModalManager = {

    currentRoom: null,

    currentTab: 'generalTab',

    autoSaveTimer: null,

    editingMob: null,

    directions: [

        'north',
        'south',

        'east',
        'west',

        'up',
        'down'
    ],

    reverseDirections: {

        north: 'south',
        south: 'north',

        east: 'west',
        west: 'east',

        up: 'down',
        down: 'up'
    },

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

        const addExitBtn =

            document.getElementById(
                'addExitBtn'
            )

        const newMobBtn =

            document.getElementById(
                'newMobBtn'
            )

        const mobBrowserBtn =

            document.getElementById(
                'mobBrowserBtn'
            )

        const closeMobBrowserBtn =

            document.getElementById(
                'closeMobBrowserBtn'
            )

        const saveMobBtn =

            document.getElementById(
                'saveMobBtn'
            )

        const closeMobBtn =

            document.getElementById(
                'closeMobBtn'
            )

        const addStaticNpcBtn =

            document.getElementById(
                'addStaticNpcBtn'
            )
        // ====================================
        // BUTTONS
        // ====================================

        if (saveBtn) {

            saveBtn.addEventListener(

                'click',

                () => this.forceSave()
            )
        }

        if (closeBtn) {

            closeBtn.addEventListener(

                'click',

                () => this.closeRoom()
            )
        }

        if (closeMobBtn) {

            closeMobBtn.addEventListener(

                'click',

                () => {

                    document
                        .getElementById(
                            'mobModal'
                        )
                        .classList.remove(
                            'active'
                        )

                }
            )
        }

        if (saveMobBtn) {

            saveMobBtn.addEventListener(

                'click',

                () => {

                    console.log(
                        '[SAVE MOB]',
                        this.editingMob
                    )

                    const mobId =

                        document
                            .getElementById(
                                'mob_id'
                            )
                            .value
                            .trim()

                    const mobName =

                        document
                            .getElementById(
                                'mob_name'
                            )
                            .value
                            .trim()

                    const mobLevel =

                        Number(

                            document
                                .getElementById(
                                    'mob_level'
                                )
                                .value
                        )

                    if (!mobId || !mobName) {

                        alert(
                            'ID e Nome obbligatori'
                        )

                        return
                    }

                    fetch(

                        '/api/mob',

                        {

                            method: 'POST',

                            headers: {

                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify({

                                vnum: mobId,

                                id: mobId,

                                name: mobName,

                                short_desc: mobName,

                                long_desc: mobName,

                                level: mobLevel,

                                hp: 100,

                                xp_reward: 0
                            })
                        }

                    )

                        .then(response => response.json())

                        .then(data => {

                            if (data.error) {

                                alert(
                                    data.error
                                )

                                return
                            }

                            alert(
                                `Mob ${mobId} creato`
                            )
                            document.getElementById('mob_id').value = ''
                            document.getElementById('mob_name').value = ''
                            document.getElementById('mob_level').value = 1
                            document
                                .getElementById(
                                    'mobModal'
                                )
                                .classList.remove(
                                    'active'
                                )

                        })

                        .catch(error => {

                            console.error(
                                error
                            )

                        })

                }

            )

        }

        
        if (deleteBtn) {

            deleteBtn.addEventListener(

                'click',

                () => this.deleteCurrentRoom()
            )
        }

        if (addExitBtn) {

            addExitBtn.addEventListener(

                'click',

                () => this.showAddExitDialog()
            )
        }

        if (addStaticNpcBtn) {

            addStaticNpcBtn.addEventListener(

                'click',

                () => {

                    const npc = prompt(
                        'Nome NPC statico:'
                    )

                    if (!npc)
                        return

                    this.currentRoom.static_npcs ||= []

                    this.currentRoom.static_npcs.push(
                        npc.trim()
                    )

                    console.log(
                        '[STATIC NPC ADDED]',
                        npc
                    )

                    this.renderStaticNpcs(
                        this.currentRoom
                    )

                    this.queueAutoSave()

                }
            )
        }
        if (newMobBtn) {

            newMobBtn.addEventListener(

                    'click',

                () => {

                    this.editingMob = null

                    document
                        .getElementById(
                            'mobModal'
                        )
                        .classList.add(
                            'active'
                        )

                }
                
            )
        }
        if (mobBrowserBtn) {

            mobBrowserBtn.addEventListener(

                'click',

                async () => {

                    await this.loadMobBrowser()

                    document
                        .getElementById(
                            'mobBrowserModal'
                        )
                        .classList.add(
                            'active'
                        )

                }

            )

        }
        if (closeMobBrowserBtn) {

            closeMobBrowserBtn.addEventListener(

                'click',

                () => {

                    document
                        .getElementById(
                            'mobBrowserModal'
                        )
                        .classList.remove(
                            'active'
                        )

                }

            )

        }

        // ====================================
        // TABS
        // ====================================

        this.setupTabs()

        console.log(
            '[MODALS READY]'
        )
    },

    // ====================================
    // AUTO SAVE
    // ====================================

    queueAutoSave() {

        clearTimeout(
            this.autoSaveTimer
        )

        this.autoSaveTimer =

            setTimeout(

                async () => {

                    await DataManager.saveArea()

                    SidebarManager.renderRooms()

                    MapRenderer.render()

                    if (
                        typeof Validator !==
                        'undefined'
                    ) {

                        Validator.validateWorld()
                    }

                    console.log(
                        '[AUTO SAVE]'
                    )

                },

                500
            )
    },

    // ====================================
    // FORCE SAVE
    // ====================================

    async forceSave() {

        clearTimeout(
            this.autoSaveTimer
        )

        await DataManager.saveArea()

        SidebarManager.renderRooms()

        MapRenderer.render()

        if (
            typeof Validator !==
            'undefined'
        ) {

            Validator.validateWorld()
        }

        console.log(
            '[FORCE SAVE]'
        )
    },

    // ====================================
    // TABS
    // ====================================

    setupTabs() {

        const tabs =

            document.querySelectorAll(
                '.editorTab'
            )

        tabs.forEach(tab => {

            tab.addEventListener(

                'click',

                () => {

                    const target =
                        tab.dataset.tab

                    document
                        .querySelectorAll(
                            '.editorTab'
                        )
                        .forEach(t => {

                            t.classList.remove(
                                'active'
                            )
                        })

                    document
                        .querySelectorAll(
                            '.editorPanel'
                        )
                        .forEach(panel => {

                            panel.classList.remove(
                                'active'
                            )
                        })

                    tab.classList.add(
                        'active'
                    )

                    const panel =

                        document.getElementById(
                            target
                        )

                    if (panel) {

                        panel.classList.add(
                            'active'
                        )
                    }

                    this.currentTab =
                        target
                }
            )
        })
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
        // RESET TABS
        // ====================================

        document
            .querySelectorAll(
                '.editorTab'
            )
            .forEach(tab => {

                tab.classList.remove(
                    'active'
                )
            })

        document
            .querySelectorAll(
                '.editorPanel'
            )
            .forEach(panel => {

                panel.classList.remove(
                    'active'
                )
            })

        const firstTab =

            document.querySelector(
                '.editorTab'
            )

        const firstPanel =

            document.getElementById(
                'generalTab'
            )

        if (firstTab) {

            firstTab.classList.add(
                'active'
            )
        }

        if (firstPanel) {

            firstPanel.classList.add(
                'active'
            )
        }

        // ====================================
        // BASIC
        // ====================================

        this.bindInput(

            'room_vnum',
            value => {

                room.vnum =
                    Number(value)
            },

            room.vnum || ''
        )

        this.bindInput(

            'room_name',
            value => {

                room.name =
                    value
            },

            room.name || ''
        )

        this.bindInput(

            'room_area',
            value => {

                room.area_id =
                    value
            },

            room.area_id || ''
        )

        this.bindInput(

            'room_region',
            value => {

                room.region_id =
                    value
            },

            room.region_id || ''
        )

        this.bindInput(

            'room_short_desc',
            value => {

                room.short_desc =
                    value
            },

            room.short_desc || ''
        )

        this.bindInput(

            'room_long_desc',
            value => {

                room.long_desc =
                    value
            },

            room.long_desc || ''
        )

        // ====================================
        // PANELS
        // ====================================

        this.renderExits(room)

        this.renderMobs(room)

        this.renderItems(room)

        this.renderScripts(room)

        this.renderStaticNpcs(room)

        console.log(
            '[ROOM OPENED]',
            room.vnum
        )
    },

    // ====================================
    // BIND INPUT
    // ====================================

    bindInput(
        id,
        callback,
        value
    ) {

        const input =

            document.getElementById(id)

        if (!input)
            return

        input.value = value

        input.oninput = () => {

            callback(
                input.value
            )

            this.queueAutoSave()
        }
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

        await this.forceSave()

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

        await this.forceSave()

        this.openRoom(newRoom)

        console.log(
            '[ROOM CREATED]',
            newRoom.vnum
        )
    },

    // ====================================
    // MOB BROWSER
    // ====================================

    async loadMobBrowser() {

        const response =

            await fetch(
                '/api/mobs'
            )

        const mobs =
            await response.json()

        const container =

            document.getElementById(
                'mobBrowserList'
            )

        if (!container)
            return

        container.innerHTML =

            mobs.map(mob => `

<div class="mobBrowserRow">

    <strong>

        ${mob.vnum}

    </strong>

    -

    ${mob.name || 'Unnamed Mob'}

    <button
        class="editMobBtn"
        data-vnum="${mob.vnum}">

        Edit

    </button>

    <button
    class="deleteMobBtn"
    data-vnum="${mob.vnum}">

    Delete

</button>

</div>

`).join('')

        container

            .querySelectorAll(
                '.editMobBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    async () => {

                        const vnum =

                            btn.dataset.vnum

                        const response =

                            await fetch(
                                `/api/mob/${vnum}`
                            )

                        const mob =

                            await response.json()
                        this.editingMob =
                            mob.vnum

                        document
                            .getElementById(
                                'mob_id'
                            )
                            .value =
                            mob.vnum || ''

                        document
                            .getElementById(
                                'mob_name'
                            )
                            .value =
                            mob.name || ''

                        document
                            .getElementById(
                                'mob_level'
                            )
                            .value =
                            mob.level || 1

                        document
                            .getElementById(
                                'mobBrowserModal'
                            )
                            .classList.remove(
                                'active'
                            )

                        document
                            .getElementById(
                                'mobModal'
                            )
                            .classList.add(
                                'active'
                            )

                        console.log(
                            '[EDIT MOB]',
                            vnum
                        )

                    }

                )
                
            })

        container

            .querySelectorAll(
                '.deleteMobBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    async () => {

                        console.log(
                            '[DELETE CLICK]',
                            btn.dataset.vnum
                        )

                        const vnum =

                            btn.dataset.vnum

                        const confirmed =

                            confirm(

                                `Delete mob ${vnum}?`
                            )

                        if (!confirmed)
                            return

                        const response =

                            await fetch(

                                `/api/mob/${vnum}`,

                                {
                                    method: 'DELETE'
                                }
                            )

                        const data =

                            await response.json()

                        if (data.error) {

                            alert(
                                data.error
                            )

                            return
                        }

                        console.log(
                            '[MOB DELETED]',
                            vnum
                        )

                        await this.loadMobBrowser()

                    }

                )

            })
    },

    // ====================================
    // ADD EXIT
    // ====================================

    showAddExitDialog() {

        if (!this.currentRoom)
            return

        const available =

            this.directions.filter(

                dir =>

                    !this.currentRoom
                        .exits?.[dir]
            )

        if (!available.length) {

            alert(
                'All directions already used.'
            )

            return
        }

        const dir = prompt(

            `Direction ?\n\n${available.join(', ')} `
        )

        if (!dir)
            return

        if (
            !available.includes(dir)
        ) {

            alert(
                'Invalid direction'
            )

            return
        }

        this.currentRoom.exits ||= {}

        this.currentRoom.exits[dir] = {

            to: 0,

            closed: false,

            locked: false,

            hidden: false
        }

        this.renderExits(
            this.currentRoom
        )

        this.queueAutoSave()
    },

    // ====================================
    // CREATE REVERSE EXIT
    // ====================================

    createReverseExit(
        direction,
        exit
    ) {

        if (!this.currentRoom)
            return

        const reverse =

            this.reverseDirections[
            direction
            ]

        if (!reverse)
            return

        const targetRoom =

            AppState.rooms.find(

                r =>

                    Number(r.vnum) ===

                    Number(exit.to)
            )

        if (!targetRoom)
            return

        targetRoom.exits ||= {}

        if (
            targetRoom.exits[
            reverse
            ]
        ) {

            alert(
                'Reverse exit already exists.'
            )

            return
        }

        targetRoom.exits[
            reverse
        ] = {

            to:
                this.currentRoom.vnum,

            closed:
                exit.closed,

            locked:
                exit.locked,

            hidden:
                exit.hidden
        }

        this.queueAutoSave()

        alert(
            'Reverse exit created.'
        )
    },

    // ====================================
    // EXITS
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

        if (
            !Object.keys(exits).length
        ) {

            container.innerHTML = `

    <div class="emptyPanel">

        No exits in room

                </div>
    `

            return
        }

        Object.entries(exits)

            .forEach(([dir, exit]) => {

                const card =
                    document.createElement('div')

                card.className =
                    'exitCard'

                card.innerHTML = `

    <div class="exitCardHeader">

                        <div class="exitBadge">

                            ${dir.toUpperCase()}

                        </div>

                        <button class="deleteExitBtn">

                            Delete

                        </button>

                    </div>

                    <div class="exitTarget">

                        <label>

                            Destination Room

                        </label>

                        <input
                            type="number"
                            class="exitTargetInput"
                            value="${exit.to || 0}"
                        >
                    </div>

                    <div class="exitFlags">

                        <label class="exitFlag">

                            <input
                                type="checkbox"
                                class="exitClosed"
                                ${exit.closed ? 'checked' : ''}
                            >

                            Closed

                        </label>

                        <label class="exitFlag">

                            <input
                                type="checkbox"
                                class="exitLocked"
                                ${exit.locked ? 'checked' : ''}
                            >

                            Locked

                        </label>

                        <label class="exitFlag">

                            <input
                                type="checkbox"
                                class="exitHidden"
                                ${exit.hidden ? 'checked' : ''}
                            >

                            Hidden

                        </label>

                    </div>

                    <div class="exitActions">

                        <button class="reverseExitBtn">

                            Create Reverse Exit

                        </button>

                    </div>
`

                const targetInput =
                    card.querySelector(
                        '.exitTargetInput'
                    )

                const closed =
                    card.querySelector(
                        '.exitClosed'
                    )

                const locked =
                    card.querySelector(
                        '.exitLocked'
                    )

                const hidden =
                    card.querySelector(
                        '.exitHidden'
                    )

                const deleteBtn =
                    card.querySelector(
                        '.deleteExitBtn'
                    )

                const reverseBtn =
                    card.querySelector(
                        '.reverseExitBtn'
                    )

                // ====================================
                // EVENTS
                // ====================================

                targetInput.addEventListener(
                    'input',
                    () => {

                        exit.to =
                            Number(
                                targetInput.value
                            )

                        this.queueAutoSave()
                    }
                )

                closed.addEventListener(
                    'change',
                    () => {

                        exit.closed =
                            closed.checked

                        this.queueAutoSave()
                    }
                )

                locked.addEventListener(
                    'change',
                    () => {

                        exit.locked =
                            locked.checked

                        this.queueAutoSave()
                    }
                )

                hidden.addEventListener(
                    'change',
                    () => {

                        exit.hidden =
                            hidden.checked

                        this.queueAutoSave()
                    }
                )

                deleteBtn.addEventListener(
                    'click',
                    () => {

                        const confirmed =
                            confirm(

                                `Delete ${dir} exit ? `
                            )

                        if (!confirmed)
                            return

                        delete room.exits[dir]

                        this.renderExits(room)

                        this.queueAutoSave()
                    }
                )

                reverseBtn.addEventListener(
                    'click',
                    () => {

                        this.createReverseExit(
                            dir,
                            exit
                        )
                    }
                )

                container.appendChild(
                    card
                )
            })
    },

    // ====================================
    // MOBS
    // ====================================

    renderMobs(room) {

        const container =

            document.getElementById(
                'roomMobEditor'
            )

        if (!container)
            return

        const mobs =
            room.mobs || []

        if (!mobs.length) {

            container.innerHTML = `

    <div class="emptyPanel">

        No mobs in room

                </div>
    `

            return
        }

        container.innerHTML = mobs

            .map(mob => {

                return `

    <div class="mobRow">

        ${mob}

                    </div>
    `
            })

            .join('')
    },

    // ====================================
    // ITEMS
    // ====================================

    renderItems(room) {

        const container =

            document.getElementById(
                'roomItemEditor'
            )

        if (!container)
            return

        const items =
            room.items || []

        if (!items.length) {

            container.innerHTML = `

    <div class="emptyPanel">

        No items in room

                </div>
    `

            return
        }

        container.innerHTML = items

            .map(item => {

                return `

    <div class="itemRow">

        ${item}

                    </div>
    `
            })

            .join('')
    },

    // ====================================
    // SCRIPTS
    // ====================================

    renderScripts(room) {

        const container =

            document.getElementById(
                'roomScriptEditor'
            )

        if (!container)
            return

        const scripts =
            room.scripts || []

        if (!scripts.length) {

            container.innerHTML = `

    <div class="emptyPanel">

        No scripts attached

    </div>
    `

            return
        }

        container.innerHTML = scripts

            .map(script => {

                return `

    <div class="scriptRow">

        ${script}

    </div>
    `
            })

            .join('')
    },


    renderStaticNpcs(room) {

        const container =
            document.getElementById(
                'staticNpcEditor'
            )

        if (!container)
            return

        const npcs =
            room.static_npcs || []

        if (!npcs.length) {

            container.innerHTML = `

    <div class="emptyPanel">

        No static NPCs

            </div>
    `

            return
        }

        container.innerHTML = npcs

            .map((npc, index) => `

<div class="mobRow">

    <span>

        ${npc}

    </span>

    <button
        class="removeStaticNpcBtn"
        data-index="${index}">

        Remove

    </button>

</div>

`)

            .join('')

        container

            .querySelectorAll(
                '.removeStaticNpcBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    () => {

                        const index =

                            Number(
                                btn.dataset.index
                            )

                        room.static_npcs.splice(
                            index,
                            1
                        )

                        this.renderStaticNpcs(
                            room
                        )

                        this.queueAutoSave()

                        console.log(
                            '[STATIC NPC REMOVED]'
                        )
                    }
                )
            })
    },
};
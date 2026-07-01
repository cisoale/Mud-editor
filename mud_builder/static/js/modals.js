// ====================================
// static/js/modals.js
// ====================================

const ModalManager = {

    currentRoom: null,

    currentTab: 'generalTab',

    autoSaveTimer: null,

    editingMob: null,

    selectingMobForRoom: false,

    selectingLootForMob: false,

    currentLootMob: null,

    editingItem: null,

    selectingItemForRoom: false,

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

        const newItemBtn =

            document.getElementById(
                'newItemBtn'
            )

        const itemBrowserBtn =

            document.getElementById(
                'itemBrowserBtn'
            )

        const closeItemBtn =

            document.getElementById(
                'closeItemBtn'
            )

        const closeItemBrowserBtn =

            document.getElementById(
                'closeItemBrowserBtn'
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

        const saveItemBtn =

            document.getElementById(
                'saveItemBtn'
            )

        const closeMobBtn =

            document.getElementById(
                'closeMobBtn'
            )

        const addStaticNpcBtn =

            document.getElementById(
                'addStaticNpcBtn'
            )

        const addMobToRoomBtn =

            document.getElementById(
                'addMobToRoomBtn'
            )

        const addItemToRoomBtn =

            document.getElementById(
                'addItemToRoomBtn'
            )

        const addLootBtn =

            document.getElementById(
                'addLootBtn'
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

                    const shortDesc =

                        document
                            .getElementById(
                                'mob_short_desc'
                            )
                            .value

                    const longDesc =

                        document
                            .getElementById(
                                'mob_long_desc'
                            )
                            .value

                    const mobHp =

                        Number(

                            document
                                .getElementById(
                                    'mob_hp'
                                )
                                .value
                        )

                    const mobXp =

                        Number(

                            document
                                .getElementById(
                                    'mob_xp_reward'
                                )
                                .value
                        )

                    const mobGold =

                        Number(

                            document
                                .getElementById(
                                    'mob_gold'
                                )
                                .value
                        )

                    if (!mobId || !mobName) {

                        alert(
                            'ID e Nome obbligatori'
                        )

                        return
                    }

                    const mobData = {

                        ...(this.currentLootMob || {}),

                        vnum: mobId,

                        id: mobId,

                        name: mobName,

                        short_desc: shortDesc,

                        long_desc: longDesc,

                        level: mobLevel,

                        hp: mobHp,

                        xp_reward: mobXp,

                        gold: mobGold,

                        position:

                            document
                                .getElementById(
                                    "mob_position"
                                )
                                .value,

                        loot_table:

                            this.currentLootMob
                                ?.loot_table || []

                    }

                    fetch(

                        '/api/mob',

                        {

                            method: 'POST',

                            headers: {

                                'Content-Type':
                                    'application/json'

                            },

                            body: JSON.stringify(
                                mobData
                            )

                        }

                    )

                        .then(response => response.json())

                        .then(async data => {

                            if (data.error) {

                                alert(
                                    data.error
                                )

                                return
                            }

                            alert(
                                `Mob ${mobId} creato`
                            )

                            await this.loadMobBrowser()

                            document.getElementById(
                                'mob_id'
                            ).value = ''

                            document.getElementById(
                                'mob_name'
                            ).value = ''

                            document.getElementById(
                                'mob_level'
                            ).value = 1

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

                        .catch(error => {

                            console.error(
                                error
                            )

                        })

                }

            )

        }

        if (saveItemBtn) {

            saveItemBtn.addEventListener(

                'click',

                () => {

                    const itemData = {

                        id:
                            document.getElementById(
                                'item_id'
                            ).value.trim(),

                        name:
                            document.getElementById(
                                'item_name'
                            ).value.trim(),

                        short_desc:
                            document.getElementById(
                                'item_short_desc'
                            ).value,

                        long_desc:
                            document.getElementById(
                                'item_long_desc'
                            ).value,

                        type:
                            document.getElementById(
                                'item_type'
                            ).value,

                        rarity:
                            document.getElementById(
                                'item_rarity'
                            ).value,

                        level:
                            Number(
                                document.getElementById(
                                    'item_level'
                                ).value
                            ),

                        value:
                            Number(
                                document.getElementById(
                                    'item_value'
                                ).value
                            ),

                        weight:
                            Number(
                                document.getElementById(
                                    'item_weight'
                                ).value
                            ),

                        slot:
                            document.getElementById(
                                'item_slot'
                            ).value,

                        requirements: {

                            level:
                                Number(
                                    document.getElementById(
                                        'item_required_level'
                                    ).value
                                )

                        },

                        stats: {

                            damage_min:
                                Number(
                                    document.getElementById(
                                        'item_damage_min'
                                    ).value
                                ),

                            damage_max:
                                Number(
                                    document.getElementById(
                                        'item_damage_max'
                                    ).value
                                ),

                            armor:
                                Number(
                                    document.getElementById(
                                        'item_armor'
                                    ).value
                                ),

                            heal_hp:
                                Number(
                                    document.getElementById(
                                        'item_heal_hp'
                                    ).value
                                ),

                            heal_mana:
                                Number(
                                    document.getElementById(
                                        'item_heal_mana'
                                    ).value
                                )

                        },

                        modifiers: {

                            strength:
                                Number(
                                    document.getElementById(
                                        'item_str'
                                    ).value
                                ),

                            dexterity:
                                Number(
                                    document.getElementById(
                                        'item_dex'
                                    ).value
                                ),

                            constitution:
                                Number(
                                    document.getElementById(
                                        'item_con'
                                    ).value
                                ),

                            intelligence:
                                Number(
                                    document.getElementById(
                                        'item_int'
                                    ).value
                                ),

                            wisdom:
                                Number(
                                    document.getElementById(
                                        'item_wis'
                                    ).value
                                ),

                            charisma:
                                Number(
                                    document.getElementById(
                                        'item_cha'
                                    ).value
                                ),

                            hp:
                                Number(
                                    document.getElementById(
                                        'item_hp_bonus'
                                    ).value
                                ),

                            mana:
                                Number(
                                    document.getElementById(
                                        'item_mana_bonus'
                                    ).value
                                )

                        }

                    }

                    if (!itemData.id || !itemData.name) {

                        alert(
                            'ID e Nome obbligatori'
                        )

                        return
                    }

                    fetch(

                        '/api/item',

                        {

                            method: 'POST',

                            headers: {

                                'Content-Type':
                                    'application/json'

                            },

                            body: JSON.stringify(
                                itemData
                            )
                                                                
                        }

                    )

                        .then(response => response.json())

                        .then(async data => {

                            if (data.error) {

                                alert(
                                    data.error
                                )

                                return
                            }

                            const browser =

                                document.getElementById(
                                    'itemBrowserModal'
                                )

                            if (
                                browser &&
                                browser.classList.contains(
                                    'active'
                                )
                            ) {

                                await this.loadItemBrowser()
                            }

                            alert(
                                `Item ${itemData.id} salvato`
                            )

                            document
                                .getElementById(
                                    'itemModal'
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

        if (addMobToRoomBtn) {

            addMobToRoomBtn.addEventListener(

                'click',

                async () => {

                    this.selectingMobForRoom = true

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

        if (addItemToRoomBtn) {

            addItemToRoomBtn.addEventListener(

                'click',

                async () => {

                    this.selectingItemForRoom = true

                    await this.loadItemBrowser()

                    document
                        .getElementById(
                            'itemBrowserModal'
                        )
                        .classList.add(
                            'active'
                        )

                }

            )

        }

        if (addLootBtn) {

            addLootBtn.addEventListener(

                'click',

                async () => {

                    if (!this.currentLootMob)
                        return

                    this.selectingLootForMob = true

                    await this.loadItemBrowser()

                    document
                        .getElementById(
                            'itemBrowserModal'
                        )
                        .classList.add(
                            'active'
                        )

                }

            )

        }

        if (newMobBtn) {

            newMobBtn.addEventListener(

                    'click',

                () => {

                    this.editingMob = null

                    document.getElementById(
                        'mob_id'
                    ).value = ''

                    document.getElementById(
                        'mob_name'
                    ).value = ''

                    document.getElementById(
                        'mob_short_desc'
                    ).value = ''

                    document.getElementById(
                        'mob_long_desc'
                    ).value = ''

                    document.getElementById(
                        'mob_hp'
                    ).value = 100

                    document.getElementById(
                        'mob_xp_reward'
                    ).value = 0

                    document.getElementById(
                        'mob_gold'
                    ).value = 0

                    document.getElementById(
                        'mob_level'
                    ).value = 1

                    document.getElementById(
                        "mob_position"
                    ).value = "standing"

                    this.currentLootMob = {
                        position: "standing",


                        loot_table: []

                    }

                    this.renderLootTable(
                        this.currentLootMob
                    )

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

        if (newItemBtn) {

            newItemBtn.addEventListener(

                'click',

                () => {

                    this.editingItem = null

                    this.resetItemForm()

                    document
                        .getElementById(
                            'itemModal'
                        )
                        .classList.add(
                            'active'
                        )

                }

            )

        }

        if (closeItemBtn) {

            closeItemBtn.addEventListener(

                'click',

                () => {

                    document
                        .getElementById(
                            'itemModal'
                        )
                        .classList.remove(
                            'active'
                        )

                }

            )

        }

        if (itemBrowserBtn) {

            itemBrowserBtn.addEventListener(

                'click',

                async () => {

                    await this.loadItemBrowser()

                    document
                        .getElementById(
                            'itemBrowserModal'
                        )
                        .classList.add(
                            'active'
                        )

                }

            )

        }

        if (closeItemBrowserBtn) {

            closeItemBrowserBtn.addEventListener(

                'click',

                () => {

                    document
                        .getElementById(
                            'itemBrowserModal'
                        )
                        .classList.remove(
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
    data-vnum="${mob.vnum}"
    data-name="${mob.name || ''}">

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

                        if (this.selectingMobForRoom) {

                            if (!this.currentRoom)
                                return

                            this.currentRoom.mobs ||= []

                            this.currentRoom.mobs.push({

                                vnum: btn.dataset.vnum,

                                name: btn.dataset.name,

                                max: 1,

                                respawn: 300

                            })

                            this.renderMobs(
                                this.currentRoom
                            )

                            this.queueAutoSave()

                            document
                                .getElementById(
                                    'mobBrowserModal'
                                )
                                .classList.remove(
                                    'active'
                                )

                            this.selectingMobForRoom =
                                false

                            console.log(
                                '[ROOM MOB ADDED]',
                                btn.dataset.vnum
                            )

                            return
                        }

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

                        this.currentLootMob =
                            mob

                        this.renderLootTable(
                            mob
                        )

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
                                'mob_short_desc'
                            )
                            .value =
                            mob.short_desc || ''

                        document
                            .getElementById(
                                'mob_long_desc'
                            )
                            .value =
                            mob.long_desc || ''

                        document
                            .getElementById(
                                'mob_hp'
                            )
                            .value =
                            mob.hp || 100

                        document
                            .getElementById(
                                'mob_xp_reward'
                            )
                            .value =
                            mob.xp_reward || 0

                        document
                            .getElementById(
                                'mob_gold'
                            )
                            .value =
                            mob.gold || 0

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
    // ITEM BROWSER
    // ====================================
    async loadItemBrowser() {

        const response =

            await fetch(
                '/api/items'
            )

        const items =

            await response.json()

        const container =

            document.getElementById(
                'itemBrowserList'
            )

        if (!container)
            return

        container.innerHTML =

            items.map(item => `

<div class="mobBrowserRow">

    <strong>

        ${item.id}

    </strong>

    -

    ${item.name || 'Unnamed Item'}

    <button
    class="editItemBtn"
    data-id="${item.id}">

    Edit

</button>

<button
    class="deleteItemBtn"
    data-id="${item.id}">

    Delete

</button>

</div>

`).join('')

        container

            .querySelectorAll(
                '.editItemBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    async () => {

                        if (this.selectingLootForMob) {

                            const itemId =
                                btn.dataset.id

                            if (!this.currentLootMob)
                                return

                            this.currentLootMob.loot_table ||= []

                            this.currentLootMob.loot_table.push({

                                item_id: itemId,

                                chance: 100,

                                min: 1,

                                max: 1

                            })

                            this.renderLootTable(
                                this.currentLootMob
                            )

                            document
                                .getElementById(
                                    'itemBrowserModal'
                                )
                                .classList.remove(
                                    'active'
                                )

                            this.selectingLootForMob =
                                false

                            this.queueAutoSave()

                            console.log(
                                '[LOOT ADDED]',
                                itemId
                            )

                            return
                        }

                        if (this.selectingItemForRoom) {

                            if (!this.currentRoom)
                                return

                            const itemId =
                                btn.dataset.id

                            const response =

                                await fetch(
                                    `/api/item/${itemId}`
                                )

                            const item =
                                await response.json()

                            this.currentRoom.items ||= []

                            this.currentRoom.items.push({

                                id: item.id,

                                name: item.name,

                                quantity: 1,

                                respawn: 300

                            })

                            this.renderItems(
                                this.currentRoom
                            )

                            this.queueAutoSave()

                            document
                                .getElementById(
                                    'itemBrowserModal'
                                )
                                .classList.remove(
                                    'active'
                                )

                            this.selectingItemForRoom =
                                false

                            console.log(
                                '[ROOM ITEM ADDED]',
                                item.id
                            )

                            return
                        }
                        const itemId =

                            btn.dataset.id

                        const response =

                            await fetch(
                                `/api/item/${itemId}`
                            )

                        const item =

                            await response.json()

                        this.editingItem =
                            item.id

                        document.getElementById(
                            'item_id'
                        ).value =
                            item.id || ''

                        document.getElementById(
                            'item_name'
                        ).value =
                            item.name || ''

                        document.getElementById(
                            'item_short_desc'
                        ).value =
                            item.short_desc || ''

                        document.getElementById(
                            'item_long_desc'
                        ).value =
                            item.long_desc || ''

                        document.getElementById(
                            'item_type'
                        ).value =
                            item.type || 'misc'

                        document.getElementById(
                            'item_rarity'
                        ).value =
                            item.rarity || 'common'

                        document.getElementById(
                            'item_level'
                        ).value =
                            item.level || 1

                        document.getElementById(
                            'item_value'
                        ).value =
                            item.value || 0

                        document.getElementById(
                            'item_weight'
                        ).value =
                            item.weight || 0

                        document.getElementById(
                            'item_slot'
                        ).value =
                            item.slot || ''

                        document.getElementById(
                            'item_required_level'
                        ).value =
                            item.requirements?.level || 1

                        document.getElementById(
                            'item_damage_min'
                        ).value =
                            item.stats?.damage_min || 0

                        document.getElementById(
                            'item_damage_max'
                        ).value =
                            item.stats?.damage_max || 0

                        document.getElementById(
                            'item_armor'
                        ).value =
                            item.stats?.armor || 0

                        document.getElementById(
                            'item_heal_hp'
                        ).value =
                            item.stats?.heal_hp || 0

                        document.getElementById(
                            'item_heal_mana'
                        ).value =
                            item.stats?.heal_mana || 0

                        document.getElementById(
                            'item_str'
                        ).value =
                            item.modifiers?.strength || 0

                        document.getElementById(
                            'item_dex'
                        ).value =
                            item.modifiers?.dexterity || 0

                        document.getElementById(
                            'item_con'
                        ).value =
                            item.modifiers?.constitution || 0

                        document.getElementById(
                            'item_int'
                        ).value =
                            item.modifiers?.intelligence || 0

                        document.getElementById(
                            'item_wis'
                        ).value =
                            item.modifiers?.wisdom || 0

                        document.getElementById(
                            'item_cha'
                        ).value =
                            item.modifiers?.charisma || 0

                        document.getElementById(
                            'item_hp_bonus'
                        ).value =
                            item.modifiers?.hp || 0

                        document.getElementById(
                            'item_mana_bonus'
                        ).value =
                            item.modifiers?.mana || 0

                        document
                            .getElementById(
                                'itemBrowserModal'
                            )
                            .classList.remove(
                                'active'
                            )

                        document
                            .getElementById(
                                'itemModal'
                            )
                            .classList.add(
                                'active'
                            )

                    }

                )

            })

        container

            .querySelectorAll(
                '.deleteItemBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    async () => {

                        const itemId =

                            btn.dataset.id

                        const confirmed =

                            confirm(
                                `Delete item ${itemId}?`
                            )

                        if (!confirmed)
                            return

                        const response =

                            await fetch(

                                `/api/item/${itemId}`,

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

                        await this.loadItemBrowser()

                    }

                )

            })
    },

    // ====================================
    // RESET ITEM FORM
    // ====================================

    resetItemForm() {

        document.getElementById(
            'item_id'
        ).value = ''

        document.getElementById(
            'item_name'
        ).value = ''

        document.getElementById(
            'item_short_desc'
        ).value = ''

        document.getElementById(
            'item_long_desc'
        ).value = ''

        document.getElementById(
            'item_type'
        ).value = 'misc'

        document.getElementById(
            'item_rarity'
        ).value = 'common'

        document.getElementById(
            'item_level'
        ).value = 1

        document.getElementById(
            'item_value'
        ).value = 0

        document.getElementById(
            'item_weight'
        ).value = 0

        document.getElementById(
            'item_slot'
        ).value = ''

        document.getElementById(
            'item_required_level'
        ).value = 1

        document.getElementById(
            'item_damage_min'
        ).value = 0

        document.getElementById(
            'item_damage_max'
        ).value = 0

        document.getElementById(
            'item_armor'
        ).value = 0

        document.getElementById(
            'item_heal_hp'
        ).value = 0

        document.getElementById(
            'item_heal_mana'
        ).value = 0

        document.getElementById(
            'item_str'
        ).value = 0

        document.getElementById(
            'item_dex'
        ).value = 0

        document.getElementById(
            'item_con'
        ).value = 0

        document.getElementById(
            'item_int'
        ).value = 0

        document.getElementById(
            'item_wis'
        ).value = 0

        document.getElementById(
            'item_cha'
        ).value = 0

        document.getElementById(
            'item_hp_bonus'
        ).value = 0

        document.getElementById(
            'item_mana_bonus'
        ).value = 0

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

            .map((mob, index) => {

                return `

<div class="mobRow">

    <div>

        <strong>

    ${mob.name || mob.vnum}

</strong>

<br>

<small>

    (${mob.vnum})

</small>

        <br>

        Max Spawn:

<input
    type="number"
    class="mobMaxInput"
    data-index="${index}"
    value="${mob.max || 1}"
>

<br>

Respawn:

<input
    type="number"
    class="mobRespawnInput"
    data-index="${index}"
    value="${mob.respawn || 300}"
>

    </div>

    <button
        class="removeRoomMobBtn"
        data-index="${index}">

        Remove

    </button>

</div>

`
            })

            .join('')

        container

            .querySelectorAll(
                '.removeRoomMobBtn'
            )

            .forEach(btn => {

                btn.addEventListener(

                    'click',

                    () => {

                        const index =

                            Number(
                                btn.dataset.index
                            )

                        room.mobs.splice(
                            index,
                            1
                        )

                        this.renderMobs(
                            room
                        )

                        this.queueAutoSave()

                        console.log(
                            '[ROOM MOB REMOVED]'
                        )

                    }

                )

            })

        container

            .querySelectorAll(
                '.mobMaxInput'
            )

            .forEach(input => {

                input.addEventListener(

                    'change',

                    () => {

                        const index =

                            Number(
                                input.dataset.index
                            )

                        room.mobs[index].max =

                            Number(
                                input.value
                            ) || 1

                        this.queueAutoSave()

                        console.log(
                            '[MOB MAX UPDATED]',
                            room.mobs[index].max
                        )

                    }

                )

            })

        container

            .querySelectorAll(
                '.mobRespawnInput'
            )

            .forEach(input => {

                input.addEventListener(

                    'change',

                    () => {

                        const index =

                            Number(
                                input.dataset.index
                            )

                        room.mobs[index].respawn =

                            Number(
                                input.value
                            ) || 300

                        this.queueAutoSave()

                        console.log(
                            '[MOB RESPAWN UPDATED]',
                            room.mobs[index].respawn
                        )

                    }

                )

            })
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

            .map((item, index) => {

                return `

<div class="mobRow">

    <div>

        <strong>
            ${item.name || item.id}
        </strong>

        <br>

        <small>
            (${item.id})
        </small>

        <br>

        Quantity:

        <input
            type="number"
            class="itemQuantityInput"
            data-index="${index}"
            value="${item.quantity || 1}"
        >

        <br>

        Respawn:

        <input
            type="number"
            class="itemRespawnInput"
            data-index="${index}"
            value="${item.respawn || 300}"
        >

    </div>

    <button
        class="removeRoomItemBtn"
        data-index="${index}">
        Remove
    </button>

</div>
`
            })

            .join('')

        container
            .querySelectorAll(
                '.removeRoomItemBtn'
            )
            .forEach(btn => {

                btn.addEventListener(
                    'click',
                    () => {

                        const index =
                            Number(
                                btn.dataset.index
                            )

                        room.items.splice(
                            index,
                            1
                        )

                        this.renderItems(
                            room
                        )

                        this.queueAutoSave()
                    }
                )

            })

        container
            .querySelectorAll(
                '.itemQuantityInput'
            )
            .forEach(input => {

                input.addEventListener(
                    'change',
                    () => {

                        const index =
                            Number(
                                input.dataset.index
                            )

                        room.items[index].quantity =
                            Number(
                                input.value
                            ) || 1

                        this.queueAutoSave()
                    }
                )

            })

        container
            .querySelectorAll(
                '.itemRespawnInput'
            )
            .forEach(input => {

                input.addEventListener(
                    'change',
                    () => {

                        const index =
                            Number(
                                input.dataset.index
                            )

                        room.items[index].respawn =
                            Number(
                                input.value
                            ) || 300

                        this.queueAutoSave()
                    }
                )

            })
    },

    // ====================================
    // RENDER LOOT TABLE
    // ====================================

    renderLootTable(mob) {

        const container =
            document.getElementById(
                'mobLootEditor'
            )

        if (!container)
            return

        const loot =
            mob.loot_table || []

        if (!loot.length) {

            container.innerHTML = `
<div class="emptyPanel">
    No loot configured
</div>
`
            return
        }

        container.innerHTML = loot

            .map((entry, index) => {

                return `

<div class="mobRow">

    <div>

        <strong>
            ${entry.item_id}
        </strong>

        <br>

        Chance:

        <input
            class="lootChanceInput"
            data-index="${index}"
            type="number"
            min="0"
            max="100"
            value="${entry.chance || 0}"
        >

        <br>

        Min:

        <input
            class="lootMinInput"
            data-index="${index}"
            type="number"
            value="${entry.min || 1}"
        >

        Max:

        <input
            class="lootMaxInput"
            data-index="${index}"
            type="number"
            value="${entry.max || 1}"
        >

    </div>

    <button
        class="removeLootBtn"
        data-index="${index}">
        Remove
    </button>

</div>
`
            })

            .join('')

        container
            .querySelectorAll(
                '.removeLootBtn'
            )
            .forEach(btn => {

                btn.addEventListener(
                    'click',
                    () => {

                        const index =
                            Number(
                                btn.dataset.index
                            )

                        mob.loot_table.splice(
                            index,
                            1
                        )

                        this.renderLootTable(
                            mob
                        )

                        this.queueAutoSave()

                    }
                )

            })

        container
            .querySelectorAll(
                '.lootChanceInput'
            )
            .forEach(input => {

                input.addEventListener(
                    'change',
                    () => {

                        const index =
                            Number(
                                input.dataset.index
                            )

                        mob.loot_table[index].chance =
                            Number(
                                input.value
                            ) || 0

                        this.queueAutoSave()

                    }
                )

            })

        container
            .querySelectorAll(
                '.lootMinInput'
            )
            .forEach(input => {

                input.addEventListener(
                    'change',
                    () => {

                        const index =
                            Number(
                                input.dataset.index
                            )

                        mob.loot_table[index].min =
                            Number(
                                input.value
                            ) || 1

                        this.queueAutoSave()

                    }
                )

            })

        container
            .querySelectorAll(
                '.lootMaxInput'
            )
            .forEach(input => {

                input.addEventListener(
                    'change',
                    () => {

                        const index =
                            Number(
                                input.dataset.index
                            )

                        mob.loot_table[index].max =
                            Number(
                                input.value
                            ) || 1

                        this.queueAutoSave()

                    }
                )

            })
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
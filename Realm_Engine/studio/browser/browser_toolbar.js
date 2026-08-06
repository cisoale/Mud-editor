/**
 * ============================================================
 * Realm Studio
 * Browser Toolbar
 * ============================================================
 */

import Toolbar from "../framework/ui/toolbar.js";

export default class BrowserToolbar extends Toolbar {

    constructor() {

        super();

        this

            .addButton({
                id: "new",
                text: "New",
                icon: "➕",
                tooltip: "Create new entity"
            })

            .addButton({
                id: "duplicate",
                text: "Duplicate",
                icon: "📄",
                tooltip: "Duplicate selected entity"
            })

            .addButton({
                id: "delete",
                text: "Delete",
                icon: "🗑",
                tooltip: "Delete selected entity"
            });

    }

}
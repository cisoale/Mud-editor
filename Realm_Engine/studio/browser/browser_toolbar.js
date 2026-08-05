/**
 * ============================================================
 * Realm Studio
 * Browser Toolbar
 * ============================================================
 *
 * Toolbar configuration for BrowserView.
 *
 * Responsibilities
 * ----------------
 * - Configure browser commands
 * - Expose simple Browser API
 * - Never create HTML
 *
 * ============================================================
 */

import Toolbar from "../framework/toolbar.js";

export default class BrowserToolbar extends Toolbar {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        super();

        this.addButton({

            id: "new",

            text: "New",

            icon: "➕",

            tooltip: "Create new entity"

        });

        this.addButton({

            id: "duplicate",

            text: "Duplicate",

            icon: "📄",

            tooltip: "Duplicate selected entity"

        });

        this.addButton({

            id: "delete",

            text: "Delete",

            icon: "🗑",

            tooltip: "Delete selected entity"

        });

        this.addSeparator();

        this.addButton({

            id: "save",

            text: "Save",

            icon: "💾",

            tooltip: "Save repository"

        });

    }

    // ==========================================================
    // Convenience API
    // ==========================================================

    setNewEnabled(enabled) {

        enabled
            ? this.enable("new")
            : this.disable("new");

    }

    setDuplicateEnabled(enabled) {

        enabled
            ? this.enable("duplicate")
            : this.disable("duplicate");

    }

    setDeleteEnabled(enabled) {

        enabled
            ? this.enable("delete")
            : this.disable("delete");

    }

}
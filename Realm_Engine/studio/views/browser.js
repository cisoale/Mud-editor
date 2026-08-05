/**
 * ============================================================
 * Realm Studio
 * Browser View
 * ============================================================
 */

import View from "../framework/core/view.js";
import Panel from "../framework/ui/panel.js";
import Editor from "../modules/editor.js";
import BrowserToolbar from "../components/browser_toolbar.js";


export default class BrowserView extends View {

    constructor(context) {

    super();

    this.context = context;

    this.services = context.services;

    this.panel = null;

    this.editor = null;

    this.toolbar = new BrowserToolbar();

    this.toolbar.onNew(() => {

        this.newItem();

    });

    this.toolbar.onDuplicate(() => {

        this.duplicateItem();

    });

    this.toolbar.onDelete(() => {

        this.deleteItem();

    });

    this.repository =
        context.project.getRepository("entities");

}

// ==========================================================
// Toolbar
// ==========================================================

updateToolbar() {

    if (!this.editor)
        return;

    const selected = this.editor.getSelected();

    this.toolbar.setNewEnabled(true);

    this.toolbar.setDuplicateEnabled(
        selected !== null
    );

    this.toolbar.setDeleteEnabled(
        selected !== null
    );

}
    // ==========================================================
    // Item Commands
    // ==========================================================

    newItem() {

        const item = this.repository.create();

        this.editor.setItems(
            this.repository.getAll()
        );

        this.editor.select(item);
        this.updateToolbar();
    }

    deleteItem() {

        const item = this.editor.getSelected();

        if (!item)
            return;

        this.repository.remove(item);

        this.editor.setItems(
            this.repository.getAll()
        );
        this.updateToolbar();
    }

    duplicateItem() {

        const item = this.editor.getSelected();

        if (!item)
            return;

        const copy = this.repository.duplicate(item);

        this.editor.setItems(
            this.repository.getAll()
        );

        this.editor.select(copy);
        this.updateToolbar();
    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        //
        // Panel
        //

        this.panel = new Panel("Content Browser");

        this.element = this.panel.render();

        //
        //
        // Toolbar
                    //

        this.panel.body.appendChild(
            this.toolbar.render()
        );

        //
        // Editor
        //

        this.editor = new Editor(this.services);

        this.panel.body.appendChild(
                this.editor.render()
        );

        //
        // Browser Columns
        //

        this.editor.setColumns([

            {
                id: "id",
                label: "ID",
                width: 80
            },

            {
                id: "name",
                label: "Name",
                flex: 1,

                value: entity =>
                    entity.components?.["core.identity"]?.name ?? ""
            },

            {
                id: "category",
                label: "Category",
                width: 120,

                value: entity =>
                    entity.components?.["core.identity"]?.category ?? ""
            }

        ]);
        
        //
        // Repository
        //

        this.editor.setItems(
            this.repository.getAll()
        );
        this.updateToolbar();
        //
        // Expose for testing
        //

        window.browserView = this;

        return this.finishRender();

    }

}
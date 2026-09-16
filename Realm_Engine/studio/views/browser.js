/**
 * ============================================================
 * Realm Studio
 * Browser View
 * ============================================================
 */

import View from "../framework/core/view.js";
import Panel from "../framework/ui/panel.js";

import Editor from "../modules/editor.js";
import BrowserToolbar from "../browser/browser_toolbar.js";

export default class BrowserView extends View {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor(context) {

        super();

        this.context = context;

        this.services = context.services;

        this.repository =
            context.project.getRepository("entities");

        this.panel = null;

        this.editor = null;

        this.toolbar = new BrowserToolbar();

        //
        // Toolbar Events
        //

        this.toolbar.onClick(async id => {

            switch (id) {

                case "new":
                    this.newItem();
                    break;

                case "duplicate":
                    this.duplicateItem();
                    break;

                case "delete":
                    this.deleteItem();
                    break;

                case "undo":
                    await this.editor.inspector.undo();
                    this.updateToolbar();
                    break;

                case "redo":
                    await this.editor.inspector.redo();
                    this.updateToolbar();
                    break;

            }

        });

    }

        // ==========================================================
    // Toolbar
    // ==========================================================

    updateToolbar() {

        if (!this.editor)
            return;

        const selected = this.editor.getSelected();

        this.toolbar.enable("new");

        if (selected) {

            this.toolbar.enable("duplicate");
            this.toolbar.enable("delete");

        } else {

            this.toolbar.disable("duplicate");
            this.toolbar.disable("delete");

        }

        const inspector = this.editor.inspector;

        if (inspector && inspector.historyIndex >= 0) {
            this.toolbar.enable("undo");
        } else {
            this.toolbar.disable("undo");
        }

        if (inspector && inspector.redoStack.length > 0) {
            this.toolbar.enable("redo");
        } else {
            this.toolbar.disable("redo");
        }

    }

    // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.editor)
            return;

        this.editor.setItems(
            this.repository.getAll()
        );

        this.updateToolbar();

    }

    // ==========================================================
    // Commands
    // ==========================================================

    newItem() {

        const item = this.repository.create();

        this.refresh();

        this.editor.select(item);

        this.updateToolbar();

    }

    async deleteItem() {

        const item = this.editor.getSelected();

        if (!item)
            return;

        this.repository.remove(item);

        this.refresh();

        await this.context.project.save();

    }

    async duplicateItem() {

        const item = this.editor.getSelected();

        if (!item)
            return;

        const copy = this.repository.duplicate(item);

        this.refresh();

        this.editor.select(copy);

        this.updateToolbar();

        await this.context.project.save();

    }

        // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        //
        // Main panel
        //

        this.panel = new Panel("Content Browser");

        this.element = this.panel.render();

        //
        // Editor
        //

        this.editor = new Editor(this.services);
        this.editor.onSelectionChanged(() => {

        this.updateToolbar();

        });

        //
        // Toolbar
        //

        this.panel.append(this.toolbar);

        //
        // Editor
        //

        this.panel.append(this.editor);

        //
        // Columns
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
        // Initial data
        //

        this.refresh();

        //
        // Expose for debugging
        //

        window.browserView = this;

        return this.finishRender();

    }

}
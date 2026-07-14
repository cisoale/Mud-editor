/**
 * ============================================================
 * Realm Studio
 * Browser View
 * ============================================================
 */

import View from "../framework/view.js";
import Panel from "../framework/panel.js";
import Editor from "../modules/editor.js";

import itemSchema from "../schemas/item_schema.js";
import ItemRepository from "../repositories/item_repository.js";

export default class BrowserView extends View {

    constructor() {

        super();

        this.panel = null;
        this.editor = null;

        this.repository = new ItemRepository();

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

    }

    deleteItem() {

        const item = this.editor.getSelected();

        if (!item)
            return;

        this.repository.remove(item);

        this.editor.setItems(
            this.repository.getAll()
        );

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
        // Editor
        //

        this.editor = new Editor();

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
                flex: 1
            },

            {
                id: "type",
                label: "Type",
                width: 120
            }

        ]);

        //
        // Property Schema
        //

        this.editor.setSchema(itemSchema);

        //
        // Repository
        //

        this.editor.setItems(
            this.repository.getAll()
        );

        //
        // Expose for testing
        //

        window.browserView = this;

        return this.finishRender();

    }

}
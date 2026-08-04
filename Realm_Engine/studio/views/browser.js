/**
 * ============================================================
 * Realm Studio
 * Browser View
 * ============================================================
 */

import View from "../framework/view.js";
import Panel from "../framework/panel.js";
import Editor from "../modules/editor.js";



export default class BrowserView extends View {

    constructor(context) {

    super();

    this.context = context;

    this.services = context.services;

    this.panel = null;

    this.editor = null;

    this.repository =
        context.project.getRepository("entities");

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

        //
        // Expose for testing
        //

        window.browserView = this;

        return this.finishRender();

    }

}
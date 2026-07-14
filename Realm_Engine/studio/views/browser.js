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

    constructor() {

        super();

        this.panel = null;
        this.editor = null;

    }

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
        // Browser columns
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
        // PropertyGrid schema
        //

        this.editor.setSchema([

            {
                id: "id",
                label: "ID",
                type: "number"
            },

            {
                id: "name",
                label: "Name",
                type: "text"
            },

            {
                id: "type",
                label: "Type",
                type: "text"
            }

        ]);

        //
        // Demo data
        //

        this.editor.setItems([

            {
                id: 1001,
                name: "Long Sword",
                type: "Weapon"
            },

            {
                id: 1002,
                name: "Leather Armor",
                type: "Armor"
            },

            {
                id: 1003,
                name: "Healing Potion",
                type: "Consumable"
            }

        ]);

        return this.finishRender();

    }

}
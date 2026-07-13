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

        //
        // Panel
        //

        this.panel = new Panel("Content Browser");

        const panel = this.panel.render();

        //
        // Editor
        //

        this.editor = new Editor();

        this.panel.body.appendChild(
            this.editor.render()
        );

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
                flex: 1
            },

            {
                id: "type",
                label: "Type",
                width: 120
            }

        ]);

        //
        // Property Grid Schema
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
        // Demo Data
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

        //
        // Selection
        //

        this.editor.onSelectionChanged(item => {

            console.log("Selected:", item);

        });

        return panel;

    }

}
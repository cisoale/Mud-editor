/**
 * ============================================================
 * Realm Studio
 * Browser View
 * ============================================================
 */

import View from "../framework/view.js";
import Panel from "../framework/panel.js";
import ContentBrowser from "../modules/contentbrowser.js";

export default class BrowserView extends View {

    constructor() {

        super();

        this.panel = null;
        this.browser = null;

    }

    render() {

        this.panel = new Panel("Content Browser");

        const panel = this.panel.render();

        this.browser = new ContentBrowser();

        this.panel.body.appendChild(
            this.browser.render()
        );

        //
        // Demo data
        //

        this.browser.setColumns([

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

        this.browser.setItems([

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

        this.browser.onSelectionChanged(item => {

            console.log(item);

        });

        return panel;

    }

}
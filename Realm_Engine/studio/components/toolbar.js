/**
 * ============================================================
 * Realm Studio
 * Toolbar Component
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays the application toolbar.
 * - Displays the application title.
 * - Displays top level menus.
 *
 * Must NOT know:
 * - Router
 * - Builders
 * - Project data
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class Toolbar extends Component {

    constructor() {

        super();

        this.menus = [
            "File",
            "Edit",
            "View",
            "Tools",
            "Help"
        ];

    }

    render() {

        this.element = this.createElement("header", "toolbar");

        const title = this.createElement("div", "toolbar-title");
        title.textContent = "Realm Studio";

        const menu = this.createElement("nav", "toolbar-menu");

        this.menus.forEach(name => {

            const button = this.createElement("button", "toolbar-button");

            button.type = "button";
            button.textContent = name;

            button.addEventListener("click", () => {

                console.log(`${name} menu clicked`);

            });

            menu.appendChild(button);

        });

        this.element.appendChild(title);
        this.element.appendChild(menu);

        return this.element;

    }

}
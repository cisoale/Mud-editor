/**
 * ============================================================
 * Realm Studio
 * Sidebar Component
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays the application navigation.
 * - Tracks the selected menu item.
 * - Notifies selection changes.
 *
 * Must NOT know:
 * - Router
 * - Views
 * - Builders
 * - Project data
 * ============================================================
 */

import Component from "../framework/component.js";
import menu from "../app/menu.js";

export default class Sidebar extends Component {

    constructor() {

        super();

        this.menu = menu;
        this.selected = null;
        this.selectCallback = null;
        this.buttons = new Map();

    }

    render() {

        this.element = this.createElement("aside", "sidebar");

        const list = this.createElement("ul", "sidebar-menu");

        this.menu.forEach(item => {

            const li = this.createElement("li", "sidebar-item");

            li.dataset.id = item.id;

            li.textContent = `${item.icon} ${item.title}`;

            li.addEventListener("click", () => {

                this.select(item.id);

            });

            this.buttons.set(item.id, li);

            list.appendChild(li);

        });

        this.element.appendChild(list);

        return this.element;

    }

    select(id) {

        if (this.selected === id)
            return;

        if (this.selected && this.buttons.has(this.selected)) {

            this.buttons
                .get(this.selected)
                .classList
                .remove("active");

        }

        this.selected = id;

        if (this.buttons.has(id)) {

            this.buttons
                .get(id)
                .classList
                .add("active");

        }

        if (this.selectCallback) {

            this.selectCallback(id);

        }

    }

    onSelect(callback) {

        this.selectCallback = callback;

    }

    getSelected() {

        return this.selected;

    }

}
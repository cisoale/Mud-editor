/**
 * ============================================================
 * Realm Studio
 * SearchBox Component
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays a search input.
 * - Notifies when the text changes.
 * - Allows clearing the search.
 *
 * Must NOT know:
 * - Items
 * - Mobs
 * - Rooms
 * - Browser
 * - Repository
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class SearchBox extends Component {

    constructor(placeholder = "Search...") {

        super();

        this.placeholder = placeholder;

        this.input = null;

        this.searchCallback = null;

    }

    render() {

        this.element = this.createElement("div", "searchbox");

        this.input = this.createElement("input", "searchbox-input");

        this.input.type = "search";
        this.input.placeholder = this.placeholder;

        this.input.addEventListener("input", () => {

            if (this.searchCallback) {

                this.searchCallback(this.getValue());

            }

        });

        this.element.appendChild(this.input);

        return this.element;

    }

    getValue() {

        return this.input ? this.input.value : "";

    }

    setValue(value) {

        if (!this.input)
            return;

        this.input.value = value;

    }

    clear() {

        this.setValue("");

        if (this.searchCallback) {

            this.searchCallback("");

        }

    }

    focus() {

        if (this.input) {

            this.input.focus();

        }

    }

    onSearch(callback) {

        this.searchCallback = callback;

    }

}
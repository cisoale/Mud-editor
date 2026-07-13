/**
 * ============================================================
 * Realm Studio
 * Content Browser
 * ============================================================
 *
 * Generic browser for Studio entities.
 *
 * Responsibilities
 * ----------------
 * - Displays a SearchBox.
 * - Displays a ListView.
 * - Filters visible rows.
 *
 * Must NOT know:
 * - JSON
 * - Repository
 * - Item
 * - Mob
 * - Room
 *
 * ============================================================
 */

import Component from "../framework/component.js";

import SearchBox from "../components/searchbox.js";
import ListView from "../components/listview.js";

export default class ContentBrowser extends Component {

    constructor() {

        super();

        this.search = new SearchBox("Search...");

        this.list = new ListView();

        this.columns = [];
        this.items = [];

        this.selectionCallback = null;

    }

    render() {

        this.element = this.createElement("div", "content-browser");

        this.element.appendChild(this.search.render());

        this.element.appendChild(this.list.render());

        this.search.onSearch(text => {

            this.filter(text);

        });

        this.list.onSelectionChanged(index => {

            if (this.selectionCallback) {

                this.selectionCallback(index);

            }

        });

        return this.element;

    }

    setColumns(columns) {

        this.columns = columns;

        this.list.setColumns(columns);

    }

    setItems(items) {

        this.items = items;

        this.list.setRows(items);

    }

    filter(text) {

        if (!text) {

            this.list.setRows(this.items);

            return;

        }

        const value = text.toLowerCase();

        const filtered = this.items.filter(row => {

            return row.some(cell =>
                String(cell)
                    .toLowerCase()
                    .includes(value)
            );

        });

        this.list.setRows(filtered);

    }

    clear() {

        this.items = [];

        this.list.clear();

    }

    refresh() {

        this.list.refresh();

    }

    onSelectionChanged(callback) {

        this.selectionCallback = callback;

    }

}
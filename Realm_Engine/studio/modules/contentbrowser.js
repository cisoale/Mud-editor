/**
 * ============================================================
 * Realm Studio
 * Content Browser
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

        this.element.appendChild(
            this.search.render()
        );

        this.element.appendChild(
            this.list.render()
        );

        //
        // Search
        //

        this.search.onSearch(text => {

            this.filter(text);

        });

        //
        // Selection
        //

        this.list.onSelectionChanged(item => {

            if (this.selectionCallback) {

                this.selectionCallback(item);

            }

        });

        return this.element;

    }

    //
    // Columns
    //

    setColumns(columns) {

        this.columns = columns || [];

        this.list.setColumns(this.columns);

    }

    //
    // Items
    //

    setItems(items) {

        this.items = items || [];

        this.list.setRows(this.items);

    }

    //
    // Filtering
    //

    filter(text) {

        if (!text) {

            this.list.setRows(this.items);

            return;

        }

        const search = text.toLowerCase();

        const filtered = this.items.filter(item => {

             return this.columns.some(column => {

                let value = "";

                if (typeof column.value === "function") {

                    value = column.value(item);

                } else {

                    value = item[column.id] ?? "";

                }

                return String(value)
                    .toLowerCase()
                    .includes(search);

            });

    });

    

        this.list.setRows(filtered);

}

    //
    // Selection
    //

    getSelected() {

        return this.list.getSelected();

    }

    select(item) {

        this.list.select(item);

    }

    //
    // Events
    //

    onSelectionChanged(callback) {

        this.selectionCallback = callback;

    }

    //
    // Utility
    //

    clear() {

        this.items = [];

        this.list.clear();

    }

    refresh() {

        this.list.refresh();

    }

}
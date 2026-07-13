/**
 * ============================================================
 * Realm Studio
 * ListView Component
 * ============================================================
 *
 * Generic table/list component.
 *
 * Responsibilities
 * ----------------
 * - Displays tabular data.
 * - Displays configurable columns.
 * - Handles row selection.
 *
 * Must NOT know:
 * - Items
 * - Mobs
 * - Rooms
 * - JSON
 * - Repository
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class ListView extends Component {

    constructor() {

        super();

        this.columns = [];
        this.rows = [];

        this.selectedItem = null;

        this.selectionCallback = null;

        this.header = null;
        this.body = null;
        this.footer = null;

    }

    render() {

        this.element = this.createElement("div", "listview");

        this.header = this.createElement("div", "listview-header");
        this.body = this.createElement("div", "listview-body");
        this.footer = this.createElement("div", "listview-footer");

        this.element.appendChild(this.header);
        this.element.appendChild(this.body);
        this.element.appendChild(this.footer);

        this.refresh();

        return this.element;

    }

    setColumns(columns) {

        this.columns = columns;

        this.refresh();

    }

    setRows(rows) {

        this.rows = rows;

        this.refresh();

    }

    clear() {

        this.rows = [];
        this.selectedItem = null;

        this.refresh();

    }

    refresh() {

        if (!this.header || !this.body || !this.footer)
            return;

        this.header.replaceChildren();
        this.body.replaceChildren();

        //
        // Header
        //

        this.columns.forEach(column => {

            const cell = this.createElement("div", "listview-cell header");

            cell.textContent = column.label;

            if (column.width)
                cell.style.width = column.width + "px";

            if (column.flex)
                cell.style.flex = column.flex;

            this.header.appendChild(cell);

        });

        //
        // Rows
        //

        this.rows.forEach(item => {

            const row = this.createElement("div", "listview-row");

            if (this.selectedItem === item)
                row.classList.add("selected");

            this.columns.forEach(column => {

                const cell = this.createElement("div", "listview-cell");

                const value = item[column.id];

                cell.textContent = value ?? "";

                if (column.width)
                    cell.style.width = column.width + "px";

                if (column.flex)
                    cell.style.flex = column.flex;

                row.appendChild(cell);

            });

            row.addEventListener("click", () => {

                this.select(item);

            });

            this.body.appendChild(row);

        });

        this.footer.textContent = `${this.rows.length} item(s)`;

    }

    select(item) {

        this.selectedItem = item;

        this.refresh();

        if (this.selectionCallback) {

            this.selectionCallback(item);

        }

    }

    getSelected() {

        return this.selectedItem;

    }

    onSelectionChanged(callback) {

        this.selectionCallback = callback;

    }

}
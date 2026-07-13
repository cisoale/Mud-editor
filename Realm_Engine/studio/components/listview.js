/**
 * ============================================================
 * Realm Studio
 * ListView
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

        this.columns = columns || [];

        this.refresh();

    }

    setRows(rows) {

        this.rows = rows || [];

        if (this.rows.length > 0) {

            this.selectedItem = this.rows[0];

        } else {

            this.selectedItem = null;

        }

        this.refresh();

    }

    refresh() {

        if (!this.header)
            return;

        this.header.replaceChildren();
        this.body.replaceChildren();

        //
        // HEADER
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
        // ROWS
        //

        this.rows.forEach(item => {

            const row = this.createElement("div", "listview-row");

            if (item === this.selectedItem)
                row.classList.add("selected");

            this.columns.forEach(column => {

                const cell = this.createElement("div", "listview-cell");

                cell.textContent = item[column.id] ?? "";

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

    clear() {

        this.rows = [];

        this.selectedItem = null;

        this.refresh();

    }

    onSelectionChanged(callback) {

        this.selectionCallback = callback;

    }

}
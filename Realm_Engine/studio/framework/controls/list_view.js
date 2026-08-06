/**
 * ============================================================
 * Realm Studio
 * List View
 * ============================================================
 *
 * Generic component for displaying collections of objects.
 *
 * Responsibilities
 * ----------------
 * - Displays tabular data.
 * - Handles selection.
 * - Handles sorting.
 * - Handles filtering.
 * - Handles searching.
 * - Emits UI events.
 *
 * Must NOT know:
 * ----------------
 * - Repositories
 * - Entities
 * - Items
 * - Mobs
 * - Rooms
 * - Business logic
 *
 * ============================================================
 */

import Component from "../core/component.js";

export default class ListView extends Component {

    constructor() {

        super();

        this.columns = [];
        this.items = [];

        this.filteredItems = [];

        this.selectedItem = null;

        this.searchText = "";

        this.filter = null;

        this.compareFunction = null;

        this.selectionChangedCallback = null;
        this.doubleClickCallback = null;

        this.table = null;
        this.tbody = null;

    }

    // ==========================================================
    // Configuration
    // ==========================================================

    setColumns(columns = []) {

        this.columns = columns;

        if (this.isRendered())
            this.refresh();

    }

    setItems(items = []) {

        this.items = items;

        this.refresh();

    }

    setFilter(filter) {

        this.filter = filter;

        this.refresh();

    }

    setSearchText(text = "") {

        this.searchText = text.toLowerCase();

        this.refresh();

    }

    sort(compareFunction) {

        this.compareFunction = compareFunction;

        this.refresh();

    }

    // ==========================================================
    // Selection
    // ==========================================================

    select(item) {

        this.selectedItem = item;

        this.refresh();

        if (this.selectionChangedCallback)
            this.selectionChangedCallback(item);

    }

    clearSelection() {

        this.selectedItem = null;

        this.refresh();

    }

    getSelection() {

        return this.selectedItem;

    }

    // ==========================================================
    // Events
    // ==========================================================

    onSelectionChanged(callback) {

        this.selectionChangedCallback = callback;

    }

    onDoubleClick(callback) {

        this.doubleClickCallback = callback;

    }

    // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.isRendered())
            return;

        this.applyFilters();

        this.renderRows();

    }

    applyFilters() {

        this.filteredItems = [...this.items];

        if (this.filter)
            this.filteredItems =
                this.filteredItems.filter(this.filter);

        if (this.searchText) {

            this.filteredItems =
                this.filteredItems.filter(item =>
                    JSON.stringify(item)
                        .toLowerCase()
                        .includes(this.searchText)
                );

        }

        if (this.compareFunction)
            this.filteredItems.sort(this.compareFunction);

    }

    // ==========================================================
    // Rendering
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = document.createElement("div");

        this.element.className = "list-view";

        this.table = document.createElement("table");

        this.table.className = "list-view-table";

        this.renderHeader();

        this.tbody = document.createElement("tbody");

        this.table.appendChild(this.tbody);

        this.element.appendChild(this.table);

        this.refresh();

        return this.finishRender();

    }

    renderHeader() {

        const thead = document.createElement("thead");

        const row = document.createElement("tr");

        for (const column of this.columns) {

            const th = document.createElement("th");

            th.textContent = column.label;

            if (column.width)
                th.style.width = `${column.width}px`;

            if (column.flex)
                th.style.width = "auto";

            row.appendChild(th);

        }

        thead.appendChild(row);

        this.table.appendChild(thead);

    }

    renderRows() {

        this.tbody.innerHTML = "";

        for (const item of this.filteredItems) {

            const row = document.createElement("tr");

            if (item === this.selectedItem)
                row.classList.add("selected");

            row.addEventListener("click", () => {

                this.select(item);

            });

            row.addEventListener("dblclick", () => {

                if (this.doubleClickCallback)
                    this.doubleClickCallback(item);

            });

            for (const column of this.columns) {

                const cell = document.createElement("td");

                cell.textContent =
                    item[column.id] ?? "";

                row.appendChild(cell);

            }

            this.tbody.appendChild(row);

        }

    }

}
/**
 * ============================================================
 * Realm Framework
 * ListView
 * ============================================================
 *
 * Generic control for displaying collections of objects.
 *
 * Responsibilities
 * ----------------
 * - Display tabular data
 * - Handle selection
 * - Handle sorting
 * - Handle filtering
 * - Handle searching
 * - Emit UI events
 *
 * Must NOT know
 * ----------------
 * - Repositories
 * - Entities
 * - ECS
 * - Business Logic
 *
 * Version
 * ----------------
 * 1.0
 *
 * ============================================================
 */

import Control from "../core/control.js";
import ListRenderer from "./list_renderer.js";
export default class ListView extends Control {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        super();

        // ------------------------------------------------------
        // Configuration
        // ------------------------------------------------------

        this.columns = [];

        // ------------------------------------------------------
        // Data
        // ------------------------------------------------------

        this.items = [];
        this.filteredItems = [];

        // ------------------------------------------------------
        // Selection
        // ------------------------------------------------------

        this.selectionMode = "single";

        this.selectedItems = [];

        // ------------------------------------------------------
        // Search / Filter
        // ------------------------------------------------------

        this.searchText = "";

        this.filter = null;

        // ------------------------------------------------------
        // Sorting
        // ------------------------------------------------------

        this.sortColumn = null;

        this.sortAscending = true;

        // ------------------------------------------------------
        // Events
        // ------------------------------------------------------

        this.selectionChangedCallback = null;

        this.doubleClickCallback = null;

        this.contextMenuCallback = null;

        this.activatedCallback = null;

        

        // ------------------------------------------------------
        // UI
        // ------------------------------------------------------

        this.header = null;

        this.body = null;

        this.footer = null;

        this.rows = [];
        
        this.renderer = new ListRenderer();
    }

        // ==========================================================
    // Configuration
    // ==========================================================

    setColumns(columns = []) {

        this.columns = columns;

        this.refresh();

        return this;

    }

    setItems(items = []) {

        this.items = items;

        this.refresh();

        return this;

    }

    setSelectionMode(mode = "single") {

        this.selectionMode = mode;

        return this;

    }

    setSearchText(text = "") {

        this.searchText = text.toLowerCase();

        this.refresh();

        return this;

    }

    setFilter(filter = null) {

        this.filter = filter;

        this.refresh();

        return this;

    }

    sort(compareFunction) {

        this.compareFunction = compareFunction;

        this.refresh();

        return this;

    }

        // ==========================================================
    // Rendering
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = document.createElement("div");
        this.element.className = "listview";

        // ------------------------------------------------------
        // Header
        // ------------------------------------------------------

        this.header = document.createElement("div");
        this.header.className = "listview-header";

        // ------------------------------------------------------
        // Body
        // ------------------------------------------------------

        this.body = document.createElement("div");
        this.body.className = "listview-body";

        // ------------------------------------------------------
        // Footer
        // ------------------------------------------------------

        this.footer = document.createElement("div");
        this.footer.className = "listview-footer";

        this.element.appendChild(this.header);
        this.element.appendChild(this.body);
        this.element.appendChild(this.footer);

        this.refresh();

        return this.finishRender();

    }

    renderHeader() {

        this.header.innerHTML = "";

        for (const column of this.columns) {

            if (column.visible === false)
                continue;

            const cell = document.createElement("div");

            cell.className = "listview-cell";

            cell.textContent = column.label ?? "";

            if (column.width)
                cell.style.width = `${column.width}px`;

            if (column.flex)
                cell.style.flex = column.flex;

            if (column.align)
                cell.style.textAlign = column.align;

            if (column.sortable) {

                cell.style.cursor = "pointer";

                cell.addEventListener("click", () => {

                    this.setSortColumn(column.id);

                });

            }

            this.header.appendChild(cell);

        }

    }

    renderBody() {

        this.body.innerHTML = "";

        this.rows = [];

        for (const item of this.filteredItems) {

            const row = this.createRow(item);

            this.rows.push(row);

            this.body.appendChild(row);

        }

    }

    renderFooter() {

        const visible = this.filteredItems.length;

        const total = this.items.length;

        if (visible === total)
            this.footer.textContent = `${total} item(s)`;
        else
            this.footer.textContent = `${visible} / ${total} item(s)`;

    }

    renderRows() {

        this.renderBody();

    }

    createRow(item) {

        const row = document.createElement("div");

        row.className = "listview-row";

        if (this.isSelected(item))
            row.classList.add("selected");

        row.addEventListener("click", () => {

            this.select(item);

        });

        row.addEventListener("dblclick", () => {

            if (this.doubleClickCallback)
                this.doubleClickCallback(item);

        });

        row.addEventListener("contextmenu", event => {

            event.preventDefault();

            if (this.contextMenuCallback)
                this.contextMenuCallback(item, event);

        });

        for (const column of this.columns) {

            if (column.visible === false)
                continue;

            row.appendChild(

                this.createCell(item, column)

            );

        }

        return row;

    }

    createCell(item, column) {

        const cell = document.createElement("div");

        cell.className = "listview-cell";

        if (column.width)
            cell.style.width = `${column.width}px`;

        if (column.flex)
            cell.style.flex = column.flex;

        if (column.align)
            cell.style.textAlign = column.align;

        this.renderCellContent(cell, item, column);

        return cell;

    }

    renderCellContent(cell, item, column) {

    const value = this.getCellValue(item, column);

    if (!column.renderer) {

        cell.textContent = value ?? "";

        return;

    }

    const result = column.renderer(value, item);

    this.renderer.render(cell, result);

    }


    onSelectionChanged(callback) {

    this.selectionChangedCallback = callback;

    return this;

    }

    getSelection() {

    if (this.selectionMode === "single") {

        return this.selectedItems[0] ?? null;

    }

    return [...this.selectedItems];

    }

    clearSelection() {

    this.selectedItems = [];

    this.renderRows();

    }

    select(item) {
        console.log("[ListView] select", item);

    if (this.selectionMode === "single") {

        this.selectedItems = item ? [item] : [];

    } else {

        this.selectedItems = [item];

    }

    this.renderRows();

    if (this.selectionChangedCallback) {
            console.log("[ListView] callback");
        this.selectionChangedCallback(item);

    }

    }

    isSelected(item) {

    return this.selectedItems.includes(item);

    }

        // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.isRendered())
            return;

        this.applyFilter();

        this.applySearch();

        this.applySort();

        this.renderHeader();

        this.renderRows();

        this.renderFooter();

    }

    // ==========================================================
    // Search / Filter / Sort
    // ==========================================================

    applyFilter() {

        this.filteredItems = [...this.items];

        if (!this.filter)
            return;

        this.filteredItems =
            this.filteredItems.filter(this.filter);

    }

    applySearch() {

        if (!this.searchText)
            return;

        this.filteredItems = this.filteredItems.filter(item => {

            for (const column of this.columns) {

                if (column.searchable === false)
                    continue;

                const value = this.getCellValue(item, column);

                if (String(value)
                    .toLowerCase()
                    .includes(this.searchText))
                    return true;

            }

            return false;

        });

    }

    applySort() {

        if (!this.sortColumn)
            return;

        const column =
            this.columns.find(c => c.id === this.sortColumn);

        if (!column)
            return;

        this.filteredItems.sort((a, b) => {

            const av = this.getCellValue(a, column);

            const bv = this.getCellValue(b, column);

            if (av == bv)
                return 0;

            if (this.sortAscending)
                return av > bv ? 1 : -1;

            return av < bv ? 1 : -1;

        });

    }

    
       
    // ==========================================================
    // Helpers
    // ==========================================================

    getCellValue(item, column) {

        if (column.getter)
            return column.getter(item);

        return item[column.id];

    }

    clear() {

        this.items = [];

        this.filteredItems = [];

        this.selectedItems = [];

        this.refresh();

    }

    destroy() {

        this.clear();

        this.element = null;

    }

}
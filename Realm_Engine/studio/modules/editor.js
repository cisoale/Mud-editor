/**
 * ============================================================
 * Realm Studio
 * Generic Editor Module
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Combines ContentBrowser and PropertyGrid.
 * - Connects selection to property editing.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

import Splitter from "../components/splitter.js";

import ContentBrowser from "./contentbrowser.js";
import PropertyGrid from "./propertygrid.js";

export default class Editor extends Component {

    constructor() {

        super();

        this.splitter = new Splitter();

        this.browser = new ContentBrowser();

        this.grid = new PropertyGrid();

        //
        // Browser -> PropertyGrid
        //

        this.browser.onSelectionChanged(item => {

            this.grid.setObject(item);

        });

    }

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement("div", "editor");

        //
        // Configure Splitter
        //

        this.splitter.setLeft(this.browser);
        this.splitter.setRight(this.grid);

        this.element.appendChild(
            this.splitter.render()
        );

        return this.finishRender();

    }

    // ==========================================================
    // Browser API
    // ==========================================================

    setColumns(columns) {

        this.browser.setColumns(columns);

    }

    setItems(items) {

        this.browser.setItems(items);

    }

    getSelected() {

        return this.browser.getSelected();

    }

    select(item) {

        this.browser.select(item);

    }

    // ==========================================================
    // PropertyGrid API
    // ==========================================================

    setSchema(schema) {

        this.grid.setSchema(schema);

    }

    setObject(object) {

        this.grid.setObject(object);

    }

    getObject() {

        return this.grid.getObject();

    }

    // ==========================================================
    // Events
    // ==========================================================

    onSelectionChanged(callback) {

        this.browser.onSelectionChanged(callback);

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    refresh() {

        this.browser.refresh();
        this.grid.refresh();

    }

    clear() {

        this.browser.clear();
        this.grid.clear();

    }

}
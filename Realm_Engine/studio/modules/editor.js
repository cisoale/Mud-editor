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

        this.grid.render();

        this.browser.render();

    }

    render() {

        this.element = this.createElement("div", "editor");

        //
        // Layout
        //

        this.splitter.setLeft(this.browser);
        this.splitter.setRight(this.grid);

        this.element.appendChild(
            this.splitter.render()
        );

        //
        // Browser -> Grid
        //

        this.browser.onSelectionChanged(item => {

            this.grid.setObject(item);

        });

        return this.element;

    }

    //
    // Browser API
    //

    setColumns(columns) {

        this.browser.setColumns(columns);

    }

    setItems(items) {

        this.browser.setItems(items);

    }

    //
    // Property Grid API
    //

    setSchema(schema) {

        this.grid.setSchema(schema);

    }

    setObject(object) {

        this.grid.setObject(object);

    }

    //
    // Events
    //

    onSelectionChanged(callback) {

        this.browser.onSelectionChanged(callback);

    }

    //
    // Helpers
    //

    getSelected() {

        return this.browser.getSelected();

    }

    refresh() {

        this.browser.refresh();

        this.grid.refresh();

    }

    clear() {

        this.browser.clear();

        this.grid.clear();

    }

}
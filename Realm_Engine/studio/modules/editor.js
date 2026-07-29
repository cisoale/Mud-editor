/**
 * ============================================================
 * Realm Studio
 * Generic Editor Module
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Combines ContentBrowser and Inspector.
 * - Connects selection to Inspector.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

import Splitter from "../components/splitter.js";

import ContentBrowser from "./contentbrowser.js";
import Inspector from "./inspector.js";

export default class Editor extends Component {

    constructor(services) {

        super();

        this.services = services;

        this.splitter = new Splitter();

        //
        // Modules
        //

        this.browser = new ContentBrowser();

        this.inspector = new Inspector(
            this.services.schemaLoader
        );

        //
        // Browser -> Inspector
        //

        this.browser.onSelectionChanged(entity => {

            this.inspector.setEntity(entity);

        });

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement(
            "div",
            "editor"
        );

        //
        // Configure Splitter
        //

        this.splitter.setLeft(this.browser);

        this.splitter.setRight(this.inspector);

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

    select(entity) {

        this.browser.select(entity);

    }

    // ==========================================================
    // Inspector API
    // ==========================================================

    setEntity(entity) {

        this.inspector.setEntity(entity);

    }

    getEntity() {

        return this.inspector.getEntity();

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

        this.inspector.refresh();

    }

    clear() {

        this.browser.clear();

        this.inspector.clear();

    }

}
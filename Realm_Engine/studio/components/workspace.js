/**
 * ============================================================
 * Realm Studio
 * Workspace Component
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays the current View.
 * - Replaces Views.
 * - Clears the workspace.
 * - Calls View lifecycle methods.
 *
 * Must NOT know:
 * - Router
 * - Builders
 * - Project data
 * ============================================================
 */

import Component from "../framework/component.js";

export default class Workspace extends Component {

    constructor() {
        super();

        this.currentView = null;
    }

    render() {

        this.element = this.createElement("main", "workspace");

        return this.element;

    }

    setView(view) {

        if (!this.element) {
            throw new Error("Workspace has not been rendered yet.");
        }

        if (this.currentView && typeof this.currentView.onClose === "function") {
            this.currentView.onClose();
        }

        this.clear();

        this.currentView = view;

        const content = view.render();

        if (content) {
            this.element.appendChild(content);
        }

        if (typeof view.onOpen === "function") {
            view.onOpen();
        }

    }

    getCurrentView() {
        return this.currentView;
    }

    clear() {

        this.element.replaceChildren();

    }

    refresh() {

        if (
            this.currentView &&
            typeof this.currentView.refresh === "function"
        ) {
            this.currentView.refresh();
        }

    }

}
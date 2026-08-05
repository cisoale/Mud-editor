/**
 * ============================================================
 * Realm Studio
 * Browser Toolbar
 * ============================================================
 *
 * Toolbar used by the Content Browser.
 *
 * Responsibilities
 * ----------------
 * - Display Browser commands.
 * - Emit toolbar events.
 * - Never know BrowserView or Repository.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class BrowserToolbar extends Component {

    constructor() {

        super();

        this.newCallback = null;
        this.duplicateCallback = null;
        this.deleteCallback = null;

        this.newButton = null;
        this.duplicateButton = null;
        this.deleteButton = null;

    }

    // ==========================================================
    // Events
    // ==========================================================

    onNew(callback) {

        this.newCallback = callback;

    }

    onDuplicate(callback) {

        this.duplicateCallback = callback;

    }

    onDelete(callback) {

        this.deleteCallback = callback;

    }

    // ==========================================================
    // State
    // ==========================================================


    setNewEnabled(enabled) {

    if (this.newButton)
        this.newButton.disabled = !enabled;

    }

    setDuplicateEnabled(enabled) {

        if (this.duplicateButton)
            this.duplicateButton.disabled = !enabled;

    }

    setDeleteEnabled(enabled) {

        if (this.deleteButton)
            this.deleteButton.disabled = !enabled;

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    createButton(text, callback) {

        const button = this.createElement(
            "button",
            "browser-toolbar-button"
        );

        button.type = "button";

        button.textContent = text;

        button.addEventListener("click", () => {

            if (callback)
                callback();

        });

        return button;

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(
            "div",
            "browser-toolbar"
        );

        this.newButton = this.createButton(
            "New",
            () => {

                if (this.newCallback)
                    this.newCallback();

            }
        );

        this.duplicateButton = this.createButton(
            "Duplicate",
            () => {

                if (this.duplicateCallback)
                    this.duplicateCallback();

            }
        );

        this.deleteButton = this.createButton(
            "Delete",
            () => {

                if (this.deleteCallback)
                    this.deleteCallback();

            }
        );

        this.element.appendChild(this.newButton);
        this.element.appendChild(this.duplicateButton);
        this.element.appendChild(this.deleteButton);

        this.setNewEnabled(true);
        this.setDuplicateEnabled(false);
        this.setDeleteEnabled(false);

        return this.finishRender();

    }

}
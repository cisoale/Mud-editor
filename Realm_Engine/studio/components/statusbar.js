/**
 * ============================================================
 * Realm Studio
 * StatusBar Component
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays application status.
 * - Displays current project.
 * - Displays Studio version.
 *
 * Must NOT know:
 * - Router
 * - Builders
 * - Views
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class StatusBar extends Component {

    constructor() {

        super();

        this.status = "Ready";
        this.project = "No Project";
        this.version = "Alpha 0.1";

        this.statusElement = null;
        this.projectElement = null;
        this.versionElement = null;

    }

    render() {

        this.element = this.createElement("footer", "statusbar");

        this.statusElement = this.createElement("span", "statusbar-status");
        this.projectElement = this.createElement("span", "statusbar-project");
        this.versionElement = this.createElement("span", "statusbar-version");

        this.statusElement.textContent = this.status;
        this.projectElement.textContent = this.project;
        this.versionElement.textContent = this.version;

        this.element.appendChild(this.statusElement);

        const spacer = this.createElement("div", "statusbar-spacer");
        this.element.appendChild(spacer);

        this.element.appendChild(this.projectElement);
        this.element.appendChild(this.versionElement);

        return this.element;

    }

    setStatus(text) {

        this.status = text;

        if (this.statusElement) {
            this.statusElement.textContent = text;
        }

    }

    setProject(name) {

        this.project = name;

        if (this.projectElement) {
            this.projectElement.textContent = name;
        }

    }

    setVersion(version) {

        this.version = version;

        if (this.versionElement) {
            this.versionElement.textContent = version;
        }

    }

}
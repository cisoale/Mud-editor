/**
 * ============================================================
 * Realm Studio
 * Dashboard View
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays the Studio home page.
 * - Shows application information.
 * - Shows project status.
 *
 * Must NOT:
 * - Load project data.
 * - Modify project data.
 * - Know the Router.
 *
 * ============================================================
 */

import View from "../framework/view.js";
import Panel from "../framework/panel.js";

export default class DashboardView extends View {

    constructor() {

        super();

        this.panel = null;

    }

    render() {

        this.panel = new Panel("Dashboard");

        const panel = this.panel.render();

        this.buildContent();

        return panel;

    }

    buildContent() {

        const body = this.panel.body;

        body.replaceChildren();

        // -------------------------------------------------
        // Title
        // -------------------------------------------------

        const title = this.createElement("h1");
        title.textContent = "Realm Studio";

        // -------------------------------------------------
        // Welcome
        // -------------------------------------------------

        const welcome = this.createElement("p");
        welcome.textContent =
            "Welcome to Realm Studio. Create and manage your Realm of Lord world.";

        // -------------------------------------------------
        // Information Section
        // -------------------------------------------------

        const info = this.createElement("div", "dashboard-section");

        info.appendChild(this.createRow("Version", "Alpha 0.1"));
        info.appendChild(this.createRow("Engine", "Realm Engine"));
        info.appendChild(this.createRow("Project", "No project loaded"));
        info.appendChild(this.createRow("Status", "Ready"));

        // -------------------------------------------------
        // Recent Activity
        // -------------------------------------------------

        const activityTitle = this.createElement("h2");
        activityTitle.textContent = "Recent Activity";

        const activity = this.createElement("p");
        activity.textContent = "No recent activity.";

        // -------------------------------------------------
        // Build
        // -------------------------------------------------

        body.appendChild(title);
        body.appendChild(welcome);
        body.appendChild(info);
        body.appendChild(activityTitle);
        body.appendChild(activity);

    }

    createRow(label, value) {

        const row = this.createElement("div", "dashboard-row");

        const left = this.createElement("span", "dashboard-label");
        left.textContent = label;

        const right = this.createElement("span", "dashboard-value");
        right.textContent = value;

        row.appendChild(left);
        row.appendChild(right);

        return row;

    }

    onOpen() {

        console.log("Dashboard opened");

    }

    refresh() {

        // Future implementation

    }

}
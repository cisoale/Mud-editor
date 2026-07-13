/**
 * ============================================================
 * Realm Studio
 * Placeholder View
 * ============================================================
 *
 * Generic placeholder page used for modules
 * that are not implemented yet.
 *
 * ============================================================
 */

import View from "../framework/view.js";
import Panel from "../framework/panel.js";

export default class PlaceholderView extends View {

    constructor(title = "Module") {

        super();

        this.title = title;

    }

    render() {

        const panel = new Panel(this.title);

        panel.render();

        const body = panel.body;

        const title = this.createElement("h1");
        title.textContent = this.title;

        const subtitle = this.createElement("p");
        subtitle.textContent =
            "This module is not available yet.";

        const message = this.createElement("p");
        message.textContent =
            "It will be implemented in a future release of Realm Studio.";

        body.appendChild(title);
        body.appendChild(subtitle);
        body.appendChild(message);

        return panel.element;

    }

}
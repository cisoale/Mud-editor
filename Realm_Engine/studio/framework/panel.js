/**
 * ============================================================
 * Realm Studio
 * Panel
 * ============================================================
 *
 * Generic container with title and body.
 *
 * ============================================================
 */

import Component from "./component.js";

export default class Panel extends Component {

    constructor(title = "") {

        super();

        this.title = title;

        this.header = null;
        this.body = null;

    }

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement("div", "panel");

        this.header = this.createElement(
            "div",
            "panel-header"
        );

        this.header.textContent = this.title;

        this.body = this.createElement(
            "div",
            "panel-body"
        );

        this.element.appendChild(this.header);
        this.element.appendChild(this.body);

        return this.finishRender();

    }

    setTitle(title) {

        this.title = title;

        if (this.header) {

            this.header.textContent = title;

        }

    }

}
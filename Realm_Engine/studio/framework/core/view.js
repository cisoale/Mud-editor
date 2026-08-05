/**
 * ============================================================
 * Realm Studio
 * Base View
 * ============================================================
 *
 * Base class for application views.
 *
 * Responsibilities
 * ----------------
 * - Represents a full application page.
 * - Supports open/close lifecycle.
 *
 * ============================================================
 */

import Component from "./component.js";

export default class View extends Component {

    constructor() {

        super();

    }

    /**
     * Called when the view becomes active.
     */
    onOpen() {

    }

    /**
     * Called before the view is replaced.
     */
    onClose() {

    }

    /**
     * Refresh the view.
     */
    refresh() {

    }

}
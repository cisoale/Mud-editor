/**
 * ============================================================
 * Realm Studio
 * Realm Context
 * ============================================================
 *
 * Represents the current application context.
 *
 * Responsibilities
 * ----------------
 * - Exposes shared application objects.
 * - Provides a single access point to the Core.
 *
 * Must NOT know:
 * ----------------
 * - Router implementation
 * - Views
 * - Editors
 * - Entities
 * - Plugins
 *
 * Collaborates with:
 * ----------------
 * - Application
 * - Project
 * - Session
 * - ServiceContainer
 *
 * Maturity:
 * ----------------
 * Level A
 * ============================================================
 */

export default class RealmContext {

    constructor() {

        this.services = null;

        this.project = null;

        this.session = null;

    }

}